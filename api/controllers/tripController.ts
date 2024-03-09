import { Trip } from "../models/trip.ts";

export default class TripController {
  async addTrip({ createdBy, body, set }) {
    try {
      const newTrip = new Trip({ ...body, createdBy });
      await newTrip.save();

      set.status = 200;
      return { message: "Created trip successfully!", data: "" };
    } catch (error) {
      set.status = 500;
      return { message: error };
    }
  }

  async getAllLatestTrips() {
    return await Trip.find().populate('createdBy','username')
  }
}
