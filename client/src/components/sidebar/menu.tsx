"use client";

import { Component, FC, ReactNode } from "react";

type MenuProps = {
  children: ReactNode[];
  header: string;
};
const Menu: FC<MenuProps> = (props) => {
  return (
    <div>
      <h1 className="text-xl mb-5">{props.header}</h1>
      <div className="menu-content flex flex-col gap-3">
        {props.children.map((curr) => curr)}
      </div>
    </div>
  );
};

export default Menu;
