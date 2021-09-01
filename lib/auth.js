import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashPassword = await hash(password, 5);

  return hashPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}