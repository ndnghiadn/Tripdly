"use client";
import { useUserStore } from "@/lib/zustand";
import Link from "next/link";

const LeftSideBar = () => {
  const { current } = useUserStore();
  return (
    <div className="hidden md:flex flex-col border-r bg-gray-100 py-4 px-2 dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <Link
          className="flex items-center gap-2 p-2 rounded-md bg-gray-100/50 text-gray-900 font-medium dark:bg-gray-800/50 dark:text-gray-50"
          href="/app"
        >
          <HomeIcon className="w-4 h-4" />
          Home
        </Link>
        <Link
          className="flex items-center gap-2 p-2 rounded-md text-gray-500 font-medium dark:text-gray-400"
          href="/app/chat/123"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-black text-3xl font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          Chat
        </Link>
        {current && current.role === "Guide" && (
          <Link
            className="flex items-center gap-2 p-2 rounded-md text-gray-500 font-medium dark:text-gray-400"
            href="/app/contribute-locations"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            Contribute
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
