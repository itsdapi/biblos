"use client";

import Link from "next/link";
import { Button } from "antd";
import { RxHome } from "react-icons/rx";
import { usePathname } from "next/navigation";

export default function HomeButton() {
  const pathname = usePathname();

  return (
    pathname !== "/" && (
      <Link href={"/"}>
        <Button icon={<RxHome />} />
      </Link>
    )
  );
}
