import Link from "next/link";
import { config } from "@/app.config";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Table from "@/app/ui/table";
import ManagePressTable from "@/app/ui/components/manage/table/manage-press-table";
import { getAllPress } from "@/app/lib/action/press";
import RefreshButton from "@/app/ui/button/refresh-button";
import TableHeader from "@/app/ui/table-header";

export default async function PressManage() {
  const [press] = await Promise.all([getAllPress(0, 10)]);
  const { adminPress, addPress } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader
        toPath={addPress}
        currPath={adminPress}
        text={"添加出版社"}
      />
      <ManagePressTable press={press} />
    </div>
  );
}
