"use server";

import { Press } from "@/app/lib/db/entities/Press";
import { getDBConnection } from "@/app/lib/db/connection";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { Page } from "@/app/lib/type";

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

export async function getAllPress(
  skip: number,
  limit: number,
): Promise<Page<Press>> {
  try {
    const pressRepository = await getPressRepository();
    const [press, total] = await pressRepository.findAndCount({
      skip,
      take: limit,
    });
    const data = JSON.stringify(press);
    return {
      total,
      payload: JSON.parse(data),
    };
  } catch (e) {
    console.error("Error getting all press", e);
    return {
      total: 0,
      payload: [],
    };
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
