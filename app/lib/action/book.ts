"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Book } from "@/app/lib/db/entities/Book";
import { Press } from "@/app/lib/db/entities/Press";
import {UserEntity} from "@/app/lib/db/entities/User";
import {getUserRepository} from "@/app/lib/action/user";
import {getPressRepository} from "@/app/lib/action/press";

export async function getBookRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Book);
}

export async function getAllBooks() {
  const bookRepository = await getBookRepository();
  const data = JSON.stringify(await bookRepository.find());
  return JSON.parse(data) as Book[];
}

/**
 * Adds multiple new books to the database.
 * @returns {Promise<Book[]>} - The newly added books.
 * @param bookData
 */
export async function addBook(
  bookData: Partial<Book> & { pressId: number }
): Promise<void> {
  const {pressId, ...data} = bookData;
  const bookRepository = await getBookRepository();
  const pressRepository = await getPressRepository();
  const press = await pressRepository.findOneBy({ id: pressId });

  if (!press) {
    console.error("Press not found");
    return;
  }
  // console.log("bookData", data);

  // console.log("press", press);
  const book = bookRepository.create({
    ...data,
    press: press,
  });
  await bookRepository.insert(book);
  console.log(`Book ${bookData.bookTitle} added`);
  return;
}

export async function getBookCount() {
  const repo = await getBookRepository();
  return await repo.count();
}
