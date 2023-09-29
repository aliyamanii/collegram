import { Outlet } from "react-router-dom";
import tree from "../assets/photos/tree.svg";
import logo from "../assets/photos/logo.svg";
import Header from "../components/AppHeader";

function Auth() {
  return (
    <div className="flex flex-col min-h-screen justify-start bg-vanilla font-primary">
      <div
        id="app__container"
        className=" w-screen min-h-[55vh]  flex  bg-bone text-center flex-col items-center justify-center"
      >
        <img
          src={logo}
          alt="Rahnema Logo"
          id="logo"
          className=" w-[60px] mt-[50px]"
        />
        <div className="w-[320px] h-full mt-[10px]">
          <Outlet />
        </div>
      </div>
      <div className="min-h-[45vh]  w-auto flex justify-center items-center">
        <img src={tree} id="tree" className="mx-auto" alt="Tree" />
      </div>
    </div>
  );
}

export default Auth;
