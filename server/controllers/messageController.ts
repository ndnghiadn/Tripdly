import { Message } from "../models/message";
import { Types } from "mongoose";

export default class MessageController {
  async addMessage({ userId, tripId, content }) {
    try {
      const message = new Message({
        userId: new Types.ObjectId(userId),
        tripId: new Types.ObjectId(tripId),
        content,
      });

      await message.save();
      console.log("Message saved successfully");
      return message;
    } catch (error) {
      console.error("Error saving message data:", error);
    }
  }

  async getAllMessagesFromTrip({ tripId }) {
    return Message.find({ tripId: new Types.ObjectId(tripId) });
  }

  async getLatestMessagesFromTrip({ tripId }) {
    return Message.findOne({ tripId: new Types.ObjectId(tripId) }).sort({
      createdAt: -1,
    });
  }
}
