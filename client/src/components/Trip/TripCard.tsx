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
  return (
    <Card className="w-full bg-[#f4fcf1]">
      <CardHeader className="flex justify-between">
        <div>
          <Avatar className="w-14 h-14">
            <AvatarImage src="https:github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label className="text-lg">{props.trip.createdBy?.username}</Label>
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
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">{props.trip.title}</CardTitle>
        <CardDescription>{props.trip.description}</CardDescription>
        <TripCardImage dataImgs={props.trip.locations} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-3 items-center">
          <span>Member limit : {props.trip.memberLimit}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
