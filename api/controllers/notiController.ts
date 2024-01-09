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

  async getAllNotis() {
    return await Noti.find();
  }
}
