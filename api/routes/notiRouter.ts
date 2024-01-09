import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken";

const notiRouter = new Elysia()
  .post(
    "/noti",
    async ({ jwt, cookie, set, body, notiCtrl }) => {
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await notiCtrl.addNoti({ body, set });
    },
    {
      schema: {
        message: t.String(),
        memberQuantity: t.Number(),
        tripId: t.String(),
      },
    }
  )
  .get("/noti", async ({ notiCtrl }) => {
    return await notiCtrl.getAllNotis();
  });
export default notiRouter;
