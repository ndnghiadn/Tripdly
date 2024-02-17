"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Header = () => {
  const router = useRouter();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link
        className="flex items-center justify-center transition-transform transform hover:scale-105"
        href="#"
      >
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Tripdly</span>
      </Link>
      <Button
        onClick={() => router.push("/app")}
        className="ml-auto flex gap-4 sm:gap-6"
      >
        Go to App
      </Button>
    </header>
  );
};

export default Header;

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
