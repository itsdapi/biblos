"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Book } from "@/app/lib/db/entities/Book";
import { getPressDetailById } from "@/app/lib/action/press";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { Page } from "@/app/lib/type";
import { In } from "typeorm";

export async function getBookRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Book);
}

export async function getAllBooks(
  skip: number,
  limit: number,
): Promise<Page<Book>> {
  try {
    const bookRepository = await getBookRepository();
    const [books, total] = await bookRepository.findAndCount({
      skip,
      take: limit,
      select: [
        "id",
        "ISBN",
        "bookTitle",
        "price",
        "coverUrl",
        "stockNumber",
        "author",
      ],
    });
    const data = JSON.stringify(books);
    return {
      total,
      payload: JSON.parse(data) as Book[],
    };
  } catch (error) {
    console.error("Fail to get books", error);
    return {
      total: 0,
      payload: [],
    };
  }
}

export async function getBookDetailById(bookId: number) {
  const repo = await getBookRepository();
  const data = JSON.stringify(await repo.findOne({ where: { id: bookId } }));
  return JSON.parse(data) as Book | null;
}

export async function addOrEditBook(
  bookData: Partial<Book> & { pressId: number },
): Promise<void> {
  const { pressId, ...data } = bookData;
  const bookRepository = await getBookRepository();
  const press = await getPressDetailById(pressId);

  if (!press) {
    console.error("Press not found");
    return;
  }

  const book = bookRepository.create({
    ...data,
    press: press,
  });
  console.log("new book", book);
  await bookRepository.save(book);
  console.log(`Book ${bookData.bookTitle} added`);
  revalidatePath(config.path.adminBook);
  return;
}

export async function deleteBookById(bookId: number) {
  const repo = await getBookRepository();
  await repo.delete(bookId);
  revalidatePath(config.path.adminBook);
  return;
}

export async function getBookCount() {
  try {
    const repo = await getBookRepository();
    return await repo.count();
  } catch (error) {
    console.error("Fail get book count", error);
    return 0;
  }
}

export async function getBooksByIds(ids: number[]): Promise<Page<Book>> {
  try {
    const repo = await getBookRepository();
    const [book, total] = await repo.findAndCount({ where: { id: In(ids) } });
    const data = JSON.stringify(book);
    return {
      total,
      payload: JSON.parse(data),
    };
  } catch (e) {
    return {
      total: 0,
      payload: [],
    };
  }
}

/**
 * Check book's stock number meet requirement
 * True: able to buy
 * False: not able to buy
 * @param bookId
 * @param require
 */
export async function checkStock(bookId: number, require: number) {
  const repo = await getBookRepository();
  const book = await repo.findOne({
    where: { id: bookId },
    select: ["stockNumber", "bookTitle"],
  });
  if (!book) {
    console.error("Book not found");
    return {
      name: "",
      isAvailable: false,
    };
  }
  return {
    id: book.bookTitle,
    isAvailable: book.stockNumber > require,
  };
}

export async function buyBook(bookId: number, quantity: number) {
  const repo = await getBookRepository();
  const book = await repo.findOne({ where: { id: bookId } });
  if (!book) {
    throw new Error(`id:${bookId} 找不到物品`);
  }
  if (book.stockNumber < quantity) {
    throw new Error(`id:${bookId} 库存不足`);
  }
  const newBook = repo.create({
    id: bookId,
    stockNumber: book.stockNumber - quantity,
  });
  await repo.save(newBook);

  return;
}
