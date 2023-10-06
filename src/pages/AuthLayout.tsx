import { Outlet } from "react-router-dom";
import tree from "../assets/photos/tree.svg";
import logo from "../assets/photos/logo.svg";
import Header from "../components/AppHeader";

function Auth() {
  return (
    <div className="flex flex-col w-full min-h-screen  bg-vanilla font-secondary">
      <div
        id="app__container"
        className="min-h-fit h-[55%] grow  flex  bg-bone  text-center flex-col items-center justify-center pt-7 pb-1 gap-2"
      >
        <img src={logo} alt="Rahnema Logo" id="logo" className=" w-[60px] " />
        <div className="w-[320px] h-full">
          <Outlet />
        </div>
      </div>
      <div className="min-h-fit h-[45%]  shrink  flex justify-center items-center py-5">
        <img src={tree} id="tree" alt="Tree" />
      </div>
    </div>
  );
}

export default Auth;
