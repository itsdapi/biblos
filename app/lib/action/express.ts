"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Express } from "@/app/lib/db/entities/Express";
import { Press } from "@/app/lib/db/entities/Press";
import { getPressRepository } from "@/app/lib/action/press";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { getBookRepository } from "@/app/lib/action/book";

export async function getExpressRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Express);
}

export async function addOrEditExpress(data: Express) {
  const repo = await getExpressRepository();
  const express = repo.create(data);
  await repo.save(express);
  revalidatePath(config.path.adminExpress);
  return;
}

export async function getAllExpress(skip: number, limit: number) {
  try {
    const repo = await getExpressRepository();
    const data = JSON.stringify(
      await repo.find({
        skip,
        take: limit,
      }),
    );
    return JSON.parse(data) as Express[];
  } catch (e) {
    console.error("Error getting all express", e);
    return [];
  }
}

export async function getExpressCount() {
  const repo = await getExpressRepository();
  return await repo.count();
}

export async function getExpressDetailById(id: number) {
  const repo = await getExpressRepository();
  const data = JSON.stringify(await repo.findOneBy({ id }));
  return JSON.parse(data) as Express | null;
}

export async function deleteExpressById(id: number) {
  const repo = await getExpressRepository();
  await repo.delete(id);
  revalidatePath(config.path.adminExpress);
  return;
}
