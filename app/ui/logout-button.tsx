"use client";

import { Button } from "antd";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

export default function LogoutButton() {
  return <Button onClick={() => signOut()} icon={<MdLogout />} />;
}
