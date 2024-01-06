import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String },
    dob: { type: Date },
    address: { type: String },
    phoneNumber: { type: String },
    description: { type: String},
    role: {
      type: String,
      enum: ["MA", "Guide", "Visitor"],
      default: "Visitor",
    },
  },
  {
    timestamps: true,
  }
);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);
