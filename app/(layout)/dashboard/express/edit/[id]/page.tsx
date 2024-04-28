import { notFound } from "next/navigation";
import CreateHeader from "@/app/ui/create-header";
import ExpressForm from "@/app/ui/components/manage/form/express-form";
import { getExpressDetailById } from "@/app/lib/action/express";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const [express] = await Promise.all([getExpressDetailById(id)]);
  if (!express) {
    notFound();
  }

  return (
    <main className={"w-full"}>
      <CreateHeader>编辑快递公司</CreateHeader>
      <ExpressForm express={express} />
    </main>
  );
}
