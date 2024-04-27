"use server";

import { Press } from "@/app/lib/db/entities/Press";
import { getDBConnection } from "@/app/lib/db/connection";
import { UserEntity } from "@/app/lib/db/entities/User";
import { getUserRepository } from "@/app/lib/action/user";

export async function getPressRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Press);
}

export async function addPress(pressData: Press) {
  const pressRepository = await getPressRepository();
  const press = pressRepository.create(pressData);
  await pressRepository.save(press);
  return;
}

export async function getAllPress() {
  const pressRepository = await getPressRepository();
  const data = JSON.stringify(await pressRepository.find());
  return JSON.parse(data) as Press[];
}

export async function getPressCount() {
  const repo = await getPressRepository();
  return await repo.count();
}
