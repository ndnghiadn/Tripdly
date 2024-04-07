import { UserRating } from "../models/userRating.ts";
import { LocationRating } from "../models/locationRating.ts";

export default class RatingController {
  async addUserRating({ set, createdBy, body }) {
    try {
      const newUserRating = new UserRating({ ...body, createdBy });
      await newUserRating.save();

      set.status = 200;
      return {
        message: "Created user rating successfully!",
        data: newUserRating,
      };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async addLocationRating({ set, createdBy, body }) {
    try {
      const newLocationRating = new LocationRating({ ...body, createdBy });
      await newLocationRating.save();

      set.status = 200;
      return {
        message: "Created location rating successfully!",
        data: newLocationRating,
      };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }
}
