import { Noti } from "../models/noti.ts";

export default class NotiController {
  async addNoti({ createdBy, body, set }) {
    try {
      const newNoti = new Noti({ ...body });
      await newNoti.save();

      set.status = 200;
      return { message: "Created noti successfully!", data: newNoti };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async getAllNotificationsByUserId({ userId }) {
    return await Noti.find({ userId });
  }

  async removeNotificationById({ body, set }) {
    try {
      const removedNoti = await Noti.findOneAndDelete({ _id: body.notiId });

      set.status = 200;
      return { message: "Removed noti successfully!", data: removedNoti };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }
}
