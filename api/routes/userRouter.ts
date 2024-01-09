import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";

const userRouter = new Elysia()
  // ======= Authentication =======
  .post(
    "/sign-up",
    async ({ jwt, setCookie, set, body, userCtrl }) => {
      return await userCtrl.signUp({ jwt, setCookie, set, body });
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
    async ({ jwt, setCookie, set, body, userCtrl }) => {
      return await userCtrl.signIn({ jwt, setCookie, set, body });
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
  .get("/sign-out", async ({ setCookie, set, userCtrl }) => {
    return await userCtrl.signOut({ setCookie, set });
  })
  .get("/user", async ({ jwt, cookie, set, userCtrl }) => {
    const userId = await verifyToken({ jwt, cookie });
    if (!userId) {
      set.status = 401;
      return { message: "Unauthorized" };
    }
    return await userCtrl.getUserByUserId({ set, userId });
  });

export default userRouter;
