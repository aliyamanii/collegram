import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/photos/person.svg";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import InputContainer from "../components/InputContainer";

function SignUp() {
  return (
    <div className="flex flex-col items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <section
        id="switch-mode"
        className="flex justify-between w-full mb-[20px]"
      >
        <Link
          to="/auth/signup"
          id="signup__button"
          className="text-base font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#2b2b2b] hover:font-semibold "
        >
          ثبت نام در کالج گرام
        </Link>
        <div className="w-[1px] h-full bg-[black]"></div>
        <Link
          to="/auth/login"
          id="login__button"
          className="text-4 font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#a5a5a5] hover:font-semibold"
        >
          ورود به کالج گرام
        </Link>
      </section>
      <form
        id="signup__form"
        className="flex flex-col items-start justify-start mt-[20px]"
      >
        <InputContainer placeholder="نام کاربری" icon={userIcon} type="text" />
        <InputContainer placeholder="ایمیل" icon={email} type="text" />
        <InputContainer placeholder="رمز عبور" icon={key} type="password" />
        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
        />

        <button
          id="submit__button"
          className="mt-auto mb-[20px] w-[84px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
}

export default SignUp;
