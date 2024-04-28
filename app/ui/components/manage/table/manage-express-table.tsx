"use client";

import { Button, Popconfirm, Space, Table } from "antd";
import Link from "next/link";
import { config } from "@/app.config";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Express } from "@/app/lib/db/entities/Express";
import { deleteExpressById } from "@/app/lib/action/express";
import useExecutor from "@/app/lib/hook/use-executor";

export default function ManageExpressTable({
  express,
}: {
  express: Express[];
}) {
  const executor = useExecutor();

  const columns = [
    {
      title: "快递公司编号", // "Express Company Number"
      dataIndex: "expressNo",
      key: "expressNo",
    },
    {
      title: "快递公司名称", // "Express Company Name"
      dataIndex: "expressName",
      key: "expressName",
    },
    {
      title: "快递公司地址", // "Express Company Address"
      dataIndex: "address",
      key: "address",
    },
    {
      title: "邮政编码", // "Zip Code"
      dataIndex: "zipCode",
      key: "zipCode",
    },
    {
      title: "联系人", // "Contact Person"
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "联系电话", // "Telephone"
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "传真", // "Fax"
      dataIndex: "fax",
      key: "fax",
    },
    {
      title: "邮箱", // "Email"
      dataIndex: "email",
      key: "email",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Express) => (
        <Space size="small">
          <Link href={`${config.path.editBook}/${record.id}`}>
            <Button icon={<FaRegEdit />} />
          </Link>
          <Popconfirm
            title="删除快递公司"
            description={`你确定要删掉 ${record.expressName} 吗？`}
            onConfirm={() =>
              executor(
                deleteExpressById(record.id),
                `删除快递公司${record.expressName}`,
              )
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
      dataSource={express}
      rowKey="id"
    ></Table>
  );
}
