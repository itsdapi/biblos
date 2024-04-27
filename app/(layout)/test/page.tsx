import { getAllPress } from "@/app/lib/action/press";
import Ban from "@/app/ui/ban";

export default function Test() {
  async function handleClick() {
    "use server";
    const press = await getAllPress();
    console.log("press", press);
  }

  return <Ban />;
}
