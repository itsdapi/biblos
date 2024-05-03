"use client";

import { User } from "next-auth";
import { Space, Table, TableProps, Tag } from "antd";
import { Order, OrderItem } from "@/app/lib/db/entities/Order";
import moment from "moment/moment";
import OrderStatusTag from "@/app/ui/components/user/order-status-tag";
import usePagination from "@/app/lib/hook/use-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { config } from "@/app.config";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Book } from "@/app/lib/db/entities/Book";
import { getBookDetailById } from "@/app/lib/action/book";
import useExecutor from "@/app/lib/hook/use-executor";

export default function OrderDetailTable({
  orderItems,
  totalItem,
  itemPerPage,
}: {
  orderItems: OrderItem[];
  totalItem: number;
  itemPerPage: number;
}) {
  const { createPageURL, currentPage, totalPages } = usePagination(
    totalItem,
    itemPerPage,
  );
  const [books, setBooks] = useState<(Book | null)[]>([]);
  const executor = useExecutor();

  useEffect(() => {
    const fetch = async () => {
      const booksResult = await Promise.all(
        orderItems.map((item) => getBookDetailById(item.itemId)),
      );
      setBooks(booksResult);
    };
    executor(fetch(), "获取订单详情");
  }, []);

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    if (!pagination.current) return;
    createPageURL(pagination.current);
  };

  const columns: TableProps<OrderItem>["columns"] = [
    {
      title: "封面",
      dataIndex: "coverUrl",
      key: "coverUrl",
      render: (imageUrl) => (
        <Image
          className={"aspect-square w-36 object-cover"}
          src={imageUrl}
          alt={"图书封面"}
        />
      ),
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
      title: "ISBN",
      dataIndex: "ISBN",
      key: "ISBN",
    },
  ];

  return (
    <Table
      columns={columns}
      title={() => "订单详情"}
      bordered
      dataSource={books}
      pagination={{ total: totalPages, current: currentPage }}
      onChange={handleTableChange}
      rowKey="id"
    />
  );
}
