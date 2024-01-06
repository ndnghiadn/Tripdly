import * as mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    locationId: { type: mongoose.Types.ObjectId, ref: "Location" },
    title: { type: String, required: true },
    time: { type: Date, required: true },
    memberLimit: { type: Number, requred: true },
    memberCount: { type: Number, default: 1 },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export type Trip = mongoose.InferSchemaType<typeof tripSchema>;
export const Trip = mongoose.model("Trip", tripSchema);
