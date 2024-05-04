"use client";

import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Tabs as TB } from "antd";

interface ITabs {
  key: string;
  label: string;
  path: string;
}

export function Tabs({ items }: { items: ITabs[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState("1");
  useEffect(() => {
    locateTab();
  }, []);

  const locateTab = () => {
    const item = items.find((item) => pathname.startsWith(item.path));
    if (item) {
      setActive(item.key);
    }
  };

  const handleChange = (activeKey: string) => {
    const item = items.find((item) => item.key === activeKey);
    if (item) {
      setActive(item.key);
      router.push(item.path);
    }
  };

  return (
    <TB
      tabPosition={"left"}
      items={items}
      onTabClick={handleChange}
      activeKey={active}
    />
  );
}
