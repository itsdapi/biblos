import BookItem from "@/app/ui/components/book-item";
import {getAllBooks} from "@/app/lib/action/book";

export default async function BookList() {
  const [books] = await Promise.all([getAllBooks()]);

  return <div className={'flex flex-row gap-4'}>
    {
      books.map((book) => (
        <BookItem
          cover={book.coverUrl}
          key={book.ISBN}
          title={book.bookTitle}
          price={book.price}
          stock={book.stockNumber}
        />
      ))
    }
  </div>
}
