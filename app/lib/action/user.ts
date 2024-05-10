"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { UserEntity } from "@/app/lib/db/entities/User";
import { IUser, Page, Role } from "@/app/lib/type";
import {
  getLevelDefinition,
  getUserDiscountDefinition,
} from "@/app/lib/action/setting";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { unstable_noStore as noStore } from "next/cache";
import { Order } from "@/app/lib/db/entities/Order";

export async function getUserRepository() {
  noStore();
  const connection = await getDBConnection();
  return connection.getRepository(UserEntity);
}

export async function changeUserRole(id: string, role: Role) {
  noStore();
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new Error("User not found!");
  }
  user.role = role;
  console.log(`User ${user.name} updated role to ${role}`);
  return;
}

export async function getUserCount() {
  noStore();
  const repo = await getUserRepository();
  return await repo.count();
}

export async function getLevelByXp(xp: number) {
  noStore();
  const xpThresholds = await getLevelDefinition();
  if (!xpThresholds) {
    console.error("level_definition not defined in db!");
    return 0;
  }
  for (let i = 0; i < xpThresholds.length; i++) {
    if (xp < xpThresholds[i]) {
      // Return the level number, which is the index + 1 because levels start from 1
      return i;
    }
  }
  // Return the highest level + 1 if XP exceeds all defined thresholds
  return xpThresholds.length;
}

export async function getUserDiscount(): Promise<number> {
  noStore();
  const session = await auth();
  const user = session?.user as IUser | undefined;
  const udd = await getUserDiscountDefinition();
  if (!user || !udd) {
    console.error("user or discount definition not found!");
    return 1;
  }
  const level = await getLevelByXp(user.xp);
  // say user has reach max level, discount will be remain at the last level.
  if (level > udd.length) {
    return udd.at(-1)!;
  }
  return udd[level];
}

export async function getAllUser(
  skip: number,
  limit: number,
): Promise<Page<IUser>> {
  noStore();
  try {
    const repo = await getUserRepository();
    const [users, total] = await repo.findAndCount({
      skip,
      take: limit,
      select: ["id", "name", "email", "image", "xp", "balance", "role"],
    });
    const data = JSON.stringify(users);
    return {
      total,
      payload: JSON.parse(data) as IUser[],
    };
  } catch (e) {
    return {
      total: 0,
      payload: [],
    };
  }
}

export async function addOrEditUser(data: IUser) {
  noStore();
  const repo = await getUserRepository();
  const express = repo.create(data);
  await repo.save(express);
  revalidatePath(config.path.adminUser);
  return;
}

export async function getUserDetailById(id: string) {
  noStore();
  const repo = await getUserRepository();
  const data = JSON.stringify(await repo.findOneBy({ id }));
  return JSON.parse(data) as IUser | null;
}

export async function getUserPurchaseCount() {
  noStore();
  const user = (await auth())?.user as IUser | undefined;
  const userId = user?.id;
  if (!userId) {
    console.error("[getUserPurchaseCount] user not found!");
    return 0;
  }
  const connection = await getDBConnection();
  const totalItems = await connection
    .createQueryBuilder(Order, "order")
    .leftJoinAndSelect("order.items", "item")
    .where("order.userId = :userId", { userId })
    .select("SUM(item.quantity)", "totalItems")
    .getRawOne();
  return totalItems.totalItems;
}
