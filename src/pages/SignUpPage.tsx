import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/logo.png";
import userIcon from "../photos/person.svg";
import email from "../photos/email.svg";
import key from "../photos/key.svg";

function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <img
        src={logo}
        alt="Rahnema Logo"
        id="logo"
        className=" w-[60px] mb-[20px]"
      />
      <section
        id="switch-mode"
        className="flex justify-between w-full mb-[20px]"
      >
        <Link
          to="/signup"
          id="signup__button"
          className="text-base font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#2b2b2b] "
        >
          ثبت نام در کالج گرام
        </Link>
        <div className="w-[1px] h-full bg-[black]"></div>
        <Link
          to="/login"
          id="login__button"
          className="text-4 font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#a5a5a5]"
        >
          ورود به کالج گرام
        </Link>
      </section>
      <form
        id="signup__form"
        className="flex flex-col items-start justify-start mt-[20px]"
      >
        <div id="input__container" className="relative">
          <input
            type="text"
            placeholder="نام کاربری"
            className="w-[277px] h-[36px] mb-[34px] py-[8px] px-[16px] rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] gap-[8px] placeholder:text-right placeholder:font-normal placeholder:text-[12px] placeholder:leading-[20px] placeholder:text-[#cdcdcd] placeholder:mr-[20px]"
          />
          <div
            id="icon__placeholder"
            className="absolute top-[50%] left-[10px] translate-y-[-150%] translate-x-[1500%]"
          >
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </div>
        </div>
        <div id="input__container" className="relative">
          <input
            type="text"
            placeholder="ایمیل"
            className="w-[277px] h-[36px] mb-[34px] py-[8px] px-[16px] rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] gap-[8px] placeholder:text-right placeholder:font-normal placeholder:text-[12px] placeholder:leading-[20px] placeholder:text-[#cdcdcd] placeholder:mr-[20px]"
          />
          <div
            id="icon__placeholder"
            className="absolute top-[50%] left-[10px] translate-y-[-150%] translate-x-[1500%]"
          >
            <img src={email} alt="email Icon" className="email-icon" />
          </div>
        </div>
        <div id="input__container" className="relative">
          <input
            type="text"
            placeholder="رمز عبور"
            className="w-[277px] h-[36px] mb-[34px] py-[8px] px-[16px] rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] gap-[8px] placeholder:text-right placeholder:font-normal placeholder:text-[12px] placeholder:leading-[20px] placeholder:text-[#cdcdcd] placeholder:mr-[20px]"
          />
          <div
            id="icon__placeholder"
            className="absolute top-[50%] left-[10px] translate-y-[-150%] translate-x-[1500%]"
          >
            <img src={key} alt="Key Icon" className="key-icon" />
          </div>
        </div>
        <div id="input__container" className="relative">
          <input
            type="text"
            placeholder="تکرار رمز عبور"
            className="w-[277px] h-[36px] mb-[34px] py-[8px] px-[16px] rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] gap-[8px] placeholder:text-right placeholder:font-normal placeholder:text-[12px] placeholder:leading-[20px] placeholder:text-[#cdcdcd] placeholder:mr-[20px]"
          />
          <div
            id="icon__placeholder"
            className="absolute top-[50%] left-[10px] translate-y-[-150%] translate-x-[1500%]"
          >
            <img src={key} alt="Key Icon" className="key-icon" />
          </div>
        </div>
        <button
          id="submit__button"
          className="mt-auto mb-[20px] w-[84px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[16px] hover:bg-[#9e780d]"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
}

export default SignUp;
