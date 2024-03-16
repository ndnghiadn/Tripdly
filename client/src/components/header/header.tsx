"use client";
import "primeicons/primeicons.css";
import NotiWidget from "../notification/NotiWidget";
import UserWidget from "../UserWidget";

import { useState } from "react";
import Link from "next/link";
import MultiStepCreateTrip from "../Trip/MultiStepForm";
import { useUserStore } from "@/lib/zustand";
import { Button } from "../ui/button";
function Header() {
  const [isCreateTrip, setIsCreateTrip] = useState(false);
  const { current } = useUserStore();
  return (
    <>
      <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              className="flex items-center justify-center transition-transform transform hover:scale-105"
              href="#"
            >
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Tripdly</span>
            </Link>
            <div className="flex space-x-4 text-cyan-900 mix-blend-difference">
              {current && current.role === "Guide" ? (
                <MultiStepCreateTrip />
              ) : (
                <Button>Become a Guide</Button>
              )}
              <NotiWidget />
              <UserWidget />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Header;
