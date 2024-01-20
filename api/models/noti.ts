import * as mongoose from "mongoose";

const notiSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["request-trip", "subcribe-user"],
      default: "request-trip",
    },
    data: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export type Noti = mongoose.InferSchemaType<typeof notiSchema>;
export const Noti = mongoose.model("Noti", notiSchema);
