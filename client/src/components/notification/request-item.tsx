import axiosClient from "@/lib/axiosClient";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const RequestNotiItem = ({ request }) => {

  const handleAcceptRequest = async () => {
    try {
      const response = await axiosClient.post("/acceptRequestById", {
        requestId: noti.data,
      });
      const res = await axiosClient.post("/removeNotificationById", {
        notiId: noti._id,
      });
      console.log("response noti", res);
      toast.success(response.message);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDenyRequest = async () => {
    try {
      const response = await axiosClient.post("/denyRequestById", {
        requestId: noti.data,
      });
      const res = await axiosClient.post("/removeNotificationById", {
        notiId: noti._id,
      });
      toast.success(response.message);
      console.log("response noti", res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <div className="flex">
    //   <h2>{noti.type}</h2>
    //   <div>
    //     <Button onClick={handleAcceptRequest}>Accept</Button>
    //     <Button onClick={handleDenyRequest}>Deny</Button>
    //   </div>
    // </div>

    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full">
        {/* Info Section on the Left */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{request.createdBy.username}</h2>
          <p>requested to <b>{request.tripId.title}</b></p>
          <p className="text-gray-600">Message: {request.message}</p>
        </div>

        {/* Buttons on the Right */}
        <div className="flex justify-end">
          <Button className="mr-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Accept
          </Button>
          <Button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Deny
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestNotiItem;
