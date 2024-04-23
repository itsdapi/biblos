import { getDBConnection } from "@/app/lib/db/connection";
import { Book } from "@/app/lib/db/models/book";

export async function getBookList() {
  const connection = await getDBConnection();

  const bookRepository = connection.getRepository(Book);
  const books = await bookRepository.find();
  console.log(books);
  return books;
}
