import * as mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    tripId: { type: mongoose.Types.ObjectId, ref: "Trip" },
    content: { type: String, required: true },    
  },
  {
    timestamps: true,
  }
);

export type Message = mongoose.InferSchemaType<typeof messageSchema>;
export const Message = mongoose.model("Message", messageSchema);
