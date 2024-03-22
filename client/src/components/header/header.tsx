"use client";
import "primeicons/primeicons.css";
import NotiWidget from "../notification/NotiWidget";
import UserWidget from "../UserWidget";
import { useState } from "react";
import { useUserStore } from "@/lib/zustand";
import { Button } from "../ui/button";
import Logo from "../Logo";
function Header() {
  const { current } = useUserStore();
  return (
    <>
      <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex space-x-4 text-cyan-900 mix-blend-difference">
              {current && current.role === "Guide" ? (
                <p>Guide role</p>
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

export default Header;
