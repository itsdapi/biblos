"use client";

import { Button, Space, Table } from "antd";
import Link from "next/link";
import { config } from "@/app.config";
import { FaRegEdit } from "react-icons/fa";
import { IUser, Role } from "@/app/lib/type";
import { Avatar } from "@nextui-org/react";

export default function ManageUserTable({ users }: { users: IUser[] }) {
  const columns = [
    {
      title: "头像",
      dataIndex: "image",
      key: "image",
      render: (data: string) => <Avatar src={data} />,
    },
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "权限",
      dataIndex: "role",
      key: "role",
      render: (data: number) => <div>{Role[data]}</div>,
    },
    {
      title: "经验值",
      dataIndex: "xp",
      key: "xp",
    },
    {
      title: "余额",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: IUser) => (
        <Space size="small">
          <Link href={`${config.path.editUser}/${record.id}`}>
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
      dataSource={users}
      rowKey="id"
    ></Table>
  );
}
