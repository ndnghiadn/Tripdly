import { Message } from './../models/message';
import { Trip } from '../models/trip';
import { Request } from '../models/request';
import Elysia from "elysia";
import { Types } from 'mongoose';

const chatSocket = new Elysia().ws("/chat",  {
    async open(ws: any) {
      console.log(
        "ne nen e",
        ws.data.cookie
      );
      const { userId } = await ws.data.jwt.verify(ws.data.cookie.auth)

      //Find request by user
      const request = await ws.data.requestCtrl.getRequestToTripByUserId({userId: userId, tripId: ws.data.cookie.tripId});
      
      //Find if the trip is created by user 
      const trip = await ws.data.tripCtrl.checkIfUserOwnTrip({tripId: ws.data.cookie.tripId, userId: userId})
      //If the trip is created by user or is user accepted
      if(request?.status === "Accepted" || trip){
        
        const members = await ws.data.tripCtrl.getTripMembers({tripId: ws.data.cookie.tripId});
        const owner = await ws.data.tripCtrl.getTripOwner({tripId: ws.data.cookie.tripId});
        const users = {members, owner}
        const messages = await ws.data.messageCtrl.getAllMessagesFromTrip({tripId: ws.data.cookie.tripId});

        // // Subscribe to pubsub channel to send/receive broadcasted messages,
        // // without this the socket could not send events to other clients
        ws.subscribe(ws.data.cookie.tripId);
        console.log("connected to chat server");
  
        // // Broadcast that a user joined
        // ws.publish(ws.data.cookie.tripId, JSON.stringify({ type: "USERS_ADD", data: userId }));
  
        // // Send message to the newly connected client containing existing users and messages
        ws.send(JSON.stringify({ type: "USERS_SET", data: users }));
        ws.send(JSON.stringify({ type: "MESSAGES_SET", data: messages }));
      }
      else{
        console.log("close");
        ws.close();          
      }
    },
    async message(ws: any, data: { text: string }) {      
      const { userId } = await ws.data.jwt.verify(ws.data.cookie.auth)

      try{
        //Saving message data, send and publish to subcribers
        await ws.data.messageCtrl.addMessage({userId: userId, tripId: ws.data.cookie.tripId, content: data.text})
 
        await ws.data.messageCtrl.getLatestMessagesFromTrip({ tripId: ws.data.cookie.tripId })
        .then((latestMessage: string) => {
          ws.send(JSON.stringify({ type: "MESSAGES_ADD", data: latestMessage }));
          ws.publish(
            ws.data.cookie.tripId,
            JSON.stringify({
              type: "MESSAGES_ADD",
              data: latestMessage,
            })
          );
        })
        .catch((err: Error) => {
          console.error('Error finding latest document:', err);
        });
      }catch(err){
        // Handle errors
        console.error('Error in main block:', err);
      }
        
        
    },
    close(ws: any) {
      // users = users.filter((username) => username !== "abc");

      // Send message to all clients subscribed to the chat channel that user left
      // ws.publish("chat", JSON.stringify({ type: "USERS_REMOVE", data: "abc" }));
      console.log("Connection closed")
    },
  });

export default chatSocket;
