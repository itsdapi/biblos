import { getAllBooks } from "@/app/lib/action/book";
import BookItem from "@/app/ui/components/book-item";

export default async function Home() {
  const [books] = await Promise.all([getAllBooks()]);
  return (
    <main className={"mt-5"}>
      {books.map((book) => (
        <BookItem
          key={book.ISBN}
          title={book.bookTitle}
          price={book.price}
          stock={book.stockNumber}
        />
      ))}
    </main>
  );
}
