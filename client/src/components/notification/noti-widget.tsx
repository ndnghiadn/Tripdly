"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/lib/zustand";
import { Noti, Request } from "@/utils/types";
import { useEffect, useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import RequestList from "./request-list";
import { toast } from "sonner";

const NotiWidget = () => {
  const { current } = useUserStore();
  const [notiList, setNotiList] = useState<Noti[]>([]);

  useEffect(() => {
    document.cookie = "userId=" + current._id + "; path=/";
    const socket = new WebSocket("ws://localhost:8888/notification");

    const addNoti = (noti: Noti) => {
      setNotiList((notiList) => [...notiList, noti]);
      toast.info("A New Notification!")
    };
    const setNoti = (notiList: Noti[]) => {
      setNotiList(notiList);
    };
    const requestAccepted = (request: Request) => {
      toast.info(
        `Your request to trip ${request.tripId.title} has been accepted.`
      );
    };
    const requestDenied = (request: Request) => {
      toast.info(
        `Your request to trip ${request.tripId.title} has been denied.`
      );
    };
    // Listen for messages
    socket.addEventListener("open", (e) => {
      console.log("im online now", e);
    });
    socket.addEventListener("message", (e) => {
      // Data sent will be a string so parse into an object
      const event = JSON.parse(e.data);
      console.log("event message", event);

      // Server sets a type for each message
      switch (event.type) {
        case "NOTI_ADD":
          addNoti(event.data);
          break;
        case "NOTI_SET":
          setNoti(event.data);
          break;
        case "ACCEPT_REQUEST":
          requestAccepted(event.data);
          break;
        case "DENY_REQUEST":
          requestDenied(event.data);
          break;
      }
    });
  }, [current]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <AiOutlineNotification />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Requests: </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <RequestList
          notiList={notiList.map((noti) => noti.type == "request-trip" && noti)}
        />
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
      <DropdownMenuSub> */}
        {/* <DropdownMenuSubTrigger>
        Notifications:
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
          <DropdownMenuItem>Message</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>More...</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal> */}
        {/* </DropdownMenuSub>
    </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotiWidget;
