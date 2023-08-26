import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import userIcon from "../assets/photos/person.svg";
import key from "../assets/photos/key.svg";
import arrowback from "../assets/photos/arrow-back.svg";

function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="flex flex-col  items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <section
        id="switch-mode"
        className="flex justify-between w-full mb-[20px]"
      >
        <Link
          to="/auth/signup"
          id="signup__button"
          className="text-base font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#a5a5a5] hover:font-semibold "
        >
          ثبت نام در کالج گرام
        </Link>
        <div className="w-[1px] h-full bg-[black]"></div>
        <Link
          to="/auth/login"
          id="login__button"
          className="text-4 font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#2b2b2b] hover:font-semibold "
        >
          ورود به کالج گرام
        </Link>
      </section>
      <form
        id="login-form"
        className="flex flex-col items-start justify-start mt-[20px] "
      >
        <InputContainer
          placeholder="نام کاربری یا ایمیل"
          icon={userIcon}
          type="text"
        />
        <InputContainer placeholder="رمز عبور" icon={key} type="password" />
        <section
          id="remember__section"
          className="flex items-center justify-end w-full"
        >
          <input
            type="checkbox"
            id="remember__checkbox"
            className="hidden"
            checked={rememberMe}
            onChange={handleRememberChange}
          />
          <label
            htmlFor="remember__checkbox"
            className="inline-flex items-center ml-[8px] cursor-pointer"
          >
            <span className="text-[12px] leading-[20px] text-[#2b2b2b] ml-[6px]">
              من را به خاطر بسپار
            </span>
            <div
              className={`w-[12px] h-[12px] rounded-[4px] ${
                rememberMe ? "bg-[#ffffff] shadow-checkbox" : "bg-[#c19008]"
              } flex-shrink-0 ml-2 transition-all duration-300 hover:border`}
            />
          </label>
        </section>
        <button
          id="submit__button"
          className="mt-auto mb-[20px] w-[84px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300 "
        >
          ورود
        </button>
        <section
          id="other-options"
          className="w-full h-[56px] gap-[16px] flex items-end justify-end flex-col font-medium text-[12px] leading-[20px] tracking-[-2%]"
        >
          <Link
            to="/auth/recover-password"
            id="recoverpassword__link"
            className="text-[#c19008] no-underline flex items-center hover:font-semibold"
          >
            رمز عبورم رو فراموش کردم
            <img src={arrowback} alt="Back Icon" className="h-[8px] ml-2" />
          </Link>
          <Link
            to="/auth/signup"
            id="signup__link"
            className="text-[#c19008] no-underline flex items-center hover:font-semibold"
          >
            ثبت نام در کالج گرام
            <img src={arrowback} alt="Back Icon" className="h-[8px] ml-2" />
          </Link>
        </section>
      </form>
    </div>
  );
}

export default Login;
