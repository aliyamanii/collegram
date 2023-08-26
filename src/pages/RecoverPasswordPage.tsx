import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/logo.png";
import userIcon from "../photos/person.svg";

function RecoverPassword() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <img
        src={logo}
        alt="Rahnema Logo"
        id="logo"
        className=" w-[60px] mb-[20px]"
      />
      <text
        id="title"
        className="text-[16px] leading-[20px] text-center font-normal mb-[15px]"
      >
        بازیابی رمز عبور
      </text>
      <form
        id="recover-form"
        className="flex flex-col items-start justify-start mt-[20px]"
      >
        <div id="input__container" className="relative">
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل"
            className="w-[277px] h-[36px] mb-[34px] py-[8px] px-[16px] rounded-[16px] border-solid border-[1px] gap-[8px] placeholder:text-right placeholder:font-normal placeholder:text-[12px] placeholder:leading-[20px] placeholder:text-[#cdcdcd] placeholder:mr-[20px]"
          />
          <div
            id="icon__placeholder"
            className="absolute top-[50%] left-[10px] translate-y-[-150%] translate-x-[1500%]"
          >
            <img src={userIcon} alt="email Icon" className="email-icon" />
          </div>
        </div>
        <section id="buttons">
          <button
            id="submit__button"
            className="mt-auto mb-[20px] w-[184px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[14px] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all"
          >
            ارسال لینک بازیابی رمز عبور
          </button>
          <Link
            to="/auth/login"
            id="cancel__link"
            className="text-[#2B2B2B] no-underline w-[104px] h-[36px] ml-[10px]"
          >
            انصراف
          </Link>
        </section>
      </form>
    </div>
  );
}

export default RecoverPassword;
