"use client";

import { Button, Popconfirm, Space, Table } from "antd";
import Link from "next/link";
import { config } from "@/app.config";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Press } from "@/app/lib/db/entities/Press";
import { deletePressById } from "@/app/lib/action/press";
import { deleteExpressById } from "@/app/lib/action/express";
import useExecutor from "@/app/lib/hook/use-executor";

export default function ManagePressTable({ press }: { press: Press[] }) {
  const executor = useExecutor();

  const columns = [
    {
      title: "出版社编号", // "Press Number"
      dataIndex: "pressNo",
      key: "pressNo",
    },
    {
      title: "出版社名称", // "Press Name"
      dataIndex: "pressName",
      key: "pressName",
    },
    {
      title: "出版社地址", // "Press Address"
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
      title: "电子邮箱", // "Email"
      dataIndex: "email",
      key: "email",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Press) => (
        <Space size="small">
          <Link href={`${config.path.editBook}/${record.id}`}>
            <Button icon={<FaRegEdit />} />
          </Link>
          <Popconfirm
            title="删除出版社"
            description={`你确定要删掉 ${record.pressName} 吗？`}
            onConfirm={() =>
              executor(
                deletePressById(record.id),
                `删除快递公司${record.pressName}`,
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
      dataSource={press}
      rowKey="id"
    ></Table>
  );
}
