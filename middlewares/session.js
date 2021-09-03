const handler = nc();
import { getSession } from "next-auth/client";

const session = await getSession({ req: context.req });
if (!session) {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default handler;