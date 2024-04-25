import { Press } from "@/app/lib/db/entities/Press";
import { getDBConnection } from "@/app/lib/db/connection";

export async function addPress(pressData: Press) {
  const connection = await getDBConnection();
  const pressRepository = connection.getRepository(Press);
  await pressRepository.save(pressData);
  return;
}

export async function getAllPress() {
  const connection = await getDBConnection();
  const pressRepository = connection.getRepository(Press);
  const data = JSON.stringify(await pressRepository.find());
  return JSON.parse(data) as Press[];
}
