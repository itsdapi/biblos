import React, { Suspense } from "react";
import { auth, signIn } from "@/auth";
import { IUser } from "@/app/lib/type";
import { redirect } from "next/navigation";
import { config } from "@/app.config";
import { getBookCount } from "@/app/lib/action/book";
import { getPressCount } from "@/app/lib/action/press";
import { getUserCount } from "@/app/lib/action/user";
import CountBlock from "@/app/ui/components/count-block";
import { Tabs } from "@/app/ui/tabs";
import Link from "next/link";
import DashboardStats from "@/app/ui/components/dashboard-stats";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user as IUser;
  if (!session) {
    await signIn(undefined, { redirectTo: config.path.adminPanel });
  }

  if (!session || user.role <= 1) {
    redirect(config.path.ban);
  }

  const items = [
    {
      key: "1",
      label: "书本",
      path: `${config.path.adminPanel}/book`,
    },
    {
      key: "2",
      label: "出版社",
      path: `${config.path.adminPanel}/press`,
    },
    {
      key: "3",
      label: "配送公司",
      path: `${config.path.adminPanel}/express`,
    },
  ];

  return (
    <div className={"space-y-6"}>
      <h1 className={"text-3xl border-b pb-3"}>控制面板</h1>
      <Suspense fallback={<div>Loading..</div>}>
        <DashboardStats />
      </Suspense>
      <div className={"flex flex-row pb-20"}>
        <Tabs items={items} />
        {children}
      </div>
    </div>
  );
}
