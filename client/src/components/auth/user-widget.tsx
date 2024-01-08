"use client";

import axiosClient from "@/lib/axiosClient";
import { useUserStore } from "@/lib/zustand";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

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
        <div>
          <p>
            Welcome back, {current.username} {current.role}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => router.push("/login")}>Login</button>
      )}
    </>
  );
};

export default UserWidget;
