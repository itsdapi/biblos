"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { UserEntity } from "@/app/lib/db/entities/User";
import { IUser, Page, Role } from "@/app/lib/type";
import {
  getLevelDefinition,
  getUserDiscountDefinition,
} from "@/app/lib/action/setting";
import { auth } from "@/auth";
import { Express } from "@/app/lib/db/entities/Express";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { getExpressRepository } from "@/app/lib/action/express";

export async function getUserRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(UserEntity);
}

export async function changeUserRole(id: string, role: Role) {
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
  const repo = await getUserRepository();
  return await repo.count();
}

export async function getLevelByXp(xp: number) {
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
  return xpThresholds.length + 1;
}

export async function getUserDiscount(): Promise<number> {
  const session = await auth();
  const user = session?.user as IUser | undefined;
  const udd = await getUserDiscountDefinition();
  if (!user || !udd) {
    console.error("user or discount definition not found!");
    return 1;
  }
  const level = await getLevelByXp(user.xp);
  return udd[level];
}

export async function getAllUser(
  skip: number,
  limit: number,
): Promise<Page<IUser>> {
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
  const repo = await getUserRepository();
  const express = repo.create(data);
  await repo.save(express);
  revalidatePath(config.path.adminUser);
  return;
}

export async function getUserDetailById(id: string) {
  const repo = await getUserRepository();
  const data = JSON.stringify(await repo.findOneBy({ id }));
  return JSON.parse(data) as IUser | null;
}
