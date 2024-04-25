"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Book } from "@/app/lib/db/entities/Book";
import { Press } from "@/app/lib/db/entities/Press";

export async function getAllBooks() {
  const connection = await getDBConnection();
  const bookRepository = connection.getRepository(Book);
  const data = JSON.stringify(await bookRepository.find());
  return JSON.parse(data) as Book[];
}

/**
 * Adds multiple new books to the database.
 * @returns {Promise<Book[]>} - The newly added books.
 * @param bookData
 */
export async function addBook(
  bookData: Partial<Book> & { pressNo: string },
): Promise<void> {
  const connection = await getDBConnection();
  const bookRepository = connection.getRepository(Book);
  const pressRepository = connection.getRepository(Press);
  const press = await pressRepository.findOneBy({ pressNo: bookData.pressNo });
  console.log("bookData", bookData.pressNo);

  if (!press) {
    console.error("Press not found");
    return;
  }
  const book = bookRepository.create({
    ...bookData,
    press: press,
  });
  await bookRepository.save(book);
  console.log(`Book ${bookData.bookTitle} added`);
  return;
}
