import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken";

const tripRouter = new Elysia()
  .post(
    "trip",
    async ({ jwt, cookie, set, body, tripCtrl }) => {
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await tripCtrl.addTrip({ createdBy: userId, body, set });
    },
    {
      schema: {
        body: t.Object({
            title: t.Optional(t.String()),
            locationId: t.Array(t.String()),
            time: t.Array(
            t.Object({
                date: t.String(),
                from: t.String(),
                to: t.String()
            })
            ),
            description: t.String(),
            memberLimit: t.Optional(t.Number())
        }),
      }
    }
  )
  .get("/getAllLatestTrips", async ({ tripCtrl }) => {
    return await tripCtrl.getAllLatestTrips();
  });
export default tripRouter;
