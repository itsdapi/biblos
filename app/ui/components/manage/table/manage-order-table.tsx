"use client";

import { Button, Space, Table, TableProps } from "antd";
import Link from "next/link";
import { config } from "@/app.config";
import { FaRegEdit } from "react-icons/fa";
import { Order } from "@/app/lib/db/entities/Order";
import OrderStatusTag from "@/app/ui/components/user/order-status-tag";

export default function ManageOrderTable({ order }: { order: Order[] }) {
  const columns: TableProps<Order>["columns"] = [
    {
      title: "订单编号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "用户",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "总金额",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "订单状态",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => <OrderStatusTag status={status} />,
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Order) => (
        <Space size="small">
          <Link href={`${config.path.editOrder}/${record.id}`}>
            <Button icon={<FaRegEdit />} />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={order}
      rowKey="id"
      scroll={{ x: "max-content" }}
    ></Table>
  );
}
