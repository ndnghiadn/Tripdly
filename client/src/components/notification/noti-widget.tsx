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
import axiosClient from "@/lib/axiosClient";
import { useUserStore } from "@/lib/zustand";
import { Noti } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import RequestNotiItem from "./request-item";
import RequestList from "./request-list";

const NotiWidget = () => {
  const { current } = useUserStore();
  const [notiList, setNotiList] = useState<Noti[]>([]);

  useEffect(() => {
    document.cookie = "userId=" + current._id + "; path=/";
    const socket = new WebSocket("ws://localhost:8888/notification");

    const addNoti = (noti: Noti) => {
      setNotiList((notiList) => [...notiList, noti]);
    };
    const setNoti = (notiList: Noti[]) => {
      setNotiList(notiList);
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
        // case "USERS_ADD":
        //   addUser(event.data);
        //   break;
        // case "USERS_REMOVE":
        //   removeUser(event.data);
        //   break;
        // case "USERS_SET":
        //   setUsers(event.data);
        //   break;
      }
    });

    // return () => {
    //   socket.removeEventListener("message", () => {});
    // };
  }, [current]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axiosClient.get("/noti");
  //       setNotiList(response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   })();
  // }, []);

  // const handlePushData = () => {
  //   socket.send(
  //     JSON.stringify({
  //       type: "NOTI_ADD",
  //       data: '333',
  //     })
  //   );
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <AiOutlineNotification /> ({notiList.length})
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
