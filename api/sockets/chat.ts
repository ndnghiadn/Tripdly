import Elysia from "elysia";
import { Noti } from "../models/noti";

const messages = [];
let users = [];

const chatSocket = new Elysia().ws("/chat", {
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
  });

export default chatSocket;
