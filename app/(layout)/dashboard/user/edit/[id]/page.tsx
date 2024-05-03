import { notFound } from "next/navigation";
import CreateHeader from "@/app/ui/create-header";
import { getUserDetailById } from "@/app/lib/action/user";
import UserForm from "@/app/ui/components/manage/form/user-form";

export default async function Page({ params }: { params: { id: string } }) {
  const [user] = await Promise.all([getUserDetailById(params.id)]);
  if (!user) {
    notFound();
  }

  return (
    <main className={"w-full"}>
      <CreateHeader>编辑用户</CreateHeader>
      <UserForm user={user} />
    </main>
  );
}
