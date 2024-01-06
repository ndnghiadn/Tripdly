import { Request } from "../models/request.ts";

export default class RequestController {
  async addRequest({ createdBy, body, set }) {
    try {
      const newRequest = new Request({ ...body, createdBy });
      await newRequest.save();

      set.status = 200;
      return { message: "Created request successfully!", data: newRequest };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async getAllRequests() {
    return await Request.find();
  }
}
