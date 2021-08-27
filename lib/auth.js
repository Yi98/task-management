import { hash, compare } from "bcryptjs";
import { getSession } from "next-auth/client";

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

  return { session };
}

export async function allowViewPage(req) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
