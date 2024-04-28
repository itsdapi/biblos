import CountBlock from "@/app/ui/components/count-block";
import React from "react";
import { getBookCount } from "@/app/lib/action/book";
import { getPressCount } from "@/app/lib/action/press";
import { getUserCount } from "@/app/lib/action/user";
import { getExpressCount } from "@/app/lib/action/express";

export default async function DashboardStats() {
  const [bookCount, pressCount, userCount, expressCount] = await Promise.all([
    getBookCount(),
    getPressCount(),
    getUserCount(),
    getExpressCount(),
  ]);

  return (
    <div className={"flex flex-row gap-4 border-b pb-6"}>
      <CountBlock count={bookCount} text={"书本数量"} />
      <CountBlock count={pressCount} text={"出版社数量"} />
      <CountBlock count={userCount} text={"用户数量"} />
      <CountBlock count={expressCount} text={"快递公司数量"} />
    </div>
  );
}
