import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import UserController from "./controllers/userController";
import TripController from "./controllers/tripController";
import LocationController from "./controllers/locationController";
import RequestController from "./controllers/requestController";
import RatingController from "./controllers/ratingController";
import NotiController from "./controllers/notiController";
import userRouter from "./routes/userRouter";
import tripRouter from "./routes/tripRouter";
import locationRouter from "./routes/locationRouter";
import requestRouter from "./routes/requestRouter";
import ratingRouter from "./routes/ratingRouter";
import notiRouter from "./routes/notiRouter";
import uploadRouter from './routes/uploadRoter'
import * as mongoose from "mongoose";
import notiSocket from "./sockets/notification";
import chatSocket from "./sockets/chat";

// connect to database
try {
  await mongoose.connect(process.env.MONGO as string);
  console.log("Connected to database!");
} catch (error) {
  console.error("DB_ERROR: ", error);
}

const PORT = 8888;
const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT as string,
    })
  )
  .use(cookie())
  .use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
      allowedHeaders: "Content-Type",
    })
  )
  .use(swagger())

  // =======controllers=======
  .decorate("tripCtrl", new TripController())
  .decorate("locationCtrl", new LocationController())
  .decorate("userCtrl", new UserController())
  .decorate("requestCtrl", new RequestController())
  .decorate("ratingCtrl", new RatingController())
  .decorate("notiCtrl", new NotiController())

  // =======routers=======
  .use(tripRouter)
  .use(locationRouter)
  .use(userRouter)
  .use(requestRouter)
  .use(ratingRouter)
  .use(notiRouter)
  .use(uploadRouter)

  // =======sockets=======
  .use(notiSocket)
  .use(chatSocket)

  .listen(PORT);

console.log(`Server is running at localhost:${app.server.port}`);
