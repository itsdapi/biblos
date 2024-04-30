import BookItem from "@/app/ui/components/book-item";
import { getAllBooks } from "@/app/lib/action/book";

export default async function BookList() {
  const [books] = await Promise.all([getAllBooks(0, 10)]);

  return (
    <div className={"flex flex-row gap-4 flex-wrap mx-auto pb-20"}>
      {books.payload.map((book) => (
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
  );
}
