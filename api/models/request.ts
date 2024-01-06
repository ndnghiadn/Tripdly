import * as mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    tripId: { type: mongoose.Types.ObjectId, ref: "Trip" },
    message: { type: String, required: true },
    memberQuantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Accepted", "Denied", "Waiting"],
      default: "Waiting",
    },
  },
  {
    timestamps: true,
  }
);

export type Request = mongoose.InferSchemaType<typeof requestSchema>;
export const Request = mongoose.model("Request", requestSchema);
