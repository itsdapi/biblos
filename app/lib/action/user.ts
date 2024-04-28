"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { UserEntity } from "@/app/lib/db/entities/User";
import { Role } from "@/app/lib/type";
import { getLevelDefinition } from "@/app/lib/action/setting";

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
