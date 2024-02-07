"use client";

import axiosClient from "@/lib/axiosClient";
import { Trip } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";
import TripCard from "./trip-card";

const Reveal = () => {
  const [trips, setTrips] = useState<Trip[]>();

  useEffect(() => {
    let boxes = document.querySelectorAll(".box");
    window.addEventListener("scroll", () => {
      boxes.forEach((box) => {
        if (box.offsetTop < window.scrollY) {
          box.classList.add("active");
        } else {
          box.classList.remove("active");
        }
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response: Trip[] = await axiosClient.get("/getAllLatestTrips");
        setTrips(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    // <div>
    //   {/* <div className="filter-options">
    //     <h1>Our Latest Trips:</h1>
    //     <br></br>
    //     <h2>Filter options:</h2>
    //     <button>A</button>
    //     <button>B</button>
    //   </div> */}
    //   <div className="reveal-container">
    //     <div className="reveal">
    //       {trips &&
    //         trips.length > 0 &&
    //         trips.map((trip) => <TripCard trip={trip} key={trip._id} />)}
    //     </div>
    //   </div>
    // </div>

    <section className="w-full-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 md:p-6">
      <div className="relative group overflow-hidden rounded-lg">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <Image
          alt="Product 1"
          className="object-cover w-full h-60"
          height="200"
          src="/placeholder.svg"
          style={{
            aspectRatio: "300/200",
            objectFit: "cover",
          }}
          width="300"
        />
        <div className="bg-white p-4 dark:bg-gray-950">
          <h3 className="font-semibold text-lg md:text-xl">Product 1</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Product description
          </p>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-lg">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <Image
          alt="Product 2"
          className="object-cover w-full h-60"
          height="300"
          src="/placeholder.svg"
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width="400"
        />
        <div className="bg-white p-4 dark:bg-gray-950">
          <h3 className="font-semibold text-lg md:text-xl">Product 2</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Product description
          </p>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-lg">
        <Link className="absolute inset-0 z-10" href="#">
          <span className="sr-only">View</span>
        </Link>
        <Image
          alt="Product 3"
          className="object-cover w-full h-60"
          height="250"
          src="/placeholder.svg"
          style={{
            aspectRatio: "350/250",
            objectFit: "cover",
          }}
          width="350"
        />
        <div className="bg-white p-4 dark:bg-gray-950">
          <h3 className="font-semibold text-lg md:text-xl">Product 3</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Product description
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reveal;
