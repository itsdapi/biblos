import { SiGitee } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={"border-t p-16"}>
      <div
        className={
          "container mx-auto flex justify-between flex-col md:flex-row items-center space-y-2"
        }
      >
        <div className={"space-y-2"}>
          <h1>网上书店大全</h1>
          <div
            className={
              "gap-4 flex flex-row text-muted-foreground justify-center md:justify-start"
            }
          >
            <Link href={"https://gitee.com/itsdapi/biblos"}>
              <SiGitee className={"size-6"} />
            </Link>
            <Link href={"https://github.com/itsdapi"}>
              <FaGithub className={"size-6"} />
            </Link>
          </div>
        </div>

        <h2 className={"font-light text-sm"}>All Right Reserve @2024</h2>
      </div>
    </div>
  );
}
