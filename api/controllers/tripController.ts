import { Types } from "mongoose";
import { Trip } from "../models/trip.ts";
import { Request } from "../models/request.ts";
export default class TripController {
  async addTrip({ createdBy, body, set }) {
    try {
      const newTrip = new Trip({ ...body, createdBy });
      await newTrip.save();

      set.status = 200;
      return { message: "Created trip successfully!", data: newTrip };
    } catch (error) {
      set.status = 500;
      return { message: error };
    }
  }

  async getAllLatestTrips() {
    return await Trip.find().populate("createdBy", "username");
  }

  async getTripByTripId({ tripId }) {
    return await Trip.findById(tripId);
  }

  async checkIfUserOwnTrip({ tripId, userId }) {
    return (await Trip.findOne({
      _id: new Types.ObjectId(tripId),
      createdBy: new Types.ObjectId(userId),
    }))
      ? true
      : false;
  }

  async getTripMembers({ tripId }) {
    return Request.find({
      tripId: new Types.ObjectId(tripId),
      status: "Accepted",
    })
      .select("createdBy -_id")
      .populate("createdBy");
  }

  async getTripOwner({ tripId }) {
    return await Trip.findById(tripId)
      .select("createdBy -_id")
      .populate("createdBy");
  }
}
