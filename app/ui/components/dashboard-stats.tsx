import CountBlock from "@/app/ui/components/count-block";
import React from "react";
import { getBookCount } from "@/app/lib/action/book";
import { getPressCount } from "@/app/lib/action/press";
import { getUserCount } from "@/app/lib/action/user";
import { getExpressCount } from "@/app/lib/action/express";
import { getOrderCount } from "@/app/lib/action/order";

export default async function DashboardStats() {
  const [bookCount, pressCount, userCount, expressCount, orderCount] =
    await Promise.all([
      getBookCount(),
      getPressCount(),
      getUserCount(),
      getExpressCount(),
      getOrderCount(),
    ]);

  return (
    <div className={"flex flex-row gap-4 border-b pb-6 overflow-x-scroll"}>
      <CountBlock count={bookCount} text={"书本数量"} />
      <CountBlock count={pressCount} text={"出版社数量"} />
      <CountBlock count={userCount} text={"用户数量"} />
      <CountBlock count={expressCount} text={"快递公司数量"} />
      <CountBlock count={orderCount} text={"订单数量"} />
    </div>
  );
}
