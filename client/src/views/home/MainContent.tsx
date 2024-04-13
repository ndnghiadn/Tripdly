"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import TripCard from "@/components/Trip/TripCard";
import MultiStepCreateTrip from "@/components/Trip/MultiStepForm";
import { Input } from "@/components/ui/input";
import { useTripStore } from "@/lib/zustand";
import { toast } from "sonner";
import { TRequest, Trip } from "@/constants";
import { Button } from "@/components/ui/button";
import { GoSearch } from "react-icons/go";

const MainContent = () => {
  const [trip, setTrip] = useState<Trip[]>([]);
  const tripCreated = useTripStore((state) => state.tripCreated);

  // function
  const addTripToFeed = async () => {
    const res: TRequest<Trip> = await axiosClient.post("/trip", tripCreated, {
      withCredentials: true
    });
    if (res.message === "Created trip successfully!") {
      toast.success("Created trip successfully!");
    } else {
      toast.error("Something go wrong :(");
    }
    setTrip([res.data, ...trip]);
  };

  // hook
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosClient.get("/trips", {
        withCredentials: true
      });
      setTrip(res);
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <div className="mt-[48px]">
      {/* <MultiStepCreateTrip handleFinish={addTripToFeed} /> */}
      <h1 className="text-5xl font-bold text-center mb-[80px]">
        Come on, new experience is there
      </h1>
      <form className="border-solid border-[1px] border-slate-300 rounded-full drop-shadow-xl flex p-1 relative mb-[40px]">
        <GoSearch className="absolute translate-x-1/2 translate-y-[50%] w-6 h-6 opacity-35" />
        <Input
          className="px-12 border-none py-6 focus:outline-none text-lg placeholder-gray-200 placeholder-opacity-15"
          type="search"
          placeholder="Place to go, time to go..."
        />
        <Button
          variant={"destructive"}
          className="bg-green-500 rounded-full text-lg py-6 px-5 hover:opacity-75 hover:bg-green-500"
        >
          Search
        </Button>
      </form>
      <div className="flex flex-col gap-4">
        {trip.map((curr) => (
          <TripCard key={curr._id} trip={curr} />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
