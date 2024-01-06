import { User } from "../models/user.ts";

export default class UserController {
  async getUserByUserId({ set, userId }) {
    try {
      const data = await User.findById(userId).select("-password");

      if (!data) {
        set.status = 400;
        return { message: "Bad request!" };
      }

      set.status = 200;
      return data;
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }
}
