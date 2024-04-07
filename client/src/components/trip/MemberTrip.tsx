"use client";
import { useTripStore } from "@/lib/zustand";
import { Slider, Button } from "antd";
import { FC, useState } from "react";

type TProps = {
  handleCloseModal: () => void;
  handlePreStep: () => void;
};

const MemberTrip: FC<TProps> = (props) => {
  const [members, setMembers] = useState(0);
  const setMembersStore = useTripStore(
    (state: any) => state.setMemberLimitTrip
  );
  const tripForm = useTripStore((state: any) => state.tripCreated);
  async function handleCompleteForm() {
    if (members) {
      props.handleCloseModal();
    }
  }

  const onChange = (newValue: number) => {
    setMembers(newValue);
    setMembersStore(newValue);
  };
  return (
    <div style={{ height: "35rem" }}>
      <h1 className="text-3xl font-semibold mb-5">
        May be you wanna limit members of the trip
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        This is the option, make your trip is more management. The limit will be
        10 member
      </p>
      <div className="flex gap-6">
        <Slider
          style={{ flex: "1 0 auto" }}
          min={1}
          max={10}
          onChange={onChange}
          value={typeof members === "number" ? members : 10}
        />
        <p>{members} members</p>
      </div>
      <div className="flex gap-2 mt-6">
        <Button onClick={handleCompleteForm}>Finish</Button>
        <Button onClick={props.handlePreStep}>Prev</Button>
      </div>
    </div>
  );
};

export default MemberTrip;
