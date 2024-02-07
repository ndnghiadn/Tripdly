"use client";

import UserWidget from "../user-widget";
import NotiWidget from "../notification/noti-widget";
import { useUserStore } from "@/lib/zustand";
import MultiStepCreateTrip from "../TripForm/MultiStepForm";
import { useState } from "react";

const Header = () => {
  const { current } = useUserStore();
  const [isOpen,setOpen] = useState(false)
  return (
    <header id="header">
      <a href="#" className="logo">
        Tripdly
      </a>
      <ul>
        {current && current.username && (
          <li>
            <NotiWidget />
          </li>
        )}
        <li>
          <UserWidget />
          <MultiStepCreateTrip action={setOpen} isOpen={isOpen} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
