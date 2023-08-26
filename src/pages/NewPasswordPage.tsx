import React from "react";
import { Link } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import key from "../assets/photos/key.svg";

function NewPassword() {
  return (
    <div className="flex flex-col items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <text
        id="title"
        className="text-[16px] leading-[20px] text-center font-normal mb-[15px]"
      >
        تنظیم رمز عبور جدید
      </text>
      <form
        id="recover-form"
        className="flex flex-col items-start justify-start mt-[20px]"
      >
        <InputContainer placeholder="رمز عبور" icon={key} type="text" />
        <InputContainer placeholder="تکرار رمز عبور" icon={key} type="text" />
        <section id="buttons">
          <button
            id="submit__button"
            className="mt-auto mb-[20px] w-[139px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[14px] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
          >
            ثبت رمز عبور جدید
          </button>
        </section>
      </form>
    </div>
  );
}

export default NewPassword;
