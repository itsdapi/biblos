"use client";

import { Space, Table, TableProps } from "antd";
import { Order } from "@/app/lib/db/entities/Order";
import moment from "moment/moment";
import OrderStatusTag from "@/app/ui/components/user/order-status-tag";
import usePagination from "@/app/lib/hook/use-pagination";
import Link from "next/link";
import { config } from "@/app.config";

export default function OrderTable({
  orders,
  totalItem,
  itemPerPage,
}: {
  orders: Order[];
  totalItem: number;
  itemPerPage: number;
}) {
  const { createPageURL, currentPage, totalPages } = usePagination(
    totalItem,
    itemPerPage,
  );

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    if (!pagination.current) return;
    createPageURL(pagination.current);
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "订单编号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "创建日期",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <p>{moment(date).format("YYYY年MM月DD日 h:mm:ss a")}</p>
      ),
    },
    {
      title: "订单总价",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => <p>¥{totalAmount}</p>,
    },
    {
      title: "订单状态",
      key: "orderStatus",
      dataIndex: "orderStatus",
      render: (status) => <OrderStatusTag status={status} />,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`${config.path.order}/${record.id}`}>详情</Link>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      title={() => "我的订单"}
      bordered
      dataSource={orders}
      pagination={{ total: totalPages, current: currentPage }}
      onChange={handleTableChange}
      rowKey="id"
      scroll={{ x: "max-content" }}
    />
  );
}
