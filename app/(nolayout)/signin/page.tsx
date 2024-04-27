import {auth, providerMap, signIn} from "@/auth";
import { Button } from "@nextui-org/react";
import { VscGithubInverted } from "react-icons/vsc";
import {ReactNode} from "react";
import {SiGitee} from "react-icons/si";
import {FaKey} from "react-icons/fa";
import {redirect} from "next/navigation";

const providerIcons: { [key: string]: ReactNode } = {
  'GitHub': <VscGithubInverted />,
  'Gitee': <SiGitee />,
  'Authentik': <FaKey />
};

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    console.log('session exist, redirecting..')
    redirect('/')
  }

  return (
    <div className={"h-screen w-full flex justify-center items-center"}>
      <div className="flex flex-col gap-2 p-20 rounded-xl bg-white/80 border">
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id);
            }}
          >
            <Button
              variant={"ghost"}
              color={"primary"}
              type={"submit"}
              fullWidth
              startContent={providerIcons[provider.name]}
              className={"justify-start"}
            >
              <span>使用 {provider.name} 登陆</span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
