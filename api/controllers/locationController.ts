import { Location } from "../models/location.ts";

export default class LocationController {
  async addLocation({ set, body, createdBy }) {
    try {
      const { name } = body;

      const location = await Location.findOne({ name });
      if (location) {
        set.status = 400;
        return { message: "Location's name is unique!" };
      }

      const newLocation = new Location({ name, createdBy });
      await newLocation.save();

      set.status = 200;
      return { message: "Created location successfully!" };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }
  async getAllLocations() {
    return await Location.find();
  }
}
