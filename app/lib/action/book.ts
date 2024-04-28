"use server";

import { getDBConnection } from "@/app/lib/db/connection";
import { Book } from "@/app/lib/db/entities/Book";
import { Press } from "@/app/lib/db/entities/Press";
import { UserEntity } from "@/app/lib/db/entities/User";
import { getUserRepository } from "@/app/lib/action/user";
import { getPressDetailById, getPressRepository } from "@/app/lib/action/press";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";

export async function getBookRepository() {
  const connection = await getDBConnection();
  return connection.getRepository(Book);
}

export async function getAllBooks(skip: number, limit: number) {
  try {
    const bookRepository = await getBookRepository();
    const data = JSON.stringify(
      await bookRepository.find({
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
      }),
    );
    return JSON.parse(data) as Book[];
  } catch (error) {
    console.error("Fail to get books", error);
    return [];
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
