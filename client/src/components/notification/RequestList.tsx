"use client";
import React, { useEffect, useState } from "react";
import type { Noti } from "@/types";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import RequestNotiItem from "./RequestItem";
import axiosClient from "@/api/axiosClient";

const RequestList = ({ notiList }) => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosClient.post("/getAllRequestsByIdList", {
          idList: notiList.map((noti) => noti.data),
        });
        setRequestList(response.data);
        // setRequestList(
        //   response.data.filter((request) => request.status === "Waiting")
        // );
      } catch (err) {
        console.error(err);
      }
    })();
  }, [notiList]);

  const removeItemById = (id) => {
    setRequestList(requestList.filter((item) => item._id !== id));
  };

  return (
    <>
      {requestList.map((request) => (
        <RequestNotiItem request={request} removeItemById={removeItemById} />
      ))}
    </>
  );
};

export default RequestList;
