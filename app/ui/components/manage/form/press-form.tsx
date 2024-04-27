"use client";

import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Press } from "@/app/lib/db/entities/Press";
import toast from "react-hot-toast";
import {addPress} from "@/app/lib/action/press";
import {addBook} from "@/app/lib/action/book";

export default function PressForm() {
  type FieldType = Press;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FieldType) => {
    try {
      setLoading(true);
      await addPress(formData);
      toast.success("添加出版社成功");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error adding press", e);
      toast.error("添加出版社错误");
    }
  };

  return (
    <div className={'p-2'}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="出版社编号"
          name='pressNo'
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
          rules={[{ required: true, message: "请输入出版社地址" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮政编码"
          name="zipCode"
          rules={[{ required: true, message: "请输入邮政编码" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="联系人"
          name="contactPerson"
          rules={[{ required: true, message: "请输入联系人" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="联系电话"
          name="telephone"
          rules={[{ required: true, message: "请输入联系电话" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="传真"
          name="fax"
          rules={[{ required: true, message: "请输入传真" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="电子邮箱"
          name="email"
          rules={[{ required: true, message: "请输入email" }]}
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
