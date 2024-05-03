"use client";

import { Button, Form, Input, Select } from "antd";
import React from "react";
import { Press } from "@/app/lib/db/entities/Press";
import { addOrEditPress } from "@/app/lib/action/press";
import useManageForm from "@/app/lib/hook/use-manage-form";
import { config } from "@/app.config";
import { IUser, Role } from "@/app/lib/type";
import { addOrEditUser } from "@/app/lib/action/user";

export default function UserForm({ user }: { user?: IUser }) {
  type FieldType = IUser;
  const { form, onSubmit, loading } = useManageForm(addOrEditUser, {
    prevData: user,
    desc: "用户",
    redirectUrl: config.path.adminUser,
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
          <Input disabled placeholder={"自动生成用户ID"} />
        </Form.Item>

        <Form.Item<FieldType>
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="头像url" name="image">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="权限" name="role">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="经验值"
          name="xp"
          rules={[{ required: true, message: "请输入用户经验值" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="余额"
          name="balance"
          rules={[{ required: true, message: "请输入用户余额" }]}
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