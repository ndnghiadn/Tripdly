"use client";

import React, { useEffect } from "react";
import TripCard from "./trip-card";

const Reveal = () => {
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

  return (
    <>
      <div className="filter-options">
        <h1>Our Latest Trips:</h1><br></br>
        <h2>Filter options:</h2>
        <button>A</button>
        <button>B</button>
      </div>
      <div className="container">
        <div className="reveal">
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
        </div>
      </div>
    </>
  );
};

export default Reveal;
