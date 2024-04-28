import { notFound } from "next/navigation";
import CreateHeader from "@/app/ui/create-header";
import BookForm from "@/app/ui/components/manage/form/book-form";
import { getAllPress, getPressDetailById } from "@/app/lib/action/press";
import { getBookDetailById } from "@/app/lib/action/book";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const [book, press] = await Promise.all([
    getBookDetailById(id),
    getAllPress(0, 10),
  ]);
  if (!book) {
    notFound();
  }

  return (
    <main className={"w-full"}>
      <CreateHeader>编辑书本</CreateHeader>
      <BookForm book={book} press={press} />
    </main>
  );
}
