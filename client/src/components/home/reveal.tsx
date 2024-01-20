"use client";

import axiosClient from "@/lib/axiosClient";
import { Trip } from "@/utils/types";
import React, { useEffect, useState } from "react";
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
    <div>
      {/* <div className="filter-options">
        <h1>Our Latest Trips:</h1>
        <br></br>
        <h2>Filter options:</h2>
        <button>A</button>
        <button>B</button>
      </div> */}
      <div className="reveal-container">
        <div className="reveal">
          {trips &&
            trips.length > 0 &&
            trips.map((trip) => <TripCard trip={trip} key={trip._id} />)}
        </div>
      </div>
    </div>
  );
};

export default Reveal;
