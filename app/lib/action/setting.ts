"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Setting } from "@/app/lib/db/entities/Setting";
import { TUserDiscountThresholds, TXpThresholds } from "@/app/lib/type";
import { unstable_noStore as noStore } from "next/cache";

export async function getSettingRepository() {
  noStore();
  const connection = await getDBConnection();
  return connection.getRepository(Setting);
}

export async function getSetting(key: string) {
  noStore();
  const repo = await getSettingRepository();
  return repo.findOne({ where: { key } });
}

export async function getLevelDefinition() {
  noStore();
  const ld = await getSetting("level_definition");
  if (!ld) {
    console.error("No level definition found!");
    return null;
  }
  return JSON.parse(ld.value) as TXpThresholds;
}

export async function getUserDiscountDefinition() {
  noStore();
  const udd = await getSetting("user_discount_definition");
  if (!udd) {
    console.error("No user discount definition found!");
    return null;
  }
  return JSON.parse(udd.value) as TUserDiscountThresholds;
}

export async function getMoneyXpExchangeRate() {
  noStore();
  const rate = await getSetting("money_to_xp_exchange_rate");
  if (!rate) {
    console.error("No user discount definition found!");
    return 1;
  }
  return JSON.parse(rate.value) as number;
}

export async function getIndexImages() {
  noStore();
  const images = await getSetting("index_images");
  if (!images) {
    return [];
  }
  return JSON.parse(images.value) as string[];
}
