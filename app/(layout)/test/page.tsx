import { getAllPress } from "@/app/lib/action/press";
import Ban from "@/app/ui/ban";
import { Button } from "antd";
import { getLevelDefinition } from "@/app/lib/action/setting";

export default function Test() {
  async function handleClick() {
    "use server";
    const ld = await getLevelDefinition();
    console.log("ld", ld);
  }

  return (
    <form action={handleClick}>
      <Button htmlType={"submit"}>获取设置</Button>;
    </form>
  );
}
