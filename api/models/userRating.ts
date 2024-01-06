import * as mongoose from "mongoose";

const userRatingSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    imageUrl: [{ type: String, required: true }],
    comment: { type: String },
    point: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export type UserRating = mongoose.InferSchemaType<typeof userRatingSchema>;
export const UserRating = mongoose.model("UserRating", userRatingSchema);
