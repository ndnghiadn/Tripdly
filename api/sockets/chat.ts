import { Message } from './../models/message';
import { Trip } from '../models/trip';
import { Request } from '../models/request';
import Elysia from "elysia";
import { Types } from 'mongoose';

const saveMessageData = async (userId, tripId, content) => {
  try {
    const message = new Message({ 
      userId: new Types.ObjectId(userId),
      tripId: new Types.ObjectId(tripId), content 
    });

    await message.save();
    console.log("Message saved successfully");    
  } catch (error) {
    console.error('Error saving message data:', error);
  } 
};

const chatSocket = new Elysia().ws("/chat",  {
    async open(ws: any) {
      console.log(
        "ne nen e",
        ws.data.cookie
      );
      const { userId } = await ws.data.jwt.verify(ws.data.cookie.auth)

      //Find request by user
      const request = await Request.findOne({createdBy: new Types.ObjectId(userId),
          tripId: new Types.ObjectId(ws.data.cookie.tripId)});
      
      //Find if the trip is created by user 
      const trip = await Trip.findOne({_id: new Types.ObjectId(ws.data.cookie.tripId), 
        createdBy: new Types.ObjectId(userId)})

      //If the trip is created by user or is user accepted
      if(request?.status === "Accepted" || trip){
        
        const users = await Request.find({tripId: new Types.ObjectId(ws.data.cookie.tripId), status: "Accepted"});
        const messages = await Message.find({tripId: new Types.ObjectId(ws.data.cookie.tripId)});

        // // Subscribe to pubsub channel to send/receive broadcasted messages,
        // // without this the socket could not send events to other clients
        ws.subscribe(ws.data.cookie.tripId);
        console.log("connected to chat server");
  
        // // Broadcast that a user joined
        ws.publish(ws.data.cookie.tripId, JSON.stringify({ type: "USERS_ADD", data: userId }));
  
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
        await saveMessageData(userId, ws.data.cookie.tripId, data.text)
 
        Message.findOne({ tripId: new Types.ObjectId(ws.data.cookie.tripId) })
        .sort({ createdAt: -1 })
        .exec()
        .then((latestMessage) => {
          ws.send(JSON.stringify({ type: "MESSAGES_ADD", data: latestMessage }));
          ws.publish(
            ws.data.cookie.tripId,
            JSON.stringify({
              type: "MESSAGES_ADD",
              data: latestMessage,
            })
          );
        })
        .catch((err) => {
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
