import { notFound } from "next/navigation";
import CreateHeader from "@/app/ui/create-header";
import { getPressDetailById } from "@/app/lib/action/press";
import { RestockBookList } from "@/app/ui/components/book-list";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { page?: number };
}) {
  const id = Number(params.id);

  const [press] = await Promise.all([getPressDetailById(id)]);
  if (!press) {
    notFound();
  }

  return (
    <main className={"w-full"}>
      <CreateHeader>从 {press.pressName} 进货</CreateHeader>
      <RestockBookList currPage={searchParams?.page} pressId={press.id} />
    </main>
  );
}
