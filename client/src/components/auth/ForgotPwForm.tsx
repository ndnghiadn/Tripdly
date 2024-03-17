"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/zustand";
import { User } from "@/constants/types";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";

const ForgotForm = () => {
  const router = useRouter();
  // const { setUser } = useUserStore();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response: User = await axiosClient.get("/user");
  //       setUser(response);
  //       router.push("/");
  //     } catch (err) {
  //       // console.error(err);
  //     }
  //   })();
  // }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axiosClient.post(
    //     "/sign-in",
    //     {
    //       username: e.target["username"].value, //"ndnghia0111",
    //       password: e.target["password"].value, //"1234",
    //     },
    //     { withCredentials: true }
    //   );
    //   console.log("user vua login ne bo", response);
    //   setUser(response.data);
    //   toast.success(response.message);
    //   router.push("/app");
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            width="4"
            height="4"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Tripdly
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleReset}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your mail address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send RESET mail
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't get anything in your mailbox?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Resend
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotForm;
