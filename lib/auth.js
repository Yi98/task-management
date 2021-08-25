import { hash } from "bcryptjs";

export async function hashPassword(password) {
  const hashPassword = await hash(password, 5);

  return hashPassword;
}
