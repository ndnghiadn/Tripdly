import * as mongoose from "mongoose";

const locationRatingSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    locationId: { type: mongoose.Types.ObjectId, ref: "Location" },
    imageUrl: [{ type: String, required: true }],
    comment: { type: String },
    point: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export type LocationRating = mongoose.InferSchemaType<
  typeof locationRatingSchema
>;
export const LocationRating = mongoose.model(
  "LocationRating",
  locationRatingSchema
);
