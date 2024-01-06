import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken";

const requestRouter = new Elysia()
  .post(
    "request",
    async ({ jwt, cookie, set, body, requestCtrl }) => {
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await requestCtrl.addRequest({ createdBy: userId, body, set });
    },
    {
      schema: {
        message: t.String(),
        memberQuantity: t.Number(),
        tripId: t.String(),
      },
    }
  )
  .get("/request", async ({ requestCtrl }) => {
    return await requestCtrl.getAllRequests();
  });
export default requestRouter;
