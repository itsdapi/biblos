import Table from "@/app/ui/table";
import Link from "next/link";
import { Button } from "antd";
import { config } from "@/app.config";
import { PlusOutlined } from "@ant-design/icons";

export default function ManagePress() {
  return (
    <div className={'space-y-4'}>
      <Link href={config.path.addPress}>
        <Button type="primary" icon={<PlusOutlined />}>
          添加出版社
        </Button>
      </Link>
      <Table />
    </div>
  );
}
