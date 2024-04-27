import React from "react";
import { auth, signIn } from "@/auth";
import { IUser } from "@/app/lib/type";
import { redirect } from "next/navigation";
import { config } from "@/app.config";

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

  if (!session || user.role <= "1") {
    redirect("/test");
  }

  return children;
}
