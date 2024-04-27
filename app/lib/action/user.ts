"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { UserEntity } from "@/app/lib/db/entities/User";
import { checkPassword, hashPassword } from "@/app/lib/utils";
import { Role } from "@/app/lib/type";
import {getBookRepository} from "@/app/lib/action/book";
import {getPressRepository} from "@/app/lib/action/press";

export async function getUserRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(UserEntity);
}


export async function getUser(name: string) {
  const userRepository = await getUserRepository();
  const data = JSON.stringify(
    userRepository.findOne({
      select: ["id", "name", "image", "email"],
      where: { name },
    }),
  );
  return JSON.parse(data) as Pick<
    UserEntity,
    "id" | "name" | "image" | "email"
  >;
}

export async function validateUser(id: string, password: string) {
  const userRepository = await getUserRepository();
  const hashedPassword = await userRepository.findOne({
    select: ["password"],
    where: { id },
  });
  if (!hashedPassword) {
    console.error("User not found!");
    return false;
  }
  if (!hashedPassword.password) {
    console.error("Passwords in db is null!");
    return false;
  }
  return await checkPassword(password, hashedPassword.password);
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const userRepository = await getUserRepository();
  const hashedPassword = await hashPassword(password);
  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
  await userRepository.save(user);
  console.log(`User ${user.name} created`);
  return;
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
