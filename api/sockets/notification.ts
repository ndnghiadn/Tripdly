import Elysia from "elysia";
import { Noti } from "../models/noti";

const notiSocket = new Elysia().ws("/notification", {
  async open(ws: any) {
    const { userId } = await ws.data.jwt.verify(ws.data.cookie.auth);
    ws.subscribe(userId);
    const tmp = await Noti.find({
      userId,
    });
    ws.send(JSON.stringify({ type: "NOTI_SET", data: tmp }));
    console.log("User", userId, "has subcribe to his notification channel");
  },
  message(ws: any, message: { data: any; type: string }) {
    switch (message.type) {
      case "NOTI_ADD":
        ws.publish(
          message.data.userId,
          JSON.stringify({ type: "NOTI_ADD", data: message.data })
        );
        console.log(
          "Message to ",
          message.data.userId,
          "with data",
          message.data
        );
        break;
      case "ACCEPT_REQUEST":
        ws.publish(
          message.data.createdBy._id,
          JSON.stringify({ type: "ACCEPT_REQUEST", data: message.data })
        );
        break;
      case "DENY_REQUEST":
        ws.publish(
          message.data.createdBy._id,
          JSON.stringify({ type: "DENY_REQUEST", data: message.data })
        );
        break;
      default:
        break;
    }
  },
  close(ws: any) {
    console.log("User", ws.data.cookie.userId, "has left");
  },
});

export default notiSocket;
