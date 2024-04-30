import BookForm from "@/app/ui/components/manage/form/book-form";
import { getAllPress } from "@/app/lib/action/press";
import CreateHeader from "@/app/ui/create-header";

export default async function BookCreate() {
  const [{ payload }] = await Promise.all([getAllPress(0, 10)]);

  return (
    <main className={"w-full"}>
      <CreateHeader>添加书本</CreateHeader>
      <BookForm press={payload} />
    </main>
  );
}
