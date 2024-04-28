import Link from "next/link";
import { config } from "@/app.config";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ManageExpressTable from "@/app/ui/components/manage/table/manage-express-table";
import { getAllExpress } from "@/app/lib/action/express";
import RefreshButton from "@/app/ui/button/refresh-button";
import TableHeader from "@/app/ui/table-header";

export default async function ExpressManage() {
  const [express] = await Promise.all([getAllExpress(0, 10)]);
  const { adminExpress, addExpress } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader
        toPath={addExpress}
        currPath={adminExpress}
        text={"添加快递公司"}
      />
      <ManageExpressTable express={express} />
    </div>
  );
}
