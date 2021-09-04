import { getSession } from "next-auth/client";

export function isAuthenticated(gssp) {
  return async (context) => {
    const session = await getSession({ req: context.req });

    context.req.session = session;
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await gssp(context, session); // Continue on to call `getServerSideProps` logic
  };
}