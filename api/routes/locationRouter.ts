import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";

const locationRouter = new Elysia()
  .post(
    "/locations",
    async ({ jwt, cookie, set, body, locationCtrl }) => {
      console.log(body);
      
      const userId = await verifyToken({ jwt, cookie });
      if (!userId) {
        set.status = 401;
        return { message: "Unauthorized" };
      }
      return await locationCtrl.addLocation({ set, body, createdBy: userId });
    },
    {
      body: t.Object({
        name: t.String(),
        images: t.Files()
      }),
    }
  )
  // .get("/location", async ({ locationCtrl }) => {
  //   return await locationCtrl.getAllLocations();
  // })
  .get("/locations", async ({ locationCtrl,name, query }) => {
    console.log(query);
    
    if(query["address"])
      return await locationCtrl.findLocation(query);
    return await locationCtrl.getAllLocations();
  },
  {
    query: t.Object({
        address: t.Optional(t.String())
    })
  });

export default locationRouter;
