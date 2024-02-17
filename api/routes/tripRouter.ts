import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkMYiVcgNPSXE5nSns-tZJeou4xu1p_mQ",
  authDomain: "tripdly-8f271.firebaseapp.com",
  projectId: "tripdly-8f271",
  storageBucket: "tripdly-8f271.appspot.com",
  messagingSenderId: "352575218992",
  appId: "1:352575218992:web:15782e13030225c5a7d4f5",
  measurementId: "G-ZKH77Y1XY3"
};
initializeApp(firebaseConfig);
const storage = getStorage();

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
            address: t.Array(t.String()),
            images: t.Files(),
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
  .get("/getAllLatestTrips", async ({ tripCtrl }) => {
    return await tripCtrl.getAllLatestTrips();
  });
export default tripRouter;
