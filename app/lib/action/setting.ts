"use server";

import { config } from "@/app.config";

noStore();

import { getDBConnection } from "@/app/lib/db/connection";
import { Setting } from "@/app/lib/db/entities/Setting";
import { TUserDiscountThresholds, TXpThresholds } from "@/app/lib/type";
import { unstable_noStore as noStore } from "next/cache";

export async function getSettingRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Setting);
}

export async function getSetting(key: string) {
  const repo = await getSettingRepository();
  return repo.findOne({ where: { key } });
}

export async function writeSetting(key: string, value: any) {
  const repo = await getSettingRepository();
  const setting = repo.create({ key, value: JSON.stringify(value) });
  await repo.save(setting);
  return;
}

export async function getLevelDefinition() {
  const key = "level_definition";
  const ld = await getSetting(key);
  if (!ld) {
    console.warn("No level definition found!, creating.");
    const defaultValue = config.app.level_definition;
    await writeSetting(key, defaultValue);
    return defaultValue as TXpThresholds;
  }
  return JSON.parse(ld.value) as TXpThresholds;
}

export async function getUserDiscountDefinition() {
  const key = "user_discount_definition";
  const udd = await getSetting(key);
  if (!udd) {
    console.warn("No user discount definition found!, creating");
    const defaultValue = config.app.user_discount_definition;
    await writeSetting(key, defaultValue);
    return defaultValue as TUserDiscountThresholds;
  }
  return JSON.parse(udd.value) as TUserDiscountThresholds;
}

export async function getMoneyXpExchangeRate() {
  const key = "money_to_xp_exchange_rate";
  const rate = await getSetting(key);
  if (!rate) {
    console.warn("No user discount definition found!, creating");
    const defaultValue = config.app.money_to_xp_exchange_rate;
    await writeSetting(key, defaultValue);
    return defaultValue;
  }
  return JSON.parse(rate.value) as number;
}

export async function getIndexImages() {
  const key = "index_images";
  const images = await getSetting(key);
  if (!images) {
    console.warn("No index images found!, creating");
    const defaultValue = config.app.index_images;
    await writeSetting(key, defaultValue);
    return defaultValue;
  }
  return JSON.parse(images.value) as string[];
}
