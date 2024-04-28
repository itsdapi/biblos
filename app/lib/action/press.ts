"use server";

import { Press } from "@/app/lib/db/entities/Press";
import { getDBConnection } from "@/app/lib/db/connection";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";

export async function getPressRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Press);
}

export async function addOrEditPress(pressData: Press) {
  const pressRepository = await getPressRepository();
  const press = pressRepository.create(pressData);
  await pressRepository.save(press);
  revalidatePath(config.path.adminPress);
  return;
}

export async function getAllPress(skip: number, limit: number) {
  try {
    const pressRepository = await getPressRepository();
    const data = JSON.stringify(
      await pressRepository.find({
        skip,
        take: limit,
      }),
    );
    return JSON.parse(data) as Press[];
  } catch (e) {
    console.error("Error getting all press", e);
    return [];
  }
}

export async function getPressCount() {
  try {
    const repo = await getPressRepository();
    return await repo.count();
  } catch (e) {
    console.error("Error getting press count", e);
    return 0;
  }
}

export async function getPressDetailById(pressId: number) {
  const repo = await getPressRepository();
  const data = JSON.stringify(await repo.findOneBy({ id: pressId }));
  return JSON.parse(data) as Press | null;
}

export async function deletePressById(id: number) {
  const repo = await getPressRepository();
  await repo.delete(id);
  revalidatePath(config.path.adminPress);
  return;
}
