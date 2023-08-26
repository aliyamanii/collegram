import React from "react";
import { Link, Outlet } from "react-router-dom";
import tree from "../assets/photos/tree.svg";
import logo from "../assets/photos/logo.svg";
import pfp from "../assets/photos/pfp.svg";
import MiniProfile from "../components/MiniProfile";

function AUTH() {
  return (
    <div className="flex flex-col h-screen justify-center bg-[#f1ebe3] font-primary">
      <div
        id="app__container"
        className=" w-screen h-[55vh] mt-0 flex bg-[#f3f0ee] text-center flex-col items-center justify-center"
      >
        <img
          src={logo}
          alt="Rahnema Logo"
          id="logo"
          className=" w-[60px] mt-[50px]"
        />
        <div className="w-[320px] h-[45vh] bg-[red] mt-[10px]">
          <Outlet />
        </div>
      </div>
      <div className="h-[45vh] w-auto flex justify-center items-center">
        <img
          src={tree}
          id="tree"
          className="mx-auto hover:animate-bounce"
          alt="Tree"
        />
      </div>
    </div>
  );
}

export default AUTH;
