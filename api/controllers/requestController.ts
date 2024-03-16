import { Types } from "mongoose";
import { Request } from "../models/request.ts";
import { Trip } from "../models/trip.ts";

export default class RequestController {
  async addRequest({ createdBy, body, set }) {
    try {
      // const existedRequest = await Request.find({
      //   createdBy,
      //   tripId: body.tripId,
      //   status: "Waiting",
      // });
      // if (existedRequest) {
      //   set.status = 400;
      //   return {
      //     message:
      //       "You has requested to this trip, please wait for the owner to respond.",
      //   };
      // }

      const newRequest = new Request({ ...body, createdBy });
      await newRequest.save();

      // const trip = await Trip.findById(body.tripId);
      // if (trip.memberCount + body.memberQuantity > trip.memberLimit) {
      //   set.status = 400;
      //   return {
      //     message:
      //       "The trip has limit participants, please edit your member quantity in Request or contact to the owner.",
      //   };
      // }

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

  async getAllRequestsByIdList({ body, set }) {
    const { idList } = body;
    try {
      const requestList = await Request.find({
        _id: { $in: idList },
      })
        .populate("createdBy", "username")
        .populate("tripId", "_id title memberLimit memberCount");

      set.status = 200;
      return { data: requestList };
    } catch (err) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async acceptRequestById({ body, createdBy, set }) {
    const { requestId } = body;
    try {
      const request = await Request.findById(requestId);
      const trip = await Trip.findById(request.tripId);

      if (trip.createdBy != createdBy) {
        set.status = 403;
        return { message: "Forbidden" };
      }

      if (request.status !== "Waiting") {
        set.status = 400;
        return { message: "Bad request" };
      }

      trip.memberCount += request.memberQuantity;
      await trip.save();
      request.status = "Accepted";
      await request.save();

      set.status = 200;
      return { message: "Accepted request successfully!" };
    } catch (err) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }
  async denyRequestById({ body, createdBy, set }) {
    const { requestId } = body;
    try {
      const request = await Request.findById(requestId);

      const trip = await Trip.findById(request.tripId);
      if (trip.createdBy != createdBy) {
        set.status = 403;
        return { message: "Forbidden" };
      }

      if (request.status !== "Waiting") {
        set.status = 400;
        return { message: "Bad request" };
      }

      request.status = "Denied";
      await request.save();

      set.status = 200;
      return { message: "Denied request successfully!" };
    } catch (err) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async getRequestToTripByUserId({userId, tripId}) {
    return await Request.findOne({createdBy: new Types.ObjectId(userId),
      tripId: new Types.ObjectId(tripId)});
  }
}
