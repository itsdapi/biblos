import { auth } from "@/auth";
import LoginButton from "@/app/ui/button/login-button";
import UserInfo from "@/app/ui/user-info";
import LogoutButton from "@/app/ui/button/logout-button";
import { IUser, Role } from "@/app/lib/type";
import { Button } from "antd";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import HomeButton from "@/app/ui/button/home-button";
import { MdShoppingCart } from "react-icons/md";
import { config } from "@/app.config";
import SearchPrompt from "@/app/ui/search-prompt";

export default async function Header() {
  const session = await auth();
  const user = session?.user as IUser | undefined;

  return (
    <div className={"border-b p-5"}>
      <div
        className={
          "container mx-auto flex justify-between flex-col space-y-4 md:space-y-0 md:flex-row items-center"
        }
      >
        <div className={"flex flex-row space-x-2 items-center"}>
          <Link href={"/"} className={"shrink-0"}>
            <h1 className={"font-bold text-2xl"}>biblos 在线书店</h1>
          </Link>
          <SearchPrompt />
        </div>
        {session ? (
          <div className={"flex gap-4 items-center"}>
            <UserInfo user={user} />
            <div className={"gap-2 flex flex-row items-center"}>
              <LogoutButton />
              {user && user.role > Role["注册会员"] && (
                <Link href={config.path.adminPanel}>
                  <Button icon={<RxDashboard />} />
                </Link>
              )}
              <Link href={config.path.cart}>
                <Button icon={<MdShoppingCart />} />
              </Link>
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
