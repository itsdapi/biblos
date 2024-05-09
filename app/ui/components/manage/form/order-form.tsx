"use client";

import { Button, Form, Input, Select } from "antd";
import React from "react";
import useManageForm from "@/app/lib/hook/use-manage-form";
import { config } from "@/app.config";
import { IUser } from "@/app/lib/type";
import { addOrEditUser } from "@/app/lib/action/user";
import { Order } from "@/app/lib/db/entities/Order";
import { addOrEditOrder } from "@/app/lib/action/order";

export default function OrderForm({ order }: { order?: Order }) {
  type FieldType = Order;
  const { form, onSubmit, loading } = useManageForm(addOrEditOrder, {
    prevData: order,
    desc: "订单",
    redirectUrl: config.path.adminOrder,
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
          <Input disabled placeholder={"自动生成订单ID"} />
        </Form.Item>

        <Form.Item<FieldType> label="用户ID" name="userId">
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType> label="总金额" name="totalAmount">
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType> label="订单状态" name="orderStatus">
          <Select
            options={[
              { value: 0, label: "待处理" },
              { value: 1, label: "处理中" },
              { value: 2, label: "已付款" },
              { value: 3, label: "已发货" },
              { value: 4, label: "已完成" },
              { value: 5, label: "已退货" },
              { value: 6, label: "已退款" },
              { value: 7, label: "已取消" },
            ]}
          />
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
