import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";

const authRouter = new Elysia()
  .post(
    "/sign-up",
    async ({ jwt, setCookie, set, body, authCtrl }) => {
      return await authCtrl.signUp({ jwt, setCookie, set, body });
    },
    {
      schema: {
        body: t.Object({
          username: t.String(),
          password: t.String(),
          fullname: t.String(),
          dob: t.String(),
          address: t.String(),
          phoneNumber: t.String(),
          role: t.String(),
        }),
      },
    }
  )
  .post(
    "/sign-in",
    async ({ jwt, setCookie, set, body, authCtrl }) => {
      return await authCtrl.signIn({ jwt, setCookie, set, body });
    },
    {
      schema: {
        body: t.Object({
          username: t.String(),
          password: t.String(),
        }),
      },
    }
  )
  .post("/sign-out", async ({ removeCookie }) => {
    return await authCtrl.signOut({ removeCookie });
  });

export default authRouter;
