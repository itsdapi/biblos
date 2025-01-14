import { searchBook } from "@/app/lib/action/book";
import usePageOptions from "@/app/lib/hook/use-page-option";
import { BookList } from "@/app/ui/components/book-list";
import Pagination from "@/app/ui/pagination";
import CreateHeader from "@/app/ui/create-header";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { page?: number; query?: string };
}) {
  const [skip, limit] = usePageOptions(searchParams?.page, 4);
  const [{ payload, total }] = await Promise.all([
    searchBook(skip, limit, searchParams?.query),
  ]);
  return (
    <main className={"pb-20"}>
      <CreateHeader>搜索</CreateHeader>
      <BookList books={payload} />
      <Pagination totalItems={total} itemPerPage={limit} />
    </main>
  );
}
