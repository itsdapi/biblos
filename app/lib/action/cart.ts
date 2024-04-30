"use server";

import { cookies } from "next/headers";
import { Page, TCart, TCartItem } from "@/app/lib/type";
import { getBooksByIds } from "@/app/lib/action/book";
import { Book } from "@/app/lib/db/entities/Book";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";

export async function saveCart(id: number, quantity: number) {
  const cookieStore = cookies();
  let carts: TCart[] = [];
  if (cookieStore.has("carts")) {
    carts = JSON.parse(cookieStore.get("carts")!.value);
  }
  const index = carts.findIndex((cart) => cart.id === id);
  if (index !== -1) {
    // If the product is already in the cart, change its quantity.
    carts[index].quantity = quantity;
  } else {
    // If the product is not in the cart, add a new item with the given ID and quantity.
    carts.push({ id, quantity });
  }
  cookieStore.set("carts", JSON.stringify(carts));
}

export async function deleteCartItem(id: number) {
  const cookieStore = cookies();
  if (!cookieStore.has("carts")) {
    cookieStore.set("carts", JSON.stringify([]));
    return;
  }
  let carts: TCart[] = JSON.parse(cookieStore.get("carts")!.value);
  carts = carts.filter((cart) => cart.id !== id);
  cookieStore.set("carts", JSON.stringify(carts));
  revalidatePath(config.path.cart);
}

export async function emptyCart() {
  const cookieStore = cookies();
  cookieStore.set("carts", JSON.stringify([]));
}

export async function getCart(): Promise<TCart[]> {
  const cookieStore = cookies();
  if (!cookieStore.has("carts")) {
    cookieStore.set("carts", JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(cookieStore.get("carts")!.value);
  }
}

/**
 * Populates the item field of each cart object with book data.
 * @param carts An array of TCart where item is initially undefined.
 * @returns A Promise of TCart array with the item field populated.
 */
export async function populateCartItems(carts: TCart[]): Promise<TCart[]> {
  // Extract unique IDs from the carts
  const ids = carts
    .map((cart) => cart.id)
    .filter((id, index, self) => self.indexOf(id) === index);

  // Fetch books by these IDs
  const booksPage: Page<Book> = await getBooksByIds(ids);

  // Create a map of books by ID for quick lookup
  const booksById: Record<number, TCartItem> = booksPage.payload.reduce<
    Record<number, TCartItem>
  >((acc, book) => {
    acc[book.id] = {
      name: book.bookTitle, // Mapping bookTitle to name
      description: book.author, // Mapping author to description, if available
      price: book.price,
      coverUrl: book.coverUrl,
      discount: book.bookDiscount ? book.bookDiscount : 1,
    };
    return acc;
  }, {});

  // Populate the item field in carts
  return carts.map((cart) => ({
    ...cart,
    item: booksById[cart.id],
  }));
}
