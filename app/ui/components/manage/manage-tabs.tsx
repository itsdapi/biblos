"use client";

import type { RadioChangeEvent, TabsProps } from "antd";
import { Radio, Space, Tabs } from "antd";
import { useState } from "react";
import Table from "@/app/ui/table";
import ManageBook from "@/app/ui/components/manage/manage-book";
import ManagePress from "@/app/ui/components/manage/manage-press";

export default function ManageTabs() {
  type TabPosition = "left" | "right" | "top" | "bottom";
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "书本",
      children: <ManageBook />,
    },
    {
      key: "2",
      label: "出版社",
      children: <ManagePress />,
    },
    {
      key: "3",
      label: "配送公司",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div>
      <Tabs tabPosition={tabPosition} items={items} />
    </div>
  );
}
