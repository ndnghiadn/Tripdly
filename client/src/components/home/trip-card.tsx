import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosClient from "@/lib/axiosClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  message: string;
  memberQuantity: number;
};

const TripCard = ({ key, trip }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axiosClient.post("/request", {
        ...data,
        tripId: trip._id,
      });
      await handleAddNoti({ data: response.data._id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNoti = async ({ data }) => {
    try {
      const response = await axiosClient.post("/noti", {
        userId: trip.createdBy,
        type: "request-trip",
        data,
      });
      toast("The request's been sent to the trip's owner");
    } catch (err) {
      console.error(err);
    }
  };

  //console.log(watch("message")); // watch input value by passing the name of it

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div id={key} className="box">
          <p>Created at: {trip.createdAt}</p>
          <p>Created by: {trip.createdBy}</p>
          <p>Location: </p>
          <p>Member count/ Limit: </p>
          <p>Time: </p>
          <p>Title: {trip.title}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{trip.title}</h4>
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
  );
};

export default TripCard;
