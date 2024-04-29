import { config } from "@/app.config";
import { getAllBooks } from "@/app/lib/action/book";
import ManageBookTable from "@/app/ui/components/manage/table/manage-book-table";
import TableHeader from "@/app/ui/table-header";
import Pagination from "@/app/ui/pagination";

export default async function BookManage({
  searchParams,
}: {
  searchParams?: { page?: number };
}) {
  const itemPerPage = 8;
  const currentPage = searchParams?.page || 1;
  const skip = (currentPage - 1) * itemPerPage;
  const [{ total, payload }] = await Promise.all([
    getAllBooks(skip, itemPerPage),
  ]);
  const { adminBook, addBook } = config.path;

  return (
    <div className={"space-y-4 w-full"}>
      <TableHeader toPath={addBook} currPath={adminBook} text={"添加书本"} />
      <ManageBookTable books={payload} />
      <Pagination totalItems={total} itemPerPage={itemPerPage} />
    </div>
  );
}
