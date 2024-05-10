import { BookItem } from "@/app/ui/components/book-item";
import { getAllBooks } from "@/app/lib/action/book";
import Pagination from "@/app/ui/pagination";
import usePageOptions from "@/app/lib/hook/use-page-option";
import { getAllPressBook } from "@/app/lib/action/press";
import { Empty } from "antd";
import { RestockBookItem } from "@/app/ui/components/manage/restock-book-item";

export async function IndexBookList() {
  const [{ payload: books, total }] = await Promise.all([getAllBooks(0, 10)]);
  return books.length !== 0 ? (
    <div
      className={
        "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 pb-20 gap-3"
      }
    >
      {books.map((book) => (
        <BookItem
          bookId={book.id}
          cover={book.coverUrl}
          key={book.ISBN}
          title={book.bookTitle}
          price={book.price}
          stock={book.stockNumber}
        />
      ))}
    </div>
  ) : (
    <Empty />
  );
}

export async function RestockBookList({
  pressId,
  currPage,
}: {
  pressId: number;
  currPage?: number;
}) {
  const [skip, limit] = usePageOptions(currPage, 10);
  const [{ payload: books, total }] = await Promise.all([
    getAllPressBook(pressId, skip, limit),
  ]);
  return (
    <>
      {books.length !== 0 ? (
        <div
          className={
            "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 pb-20 gap-3"
          }
        >
          {books.map((book) => (
            <RestockBookItem
              bookId={book.id}
              cover={book.coverUrl}
              key={book.ISBN}
              title={book.bookTitle}
              price={book.price}
              stock={book.stockNumber}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
      <Pagination totalItems={skip} itemPerPage={limit} />
    </>
  );
}
