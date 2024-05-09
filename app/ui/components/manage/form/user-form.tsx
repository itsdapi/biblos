"use client";

import { Button, Form, Input, Select } from "antd";
import React from "react";
import useManageForm from "@/app/lib/hook/use-manage-form";
import { config } from "@/app.config";
import { IUser } from "@/app/lib/type";
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
          <Select
            options={[
              { value: "0", label: "封禁用户" },
              { value: "1", label: "注册会员" },
              { value: "2", label: "员工" },
              { value: "3", label: "超级打工人" },
            ]}
          />
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
