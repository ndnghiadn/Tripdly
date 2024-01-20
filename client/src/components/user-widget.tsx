"use client";

import axiosClient from "@/lib/axiosClient";
import { useUserStore } from "@/lib/zustand";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserWidget = () => {
  const { current, setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosClient.get("/user");
        setUser(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosClient.get("/sign-out");
      setUser({});
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {current && current.username ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Welcome back, {current?.username}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                {/* <DropdownMenuSubTrigger>
                  Notifications:
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal> */}
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // <div>
        //   <p>
        //     Welcome back, {current.username} {current.role}
        //   </p>
        //   <button onClick={handleLogout}>Logout</button>
        // </div>
        <button onClick={() => router.push("/login")}>Login</button>
      )}
    </>
  );
};

export default UserWidget;
