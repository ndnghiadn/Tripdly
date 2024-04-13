"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import axiosClient from "@/lib/axiosClient";
import { useUserStore } from "@/lib/zustand";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import TripCardImage from "./TripCardImage";
import { Trip } from "@/constants";
import { FC } from "react";

type Inputs = {
  message: string;
  memberQuantity: number;
};
type TTripCard = {
  key: string;
  trip: Trip;
};

const TripCard: FC<TTripCard> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const { current } = useUserStore();

  // handle event
  const formatTime = (value: Date) => {
    const date = new Date(value);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axiosClient.post("/request", {
        ...data,
        tripId: props.trip._id
      });
      await handleAddNoti({ data: response.data._id });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleAddNoti = async ({ data }) => {
    const socket = new WebSocket("ws:localhost:8888/notification");
    try {
      const response = await axiosClient.post("/noti", {
        userId: props.trip.createdBy?._id,
        type: "request-trip",
        data
      });
      socket.send(
        JSON.stringify({
          type: "NOTI_ADD",
          data: response.data
        })
      );
      toast.info("The request has been sent to the trip's owner.");
    } catch (err) {
      console.error(err);
    }
  };
  const truncate = (str: string) => {
    return str.length > 250 ? str.substring(0, 247) + "..." : str;
  };
  return (
    <Card className="w-full bg-[#DADDC5]">
      <CardContent className="py-[60px] px-[100px] flex gap-9">
        <div className="grow-0 max-w-[300px]">
          <CardTitle className="text-xl text-start mb-3 text-[#283A2C]">
            {props.trip.title}
          </CardTitle>
          <CardDescription className="text-[#283A2C]">
            {truncate(props.trip.description)}
          </CardDescription>
          <div className="flex gap-4 mt-3 mb-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https:github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Label className="text-lg">
                {props.trip.createdBy?.username}
              </Label>
              <span>{formatTime(props.trip.createdAt)}</span>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>Join us</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none"></h4>
                    <p className="text-sm text-muted-foreground">
                      Send a request to the trip's owner
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="message">Message</Label>
                      <Input
                        id="message"
                        defaultValue="Hello there,..."
                        className="col-span-2 h-8"
                        {...register("message", { required: true })}
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="memberQuantity">Member Quantity</Label>
                      <Input
                        id="memberQuantity"
                        defaultValue="5"
                        className="col-span-2 h-8"
                        {...register("memberQuantity", { required: true })}
                      />
                    </div>
                    <Button type="submit">Send</Button>
                  </div>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
        <TripCardImage dataImgs={props.trip.locations} />
      </CardContent>
    </Card>
  );
};

export default TripCard;
