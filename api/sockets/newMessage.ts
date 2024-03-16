import Elysia from "elysia";
import mongoose, { Types } from "mongoose";
import { Trip } from "../models/trip";
import { Request } from "../models/request";
import { Message } from "../models/message";

  
const newMessageSocket = new Elysia().ws("/new-message",  {
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
            ws.subscribe(userId);
            console.log("connected to new message server");

            //Using Change stream to detect new messages
            const db=mongoose.connection;
            // db.once('open', async () => {
            //     console.log('Connected to MongoDB');
                const changeStream = Message.watch();

                // Listen for change events
                changeStream.on('change', (change) => {
                    console.log('Change detected:', change);

                    // Send change notification to the connected WebSocket client
                    ws.send(JSON.stringify(change));
                });

                // Handle error events
                changeStream.on('error', (err) => {
                    console.error('Change stream error:', err);
                });

            // })
        
            // // Broadcast that a user joined
            //   ws.publish(ws.data.cookie.tripId, JSON.stringify({ type: "USERS_ADD", data: userId }));
        
            // // Send message to the newly connected client containing existing users and messages
            // ws.send(JSON.stringify({ type: "USERS_SET", data: users }));
            // ws.send(JSON.stringify({ type: "MESSAGES_SET", data: messages }));
        }
        else{
          console.log("close");
          ws.close();          
        }
      },
      message(ws: any, data: { text: string }) {      
        console.log("Connection closed")
      },
      close(ws: any) {
        // users = users.filter((username) => username !== "abc");
  
        // Send message to all clients subscribed to the chat channel that user left
        // ws.publish("chat", JSON.stringify({ type: "USERS_REMOVE", data: "abc" }));
        console.log("Connection closed")
      },
  });

export default newMessageSocket;
