"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-black-500 dark:text-white-400">
        © 2024 Tripdly Team | Created with <FaHeart className="inline p-[1px] mb-[1px] text-red-700" />
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          href="#"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
