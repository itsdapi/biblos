import Table from "@/app/ui/table";
import Link from "next/link";
import { Button } from "antd";
import { config } from "@/app.config";
import { PlusOutlined } from "@ant-design/icons";
import Pagination from "@/app/ui/pagination";

export default function ManageBook() {
  return (
    <div className={'space-y-4'}>
      <Link href={config.path.addBook}>
        <Button type="primary" icon={<PlusOutlined />}>
          添加书本
        </Button>
      </Link>
      <Table />
      <Pagination totalPages={20}/>
    </div>
  );
}
