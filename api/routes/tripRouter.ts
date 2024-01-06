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
    { schema: { title: t.String() } }
  )
  .get("/trip", async ({ tripCtrl }) => {
    return await tripCtrl.getAllTrips();
  });
export default tripRouter;
