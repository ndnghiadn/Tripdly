import React, { useEffect, useState } from "react";
import type { Noti } from "@/utils/types";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import RequestNotiItem from "./request-item";
import axiosClient from "@/lib/axiosClient";

const RequestList = ({ notiList }) => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    

    (async () => {
      try {
        const response = await axiosClient.post("/getAllRequestsByIdList", {
          idList: notiList.map((noti) => noti.data),
        });
        setRequestList(response.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [notiList]);

  return (
    <>
      {requestList.map((request) => (
        <DropdownMenuItem key={request._id}>
          <RequestNotiItem request={request} />
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default RequestList;
