"use client";
import "primeicons/primeicons.css";
import NotiWidget from "../notification/NotiWidget";
import UserWidget from "../UserWidget";
import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/zustand";
import { Button } from "../ui/button";
import Logo from "../Logo";
import Link from "next/link";
function Header() {
  const { current } = useUserStore();
  const [isScroll, setIsScroll] = useState(false);
  const cssOfNavBar =
    "px-[361px] py-[16px] flex justify-between sticky top-0 z-10 bg-white";
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        className={
          isScroll
            ? "border-solid border-b-[1px] border-red-800 " + cssOfNavBar
            : cssOfNavBar
        }
      >
        <Logo />
        <div className="navigation flex justify-between gap-4 font-bold">
          <Button
            variant={"outline"}
            className="rounded-full border-none shadow-none py-[10px] px-[16px] hover:bg-slate-200"
          >
            <Link className="text-base" href={"/app"}>
              Discover
            </Link>
          </Button>
          {current && current.role === "Guide" ? (
            <Button
              variant={"outline"}
              className="rounded-full border-none shadow-none py-[10px] px-[16px] hover:bg-slate-200"
            >
              <Link className="text-base" href={"/app/contribute-locations"}>
                Trips
              </Link>
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className="rounded-full border-none shadow-none py-[10px] px-[16px] hover:bg-slate-200"
            >
              Become a Guide
            </Button>
          )}
          <Button
            variant={"outline"}
            className="rounded-full border-none shadow-none py-[10px] px-[16px] hover:bg-slate-200"
          >
            <Link className="text-base" href={"/app"}>
              Review
            </Link>
          </Button>
        </div>
        <div className="flex gap-3">
          <UserWidget />
          <NotiWidget />
        </div>
      </nav>
    </>
  );
}

export default Header;
