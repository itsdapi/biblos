"use client";

import { Button, Form, Input } from "antd";
import React from "react";
import { Press } from "@/app/lib/db/entities/Press";
import { addOrEditPress } from "@/app/lib/action/press";
import useManageForm from "@/app/lib/hook/use-manage-form";
import { config } from "@/app.config";

export default function PressForm({ press }: { press?: Press }) {
  type FieldType = Press;
  const { form, onSubmit, loading } = useManageForm(addOrEditPress, {
    prevData: press,
    desc: "出版社",
    redirectUrl: config.path.adminPress,
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
          <Input disabled placeholder={"自动生成书本ID"} />
        </Form.Item>

        <Form.Item<FieldType>
          label="出版社编号"
          name="pressNo"
          rules={[{ required: true, message: "请输入出版社编号" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="出版社名"
          name="pressName"
          rules={[{ required: true, message: "请输入出版社名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="出版社地址"
          name="address"
          rules={[{ required: false, message: "请输入出版社地址" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮政编码"
          name="zipCode"
          rules={[{ required: false, message: "请输入邮政编码" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="联系人"
          name="contactPerson"
          rules={[{ required: false, message: "请输入联系人" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="联系电话"
          name="telephone"
          rules={[{ required: false, message: "请输入联系电话" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="传真"
          name="fax"
          rules={[{ required: false, message: "请输入传真" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="电子邮箱"
          name="email"
          rules={[{ required: false, message: "请输入email" }]}
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
