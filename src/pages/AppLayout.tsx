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
    <div className="w-screen h-[calc(55%-55px)] py-[52px] px-[204px] flex justify-center bg-bone">
      <div id="page" className="w-full h-full">
        <AppHeader />
        <div className="mt-[10%] max-h-[300px]">
          <Outlet />
        </div>
      </div>
      <div
        id="navbar"
        className="w-[256px] h-full flex flex-col justify-start gap-[30px]"
      >
        <MiniProfile />
        <SideBarNavLinks list={navLinks} />
        <img
          src={tree}
          id="tree"
          className="w-[189.33] h-[213px] mx-auto"
          alt="Tree"
        />
      </div>
    </div>
  );
}

export default AppLayout;
