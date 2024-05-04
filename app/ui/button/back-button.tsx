"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  return <Button icon={<IoArrowBackSharp />} onClick={() => router.back()} />;
}
