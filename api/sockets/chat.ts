import { data } from '@emoji-mart/data';
import { cookie } from '@elysiajs/cookie';
import { Message } from './../models/message';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { log } from 'console';
import Elysia from "elysia";
import { decode } from 'punycode';

const messages = [];
let users = [];

const chatSocket = new Elysia().ws("/chat",  {
    async open(ws: any, jwt: any) {
      console.log(
        "ne nen e",
        ws.data.cookie
      );
      const decoded = await ws.data.jwt.verify(ws.data.cookie.auth)
      console.log("decode",decoded.userId);
      
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
      console.log(data.text);
      
      // Data sent is a string, parse to object
      messages.push(data.text);

      // Send message to all clients (exclude the client who sent the message) subscribed to the chat channel with new message
      ws.publish(
        "chat",
        JSON.stringify({
          type: "MESSAGES_ADD",
          data: { username: "abc", text: data.text },
        })
      );      
      ws.send(JSON.stringify({ type: "MESSAGES_SET", data: messages }));
      ws.publish("chat",JSON.stringify({ type: "MESSAGES_SET", data: messages }));
    },
    close(ws: any) {
      users = users.filter((username) => username !== "abc");

      // Send message to all clients subscribed to the chat channel that user left
      ws.publish("chat", JSON.stringify({ type: "USERS_REMOVE", data: "abc" }));
    },
  });

export default chatSocket;
