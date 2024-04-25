import BookForm from "@/app/ui/book-form";
import { getAllPress } from "@/app/lib/action/press";

export default async function BookCreate() {
  const [pressData] = await Promise.all([getAllPress()]);

  return (
    <main>
      <h1 className={"text-3xl font-bold py-3 md:border-b md:mb-10"}>
        添加书本
      </h1>
      <BookForm press={pressData} />
    </main>
  );
}
