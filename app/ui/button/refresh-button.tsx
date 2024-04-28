import { Button } from "antd";
import { revalidatePath } from "next/cache";
import { TbRefresh } from "react-icons/tb";

export default function RefreshButton({ path }: { path: string }) {
  async function handleRefresh() {
    "use server";
    revalidatePath(path);
  }

  return (
    <form action={handleRefresh}>
      <Button icon={<TbRefresh />} htmlType={"submit"} />
    </form>
  );
}
