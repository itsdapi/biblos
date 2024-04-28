import BackButton from "@/app/ui/button/back-button";
import { ReactNode } from "react";

export default function CreateHeader({ children }: { children: ReactNode }) {
  return (
    <div
      className={"flex flex-row items-center gap-3 py-3 sm:border-b sm:mb-10"}
    >
      <BackButton />
      <h1 className={"text-3xl"}>{children}</h1>
    </div>
  );
}
