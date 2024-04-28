"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Setting } from "@/app/lib/db/entities/Setting";
import { TXpThresholds } from "@/app/lib/type";

export async function getSettingRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Setting);
}

export async function getSetting(key: string) {
  const repo = await getSettingRepository();
  return repo.findOne({ where: { key } });
}

export async function getLevelDefinition() {
  const ld = await getSetting("level_definition");
  if (!ld) {
    console.error("No level definition found!");
    return null;
  }
  return JSON.parse(ld.value) as TXpThresholds;
}
