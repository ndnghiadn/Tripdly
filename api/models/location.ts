import * as mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String },
    coordinates: { type: String },
    imageUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export type Location = mongoose.InferSchemaType<typeof locationSchema>;
export const Location = mongoose.model("Location", locationSchema);
