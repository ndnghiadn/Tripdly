"use client";
import { useUserStore } from "@/lib/zustand";
import { Noti, Request } from "@/utils/types";
import { useEffect, useState } from "react";
import RequestList from "./RequestList";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

const NotiWidget = () => {
  const { current } = useUserStore();
  const [notiList, setNotiList] = useState<Noti[]>([]);

  useEffect(() => {
    document.cookie = "userId=" + current._id + "; path=/";
    const socket = new WebSocket("ws://localhost:8888/notification");

    const addNoti = (noti: Noti) => {
      setNotiList((notiList) => [...notiList, noti]);
      toast.info("A New Notification!");
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
    <>
      {current && current.username && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="rounded-full relative"
              size="icon"
              variant="outline"
            >
              <BellIcon className="w-4 h-4" />
              <span className="absolute top-0 right-0 flex h-4 w-4 rounded-full bg-red-500 text-white text-xs justify-center items-center">
                {notiList.length}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-80">
            <Card className="max-h-80 overflow-y-auto shadow-none border-0">
              <CardHeader className="border-b">
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  You have {notiList.length} unread messages.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <RequestList
                  notiList={notiList.map(
                    (noti) => noti.type == "request-trip" && noti
                  )}
                />
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      )}
    </>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline">
    //       <AiOutlineNotification />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-56">
    //     <DropdownMenuLabel>Requests: </DropdownMenuLabel>
    //     <DropdownMenuSeparator />

    //     <DropdownMenuSeparator />
    //     {/* <DropdownMenuGroup>
    //   <DropdownMenuSub> */}
    //     {/* <DropdownMenuSubTrigger>
    //     Notifications:
    //   </DropdownMenuSubTrigger>
    //   <DropdownMenuPortal>
    //     <DropdownMenuSubContent>
    //       <DropdownMenuItem>Email</DropdownMenuItem>
    //       <DropdownMenuItem>Message</DropdownMenuItem>
    //       <DropdownMenuSeparator />
    //       <DropdownMenuItem>More...</DropdownMenuItem>
    //     </DropdownMenuSubContent>
    //   </DropdownMenuPortal> */}
    //     {/* </DropdownMenuSub>
    // </DropdownMenuGroup> */}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export default NotiWidget;
