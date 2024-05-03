"use server";

import { cookies } from "next/headers";
import { IUser, OrderStatus, Page, TCart, TCartItem } from "@/app/lib/type";
import {
  buyBook,
  checkStock,
  getBookRepository,
  getBooksByIds,
} from "@/app/lib/action/book";
import { Book } from "@/app/lib/db/entities/Book";
import { revalidatePath } from "next/cache";
import { config } from "@/app.config";
import { auth } from "@/auth";
import { getUserDiscount, getUserRepository } from "@/app/lib/action/user";
import { calculateTotalPrice } from "@/app/lib/utils";
import { getDBConnection } from "@/app/lib/db/connection";
import { UserEntity } from "@/app/lib/db/entities/User";
import { getMoneyXpExchangeRate } from "@/app/lib/action/setting";
import { Order, OrderItem } from "@/app/lib/db/entities/Order";

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

export async function checkoutCart(carts: TCart[]) {
  const connection = await getDBConnection();
  const user = (await auth())?.user as IUser | undefined;
  if (!user) {
    throw new Error("User not login");
  }
  const userId = user?.id;
  const userBalance = user?.balance;
  const userDiscount = await getUserDiscount();
  const userXp = user?.xp;
  const moneyToXpRate = await getMoneyXpExchangeRate();
  const totalAmount = calculateTotalPrice(carts, userDiscount);

  // Check balance
  if (userBalance < totalAmount) {
    throw new Error("余额不足");
  }

  // Check stock
  const stockResults = await Promise.all(
    carts.map((cart) => checkStock(cart.id, cart.quantity)),
  );
  const unavailableItems = stockResults.filter((result) => !result.isAvailable);
  if (unavailableItems.length > 0) {
    throw new Error(`${unavailableItems.map((item) => item.name)} \n 库存不足`);
  }

  // Buy book
  await Promise.all(carts.map((cart) => buyBook(cart.id, cart.quantity)));

  // Update User balance, xp
  const userRepository = await getUserRepository();
  await userRepository.update(
    { id: userId },
    {
      balance: userBalance - totalAmount,
      xp: userXp + totalAmount * moneyToXpRate,
    },
  );

  // Create Order first
  const orderRepository = connection.getRepository(Order);
  const order = orderRepository.create({
    userId,
    totalAmount,
    orderStatus: OrderStatus.Processing,
  });
  await orderRepository.save(order);

  // Create record for each purchase item
  const orderItemRepository = connection.getRepository(OrderItem);
  const orderItems = carts.map((cart) => {
    if (!cart.item) {
      throw new Error(`${cart.id}'s has no item`);
    }
    return orderItemRepository.create({
      itemId: cart.id,
      orderId: order.id,
      quantity: cart.quantity,
      totalAmount: cart.item.price,
    });
  });
  await orderItemRepository.save(orderItems);
  revalidatePath(config.path.cart);
  await emptyCart();
  console.log("Successfully checkout");
  return order.id;
}
