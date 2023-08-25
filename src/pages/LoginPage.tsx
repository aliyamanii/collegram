import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../photos/person.svg";
import key from "../photos/key.svg";
import logo from "../photos/logo.png";

function Login() {
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
        id="login-form"
        className="flex flex-col items-start justify-start mt-[20px]"
      >
        <div id="input__container" className="relative">
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل"
            className="w-[277px] h-[36px] mb-[34px] py-[8px] px-[16px] rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] gap-[8px] placeholder:text-right placeholder:font-normal placeholder:text-[12px] placeholder:leading-[20px] placeholder:text-[#cdcdcd] placeholder:mr-[20px]"
          />
          <div
            id="icon__placeholder"
            className="absolute top-[50%] left-[10px] translate-y-[-150%] translate-x-[1500%]"
          >
            <img src={userIcon} alt="email Icon" className="email-icon" />
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
        <section
          id="remember__section"
          className="flex items-center justify-end w-full"
        >
          <text
            id="remember__text"
            className="text-[12px] leading-[20px] text-[#2b2b2b]"
          >
            من را به خاطر بسپار
          </text>
          <input
            type="checkbox"
            id="remember__checkbox"
            className="w-[12px] h-[12px] rounded-[4px] ml-[8px] border-none bg-[#cdcdcd]"
          ></input>
        </section>
        <button
          id="submit__button"
          className="mt-auto mb-[20px] w-[84px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[16px] hover:bg-[#9e780d]"
        >
          ورود
        </button>
        <section
          id="other-options"
          className="w-full h-[56px] gap-[16px] flex items-end justify-end flex-col font-medium text-[12px] leading-[20px] tracking-[-2%]"
        >
          <Link
            to="/recoverpassword"
            id="recoverpassword__link"
            className="text-[#c19008] no-underline"
          >
            رمز عبورم رو فراموش کردم
          </Link>
          <Link
            to="/signup"
            id="signup__link"
            className="text-[#c19008] no-underline"
          >
            ثبت نام در کالج گرام
          </Link>
        </section>
      </form>
    </div>
  );
}

export default Login;
