import Link from "next/link";
import { config } from "@/app.config";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllBooks } from "@/app/lib/action/book";
import ManageBookTable from "@/app/ui/components/manage/table/manage-book-table";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import TableHeader from "@/app/ui/table-header";

export default async function BookManage() {
  const [books] = await Promise.all([getAllBooks(0, 10)]);
  const { adminBook, addBook } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      {/*<Breadcrumbs>*/}
      {/*  <BreadcrumbItem href={`${config.path.adminBook}`}>*/}
      {/*    书本管理*/}
      {/*  </BreadcrumbItem>*/}
      {/*</Breadcrumbs>*/}
      <TableHeader toPath={addBook} currPath={adminBook} text={"添加书本"} />
      <ManageBookTable books={books} />
    </div>
  );
}
