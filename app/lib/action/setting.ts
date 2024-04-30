"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Setting } from "@/app/lib/db/entities/Setting";
import { TUserDiscountThresholds, TXpThresholds } from "@/app/lib/type";

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

export async function getUserDiscountDefinition() {
  const udd = await getSetting("user_discount_definition");
  if (!udd) {
    console.error("No user discount definition found!");
    return null;
  }
  return JSON.parse(udd.value) as TUserDiscountThresholds;
}

export async function getMoneyXpExchangeRate() {
  const rate = await getSetting("money_to_xp_exchange_rate");
  if (!rate) {
    console.error("No user discount definition found!");
    return 1;
  }
  return JSON.parse(rate.value) as number;
}
