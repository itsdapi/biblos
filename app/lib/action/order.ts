"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Order, OrderItem } from "@/app/lib/db/entities/Order";
import { Page } from "@/app/lib/type";
import { unstable_noStore as noStore } from "next/cache";

export async function getOrderRepository() {
  noStore();
  const connection = await getDBConnection();
  return connection.getRepository(Order);
}

export async function getOrderItemRepository() {
  noStore();
  const connection = await getDBConnection();
  return connection.getRepository(OrderItem);
}

export async function getAllOrderItemByOrderId(
  id: number,
  skip: number,
  limit: number,
): Promise<Page<OrderItem>> {
  noStore();
  try {
    const repo = await getOrderItemRepository();
    const [orderItems, total] = await repo.findAndCount({
      where: { orderId: id },
      skip,
      take: limit,
    });
    const data = JSON.stringify(orderItems);
    return {
      total,
      payload: JSON.parse(data) as OrderItem[],
    };
  } catch (e) {
    console.error("failed to get order item");
    return {
      total: 0,
      payload: [],
    };
  }
}

export async function getAllOrder(
  userId: string,
  skip: number,
  limit: number,
): Promise<Page<Order>> {
  noStore();
  try {
    const repo = await getOrderRepository();
    const [orders, total] = await repo.findAndCount({
      where: { userId },
      order: {
        id: "DESC",
      },
      select: ["id", "userId", "createdAt", "totalAmount", "orderStatus"],
      skip,
      take: limit,
    });
    const data = JSON.stringify(orders);
    return {
      total,
      payload: JSON.parse(data),
    };
  } catch (e) {
    console.error("failed to get order");
    return {
      total: 0,
      payload: [],
    };
  }
}
