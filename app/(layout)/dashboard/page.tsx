import { redirect } from "next/navigation";
import { config } from "@/app.config";

export default async function Dashboard() {
  redirect(config.path.adminBook);
}
