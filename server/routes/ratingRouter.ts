import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";

const ratingRouter = new Elysia()
  .post(
    "/rating/user",
    async ({ jwt, cookie, set, ratingCtrl, body }) => {
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await ratingCtrl.addUserRating({ set, createdBy: userId, body });
    },
    {
      schema: {
        imageUrl: t.String(),
        comment: t.String(),
        point: t.Number,
        userId: t.String(),
      },
    }
  )
  .post(
    "/rating/location",
    async ({ jwt, cookie, set, ratingCtrl, body }) => {
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await ratingCtrl.addLocationRating({ set, createdBy: userId, body });
    },
    {
      schema: {
        imageUrl: t.String(),
        comment: t.String(),
        point: t.Number,
        locationId: t.String(),
      },
    }
  );
export default ratingRouter;
