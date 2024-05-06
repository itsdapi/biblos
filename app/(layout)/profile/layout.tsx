import CreateHeader from "@/app/ui/create-header";
import { User } from "@nextui-org/user";
import { auth, signIn } from "@/auth";
import { config } from "@/app.config";
import { IUser } from "@/app/lib/type";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    await signIn(undefined, { redirectTo: config.path.adminPanel });
  }
  const user = session!.user as IUser;

  return (
    <main>
      <CreateHeader>个人中心</CreateHeader>
      {/*<User*/}
      {/*  name={user.name}*/}
      {/*  description={user.email}*/}
      {/*  avatarProps={{*/}
      {/*    src: user.image ? user.image : "",*/}
      {/*  }}*/}
      {/*/>*/}
      {children}
    </main>
  );
}
