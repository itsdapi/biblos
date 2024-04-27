"use client";

import { Button, Form, Input, Select } from "antd";
import { Book } from "@/app/lib/db/entities/Book";
import React, { useState } from "react";
import { addBook } from "@/app/lib/action/book";
import { Press } from "@/app/lib/db/entities/Press";
import toast from "react-hot-toast";

export default function BookForm({ press }: { press: Press[] }) {
  type FieldType = Book & { pressId: number };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FieldType) => {
    try {
      setLoading(true);
      await addBook(formData);
      toast.success("添加书籍成功");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error adding book", e);
      toast.error("添加书籍错误");
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
          label="ISBN"
          name="ISBN"
          rules={[{ required: true, message: "请输入ISBN" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="书名"
          name="bookTitle"
          rules={[{ required: true, message: "请输入书名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="作者"
          name="author"
          rules={[{ required: true, message: "请输入作者" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="出版日期"
          name="publishDate"
          rules={[{ required: true, message: "请输入出版日期" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="版次"
          name="version"
          rules={[{ required: true, message: "请输入版次" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="类别"
          name="category"
          rules={[{ required: true, message: "请输入作者类别" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="库存数量"
          name="stockNumber"
          rules={[{ required: true, message: "请输入库存数量" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="定价"
          name="price"
          rules={[{ required: true, message: "请输入定价" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="图书折扣"
          name="bookDiscount"
          rules={[{ required: true, message: "请输入图书折扣" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="目录"
          name="catalog"
          rules={[{ required: true, message: "请输入目录" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="内容简介"
          name="introduction"
          rules={[{ required: true, message: "请输入内容简介" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="封面地址"
          name="coverUrl"
          rules={[{ required: true, message: "请输入封面地址" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="pressId" label="出版社" rules={[{ required: true }]}>
          <Select placeholder="从下列出版社中选择" allowClear>
            {press.map((p) => (
              <Select.Option value={p.id} key={p.id}>
                {p.pressName} {p.pressNo}
              </Select.Option>
            ))}
          </Select>
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
