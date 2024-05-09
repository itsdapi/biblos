"use server";
import { Express } from "@/app/lib/db/entities/Express";

noStore();

import { getDBConnection } from "@/app/lib/db/connection";
import { Order, OrderItem } from "@/app/lib/db/entities/Order";
import { IUser, Page } from "@/app/lib/type";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { config } from "@/app.config";
import { getUserRepository } from "@/app/lib/action/user";
import { getExpressRepository } from "@/app/lib/action/express";

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

export async function getAllOrderById(
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

export async function getAllOrder(
  skip: number,
  limit: number,
): Promise<Page<Order>> {
  const repo = await getOrderRepository();
  const [orders, total] = await repo.findAndCount({
    order: { id: "DESC" },
    skip,
    take: limit,
  });
  const data = JSON.stringify(orders);
  return {
    total,
    payload: JSON.parse(data),
  };
}

export async function getOrderCount() {
  try {
    const repo = await getOrderRepository();
    return await repo.count();
  } catch (error) {
    console.error("Fail get order count", error);
    return 0;
  }
}

export async function addOrEditOrder(data: Order) {
  const repo = await getOrderRepository();
  const order = repo.create(data);
  await repo.save(order);
  revalidatePath(config.path.adminOrder);
  return;
}

export async function getOrderById(id: number) {
  const repo = await getOrderRepository();
  const data = JSON.stringify(await repo.findOneBy({ id }));
  return JSON.parse(data) as Order | null;
}
