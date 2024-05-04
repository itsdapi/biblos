"use client";

import { Button, Form, Input } from "antd";
import React from "react";
import { Express } from "@/app/lib/db/entities/Express";
import useManageForm from "@/app/lib/hook/use-manage-form";
import { addOrEditExpress } from "@/app/lib/action/express";
import { config } from "@/app.config";

export default function ExpressForm({ express }: { express?: Express }) {
  type FieldType = Express;
  const { form, onSubmit, loading } = useManageForm(addOrEditExpress, {
    prevData: express,
    desc: "出版社",
    redirectUrl: config.path.adminExpress,
  });

  return (
    <div className={"p-2"}>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="ID" name="id">
          <Input disabled placeholder={"自动生成快递公司ID"} />
        </Form.Item>

        <Form.Item<FieldType>
          label="快递公司编号"
          name="expressNo"
          rules={[{ required: true, message: "请输入快递公司编号" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="快递公司名称"
          name="expressName"
          rules={[{ required: true, message: "请输入快递公司名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="快递公司地址"
          name="address"
          rules={[{ required: false, message: "请输入快递公司地址" }]} // Assuming address may be nullable
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮政编码"
          name="zipCode"
          rules={[{ required: false, message: "请输入邮政编码" }]} // Assuming zip code may be nullable
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="联系人"
          name="contactPerson"
          rules={[{ required: false, message: "请输入联系人" }]} // Assuming contact person may be nullable
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="联系电话"
          name="telephone"
          rules={[{ required: false, message: "请输入联系电话" }]} // Assuming telephone may be nullable
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="传真"
          name="fax"
          rules={[{ required: false, message: "请输入传真" }]} // Assuming fax may be nullable
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[{ required: false, message: "请输入邮箱" }]} // Assuming email may be nullable
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
