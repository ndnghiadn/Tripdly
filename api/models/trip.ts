import * as mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    locationId: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
    title: { type: String, required: true },
    time: [{ 
      date: {type: String, required: true},
      from: {type: String, required: true},
      to: {type: String, required: true},
     }],
    memberLimit: { type: Number, required: true },
    memberCount: { type: Number, default: 1 },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export type Trip = mongoose.InferSchemaType<typeof tripSchema>;
export const Trip = mongoose.model("Trip", tripSchema);
