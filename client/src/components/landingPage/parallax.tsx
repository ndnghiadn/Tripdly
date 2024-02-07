"use client";

import { useUserStore } from "@/lib/zustand";
import React, { useEffect } from "react";
import UserWidget from "../user-widget";

const Parallax = () => {
  useEffect(() => {
    let text = document.getElementById("text");
    let bird1 = document.getElementById("bird1");
    let bird2 = document.getElementById("bird2");
    let btn = document.getElementById("btn");
    let rocks = document.getElementById("rocks");
    let forest = document.getElementById("forest");
    let water = document.getElementById("water");
    let header = document.getElementById("header");

    window.addEventListener("scroll", () => {
      let value = window.scrollY;

      text.style.top = value * -0.5 + "%";
      bird1.style.top = value * -1.5 + "%";
      bird1.style.left = value * 2 + "%";
      bird2.style.top = value * -1.5 + "%";
      bird2.style.left = value * -5 + "%";
      btn.style.marginTop = value * 1.5 + "px";
      rocks.style.top = value * -0.1 + "px";
      forest.style.top = value * 0.25 + "px";
      header.style.top = value * 0.5 + "px";
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div>
      <section>
        <h2 id="text">
          <span>It's time for a new</span>
          <br />
          Adventure
        </h2>
        <img id="bird1" src="/images/bird1.png" alt="Bird1" />
        <img id="bird2" src="/images/bird2.png" alt="Bird2" />
        <img id="forest" src="/images/forest.png" alt="Forest" />
        <a href="#" id="btn">
          Explore
        </a>
        <img id="rocks" src="/images/rocks.png" alt="Rock" />
        <img id="water" src="/images/water.png" alt="Water" />
      </section>
    </div>
  );
};

export default Parallax;
