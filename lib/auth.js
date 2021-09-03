import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashPassword = await hash(password, 5);

  return hashPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}

export async function isAuthenticated(req) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
