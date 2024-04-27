import { auth } from "@/auth";
import LoginButton from "@/app/ui/login-button";
import UserInfo from "@/app/ui/user-info";
import LogoutButton from "@/app/ui/logout-button";
import { IUser } from "@/app/lib/type";
import { Button } from "antd";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import HomeButton from "@/app/ui/home-button";

export default async function Header() {
  const session = await auth();
  const user = session?.user as IUser;


  return (
    <div className={"border-b p-5"}>
      <div
        className={
          "container mx-auto flex justify-between flex-row items-center"
        }
      >
        <Link href={'/'}>
          <h1 className={"font-bold text-2xl"}>biblos 在线书店</h1>
        </Link>
        {session ? (
          <div className={"flex gap-4 items-center"}>
            <UserInfo user={session.user} />
            <div className={"gap-2 flex flex-row items-center"}>
              <LogoutButton />
              {user.role === "3" && (
                <div>
                  <Link href={"/dashboard"}>
                    <Button icon={<RxDashboard />} />
                  </Link>
                </div>
              )}
              <HomeButton />
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
