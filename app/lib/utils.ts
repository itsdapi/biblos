import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 10; // You can increase the salt rounds for more security
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hashedPassword);
  return hashedPassword;
}

export async function checkPassword(password: string, hashedPassword: string) {
  const match = await bcrypt.compare(password, hashedPassword);
  if (match) {
    console.log("Passwords match!");
  } else {
    console.log("Passwords do not match!");
  }
  return match;
}
