"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import RightSideBar from "./RightSideBar";
import TripCard from "@/components/Trip/TripCard";
import MultiStepCreateTrip from "@/components/Trip/MultiStepForm";
import { useTripStore } from "@/lib/zustand";
import { toast } from "sonner";
import { TRequest, Trip } from "@/constants";


const MainContent = () => {
  const [trip, setTrip] = useState<Trip[]>([]);
  const tripCreated = useTripStore(state => state.tripCreated)

  // function
  const addTripToFeed = async () => {
      const res: TRequest<Trip> = await axiosClient.post(
        "/trip",
        tripCreated,
        {
            withCredentials: true,
        }
        )
        if(res.message === 'Created trip successfully!'){
            toast.success("Created trip successfully!")
        }
        else{
            toast.error("Something go wrong :(")
        }
      setTrip([res.data,...trip])
  }

  // hook
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosClient.get("/trips", {
        withCredentials: true,
      });
      setTrip(res);
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <div className="flex-1 grid md:grid-cols-[1fr,300px]">
      <div className="space-y-4 p-4 md:p-6">
        <MultiStepCreateTrip handleFinish={addTripToFeed}/>
        <div className="flex flex-col gap-4">
          {trip.map((curr) => (
            <TripCard key={curr._id} trip={curr} />
          ))}
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};

export default MainContent;

