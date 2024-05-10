"use client";

import { Button, Popconfirm, Space, Table, TableProps } from "antd";
import { Book } from "@/app/lib/db/entities/Book";
import Link from "next/link";
import { config } from "@/app.config";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteBookById } from "@/app/lib/action/book";
import useExecutor from "@/app/lib/hook/use-executor";
import { Order } from "@/app/lib/db/entities/Order";

export default function ManageBookTable({ books }: { books: Book[] }) {
  const executor = useExecutor();

  const columns: TableProps<Book>["columns"] = [
    {
      title: "ISBN",
      dataIndex: "ISBN",
      key: "ISBN",
    },
    {
      title: "书名",
      dataIndex: "bookTitle",
      key: "bookTitle",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "出版社ID",
      dataIndex: "pressId",
      key: "pressId",
    },
    {
      title: "库存数量",
      dataIndex: "stockNumber",
      key: "stockNumber",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Link href={`${config.path.editBook}/${record.id}`}>
            <Button icon={<FaRegEdit />} />
          </Link>
          <Popconfirm
            title="删除书本"
            description={`你确定要删掉 ${record.bookTitle} 吗？`}
            onConfirm={() =>
              executor(deleteBookById(record.id), `删除书本${record.bookTitle}`)
            }
            okText="是的"
            cancelText="我再想想"
          >
            <Button icon={<FaRegTrashCan />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={books}
      rowKey="id"
      scroll={{ x: "max-content" }}
    ></Table>
  );
}
