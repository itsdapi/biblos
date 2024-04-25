import { Button } from "antd";
import { getAllPress } from "@/app/lib/action/press";

export default function Test() {
  async function handleClick() {
    "use server";
    const press = await getAllPress();
    console.log("press", press);
  }

  return (
    <div>
      <h1>This is a test page</h1>
      <form action={handleClick}>
        <Button htmlType={"submit"}>按钮</Button>
      </form>
    </div>
  );
}