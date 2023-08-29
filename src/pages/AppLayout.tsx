import React from "react";
import { Outlet } from "react-router-dom";
import tree from "../assets/photos/tree.svg";
import logo from "../assets/photos/logo.svg";
import profilePicture from "../assets/photos/pfp.svg";
import AppHeader from "../components/AppHeader";
import MiniProfile from "../components/MiniProfile";
import Home from "./HomePage";
import SideBarNavLinks, {
  items as navLinks,
} from "../components/SideBarNavLinks";
import { User } from "../types/types.ts";

function AppLayout() {
  const fakeUser: User = {
    id: "sadfsd",
    userName: "mahmz",
    firstName: "مهشید",
    lastName: "منزه",
    email: "mahmz@rahnema.com",
    bio: "Lover, not a fighter, spreading ✌️all over the 🌎",
    profileUrl: profilePicture,
    isPrivate: false,
    followers: 10,
    following: 20,
  };
  return (
    <div className="w-screen h-screen py-[52px] px-[204px] flex justify-center bg-[#F3F0EE]">
      <div id="page" className="w-[1000px] h-full mr-[50px]">
        <AppHeader />
        <Outlet />
      </div>
      <div
        id="navbar"
        className="w-[256px] h-full flex flex-col justify-start gap-[30px]"
      >
        <MiniProfile user={fakeUser} />
        <SideBarNavLinks list={navLinks} />
        <img
          src={tree}
          id="tree"
          className="w-[189.33] h-[213px] mx-auto hover:animate-spin"
          alt="Tree"
        />
      </div>
    </div>
  );
}

export default AppLayout;
