import Elysia from "elysia";
import { Message } from "../models/message";
import mongoose from "mongoose";

  
const newMessageSocket = new Elysia().ws("/new-message",  {
    async open(ws: any) {      
      // try {
          
        const { userId } = await ws.data.jwt.verify(ws.data.cookie.auth)
  
        //Find request by user
        const allAccessibleTrip = await ws.data.tripCtrl.getAllAccessibleTripId({userId})
        const allAccessibleTripId = allAccessibleTrip.map(trip => {
          const keyList = Object.keys(trip)
            return Object.values(trip[keyList[2]])[0]
        });

        //If the trip is created by user or is user accepted
        if(allAccessibleTripId){
          
            const members = await ws.data.tripCtrl.getTripMembers({tripId: ws.data.cookie.tripId});
            const owner = await ws.data.tripCtrl.getTripOwner({tripId: ws.data.cookie.tripId});
            const users = {members, owner}
            const messages = await ws.data.messageCtrl.getAllMessagesFromTrip({tripId: ws.data.cookie.tripId});
    
            // // Subscribe to pubsub channel to send/receive broadcasted messages,
            // // without this the socket could not send events to other clients
            ws.subscribe(userId);
            console.log("connected to new message server");

            //Using Change stream to detect new messages
            const pipeline = [{ $match: { "fullDocument.tripId": { $in: allAccessibleTripId} } }]
            const messageChangeStream = mongoose.connection.collection('messages').watch(pipeline);
            console.log("allAccessibleTripID",allAccessibleTripId);
            //Listen for change events
            messageChangeStream.on('change', (change) => {
              console.log('change',change);
                // Send change notification to the connected WebSocket 
              ws.send(JSON.stringify(change.fullDocument));
            });

            // Handle error events
            messageChangeStream.on('error', (err) => {
                console.error('Change stream error:', err);
            });
        }
        else{
          console.log("close");
          ws.close();          
        }
      // } catch (error) {
      //   console.error(error);
      //     ws.close();    
      // }
      },
      close(ws: any) {
        // users = users.filter((username) => username !== "abc");
  
        // Send message to all clients subscribed to the chat channel that user left
        // ws.publish("chat", JSON.stringify({ type: "USERS_REMOVE", data: "abc" }));
        console.log("Connection closed")
      },
  });

export default newMessageSocket;
