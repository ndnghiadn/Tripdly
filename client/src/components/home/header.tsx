"use client";

import UserWidget from "../user-widget";
import NotiWidget from "../notification/noti-widget";
import { useUserStore } from "@/lib/zustand";

const Header = () => {
  const { current } = useUserStore();

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
        </li>
      </ul>
    </header>
  );
};

export default Header;
