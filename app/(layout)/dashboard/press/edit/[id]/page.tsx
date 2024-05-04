import { notFound } from "next/navigation";
import CreateHeader from "@/app/ui/create-header";
import { getPressDetailById } from "@/app/lib/action/press";
import PressForm from "@/app/ui/components/manage/form/press-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const [press] = await Promise.all([getPressDetailById(id)]);
  if (!press) {
    notFound();
  }

  return (
    <main className={"w-full"}>
      <CreateHeader>编辑出版社</CreateHeader>
      <PressForm press={press} />
    </main>
  );
}
