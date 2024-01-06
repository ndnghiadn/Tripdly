import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";

const userRouter = new Elysia().get(
  "/user",
  async ({ jwt, cookie, set, userCtrl }) => {
    const userId = await verifyToken({ jwt, cookie });
    if (!userId) {
      set.status = 401;
      return { message: "Unauthorized" };
    }
    return await userCtrl.getUserByUserId({ set, userId });
  }
);

export default userRouter;
