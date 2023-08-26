import React from "react";
import { Link, Outlet } from "react-router-dom";
import tree from "../photos/tree.png";

function AUTH() {
  return (
    <div className="flex flex-col h-screen bg-[#f1ebe3]">
      <div
        id="app__container"
        className=" w-screen h-[55vh] mt-0 flex bg-[#f3f0ee] text-center flex-col items-center justify-center"
      >
        <div className="w-[320px] h-[55vh] bg-[red]">
          <Outlet />
        </div>
      </div>
      <div className="h-[45vh] w-auto flex justify-center items-center">
        <img src={tree} id="tree" className="mx-auto " alt="Tree" />
      </div>
    </div>
  );
}

export default AUTH;
