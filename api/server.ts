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
import * as mongoose from "mongoose";

// connect to database
try {
  await mongoose.connect(process.env.MONGO as string);
  console.log("Connected to database!");
} catch (error) {
  console.error("DB_ERROR: ", error);
}

const messages = [];
let users = [];

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

  // =======sockets=======
  .ws("/chat", {
    open(ws: any) {
      console.log(
        "ne nen e",
        ws.data.cookie
        // ws.data.request.cookie.roomId
      );
      // console.log("cookie token", ws.data.cookie);
      // Store username
      users.push("abc");

      // Subscribe to pubsub channel to send/receive broadcasted messages,
      // without this the socket could not send events to other clients
      ws.subscribe("chat");

      // Broadcast that a user joined
      ws.publish("chat", JSON.stringify({ type: "USERS_ADD", data: "abc" }));

      // Send message to the newly connected client containing existing users and messages
      ws.send(JSON.stringify({ type: "USERS_SET", data: users }));
      ws.send(JSON.stringify({ type: "MESSAGES_SET", data: messages }));
    },
    message(ws: any, data: { text: string }) {
      // Data sent is a string, parse to object
      messages.push(data.text);

      // Send message to all clients subscribed to the chat channel with new message
      ws.publish(
        "chat",
        JSON.stringify({
          type: "MESSAGES_ADD",
          data: { username: "abc", text: data.text },
        })
      );
    },
    close(ws: any) {
      users = users.filter((username) => username !== "abc");

      // Send message to all clients subscribed to the chat channel that user left
      ws.publish("chat", JSON.stringify({ type: "USERS_REMOVE", data: "abc" }));
    },
  })

  .listen(9999);

console.log(`Server is running at localhost:${app.server.port}`);
