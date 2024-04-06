"use client";
import ItemMenu from "@/components/sidebar/ItemMenu";
import Menu from "@/components/sidebar/menu";
import { useUserStore } from "@/lib/zustand";
import { NavigationSideBar, AccountSideBar } from "@/constants";
const LeftSideBar = () => {
  const { current } = useUserStore();
  return (
    <div className="bg-[#FBFFF4] flex flex-col justify-between border-solid border-[1px] border-slate-200 ml-[1px] rounded-md pt-4 pb-7 pl-3 h-[92vh]">
      <Menu header="Navigation">
        {NavigationSideBar.map((curr) => (
          <ItemMenu
            key={curr.path}
            namePath={curr.namePath}
            path={curr.path}
            icon={curr.icon}
          />
        ))}
      </Menu>
      <Menu header="Account">
        {AccountSideBar.map((curr) => (
          <ItemMenu
            key={curr.path}
            namePath={curr.namePath}
            path={curr.path}
            icon={curr.icon}
          />
        ))}
      </Menu>
    </div>
  );
};

export default LeftSideBar;
