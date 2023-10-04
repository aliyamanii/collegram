import React from "react";
import { Outlet } from "react-router-dom";
import tree from "../assets/photos/tree.svg";
import AppHeader from "../components/AppHeader";
import MiniProfile from "../components/MiniProfile";
import SideBarNavLinks, {
  items as navLinks,
} from "../components/SideBarNavLinks";

function AppLayout() {
  return (
    <div
      className="w-screen min-h-fit h-screen  flex justify-center gap-14 bg-bone  px-32 py-12 overflow-x-hidden"
      dir="rtl"
    >
      <div
        id="navbar"
        className="w-[256px] h-full flex flex-col justify-between gap-7"
      >
        <div className="flex flex-col gap-7">
          <MiniProfile />
          <SideBarNavLinks list={navLinks} />
        </div>

        <img src={tree} id="tree" className="h-36 mx-auto" alt="Tree" />
      </div>
      <div
        id="page"
        className="w-full h-[calc(100%+48px)] mb-[-48px]  flex flex-col "
        dir="rtl"
      >
        <AppHeader />
        <div className="h-full overflow-y-hidden" dir="ltr">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
