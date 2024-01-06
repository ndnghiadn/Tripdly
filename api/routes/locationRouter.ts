import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";

const locationRouter = new Elysia()
  .post(
    "/location",
    async ({ jwt, cookie, set, body, locationCtrl }) => {
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await locationCtrl.addLocation({ set, body, createdBy: userId });
    },
    {
      schema: {
        body: t.Object({
          name: t.String(),
        }),
      },
    }
  )
  .get("/location", async ({ locationCtrl }) => {
    return await locationCtrl.getAllLocations();
  });

export default locationRouter;
