// import bcrypt from "bcrypt";
import { Page, TCart, TCartItem } from "@/app/lib/type";
//
// export async function hashPassword(password: string) {
//   const saltRounds = 10; // You can increase the salt rounds for more security
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   console.log("Hashed Password:", hashedPassword);
//   return hashedPassword;
// }
//
// export async function checkPassword(password: string, hashedPassword: string) {
//   const match = await bcrypt.compare(password, hashedPassword);
//   if (match) {
//     console.log("Passwords match!");
//   } else {
//     console.log("Passwords do not match!");
//   }
//   return match;
// }

/**
 * Calculates the total price of all items in the cart array.
 * @param carts An array of TCart with the item field populated.
 * @param userDiscount
 * @returns The total price of all cart items.
 */
export function calculateTotalPrice(carts: TCart[], userDiscount = 1) {
  return carts.reduce((total, cart) => {
    // Ensure the item, price, and discount are defined before adding to total
    if (cart.item && cart.quantity) {
      const discountedPrice = cart.item.price * cart.item.discount;
      total += discountedPrice * cart.quantity;
    }
    return rounded2digit(total * userDiscount);
  }, 0);
}

export function rounded2digit(num: number) {
  return Math.round(num * 100) / 100;
}
