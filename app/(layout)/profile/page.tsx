import { redirect } from "next/navigation";
import { config } from "@/app.config";

export default async function Page() {
  redirect(config.path.order);
}
