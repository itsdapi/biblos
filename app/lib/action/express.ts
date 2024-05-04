"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Express } from "@/app/lib/db/entities/Express";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { Page } from "@/app/lib/type";
import { unstable_noStore as noStore } from "next/cache";

export async function getExpressRepository() {
  noStore();
  const connection = await getDBConnection();
  return connection.getRepository(Express);
}

export async function addOrEditExpress(data: Express) {
  noStore();
  const repo = await getExpressRepository();
  const express = repo.create(data);
  await repo.save(express);
  revalidatePath(config.path.adminExpress);
  return;
}

export async function getAllExpress(
  skip: number,
  limit: number,
): Promise<Page<Express>> {
  noStore();
  try {
    const repo = await getExpressRepository();
    const [express, total] = await repo.findAndCount({
      skip,
      take: limit,
    });
    const data = JSON.stringify(express);
    return {
      total,
      payload: JSON.parse(data),
    };
  } catch (e) {
    console.error("Error getting all express", e);
    return {
      total: 0,
      payload: [],
    };
  }
}

export async function getExpressCount() {
  noStore();
  const repo = await getExpressRepository();
  return await repo.count();
}

export async function getExpressDetailById(id: number) {
  noStore();
  const repo = await getExpressRepository();
  const data = JSON.stringify(await repo.findOneBy({ id }));
  return JSON.parse(data) as Express | null;
}

export async function deleteExpressById(id: number) {
  noStore();
  const repo = await getExpressRepository();
  await repo.delete(id);
  revalidatePath(config.path.adminExpress);
  return;
}
