"use client";

import Link from "next/link";
import { Button } from "antd";
import { RxHome } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  return <Button icon={<IoArrowBackSharp />} onClick={() => router.back()} />;
}
