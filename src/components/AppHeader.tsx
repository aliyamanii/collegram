import React from "react";
import logo from "../assets/photos/logo.svg";
import search from "../assets/photos/search.svg";
import InputContainer from "./InputContainer";

interface HeaderProps {
  logoUrl: string;
  onButtonClick: () => void;
}

const AppHeader: React.FC = ({}) => {
  return (
    <div
      id="header"
      className="w-[1000px] flex justify-between items-center font-primary"
    >
      <div id="left" className="w-[225px] flex justify-between">
        <div id="logo">
          <img
            src={logo}
            alt="Logo"
            className="w-[68px] h-[40px] cursor-pointer"
          />
        </div>
        <div className="button">
          <button
            id="submit__button"
            className="w-[110px] h-[40px] mt-auto mb-[20px] py-[8px] px-[16px] border-none bg-[#c19008] text-[14px] text-[#ffffff] rounded-[100px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
          >
            افزودن پست
          </button>
        </div>
      </div>
      <div id="right" className="w-[360px]">
        <InputContainer
          placeholder="جستجو"
          icon={search}
          type="text"
          width="360px"
        />
      </div>
    </div>
  );
};

export default AppHeader;
