"use client";

import { signIn } from "next-auth/react";
import { Button } from "antd";

export default function LoginButton() {
  return <Button onClick={() => signIn()}>登陆</Button>;
}
