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
            locations: t.Array(t.Object({
              name: t.String(),
              imageUrls: t.Array(t.String())
            })),
            time: t.Object({
                date: t.String(),
                from: t.String(),
                to: t.String()
            }),
            description: t.String(),
            memberLimit: t.Optional(t.Number())
        }),
      }
    }
  )
  .get("/trips", async ({ tripCtrl }) => {
    return await tripCtrl.getAllLatestTrips();
  });
export default tripRouter;
