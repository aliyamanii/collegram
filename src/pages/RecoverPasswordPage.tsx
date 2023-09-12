import React from "react";
import { Link, useLocation } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import userIcon from "../assets/photos/person.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { api } from "../api/instance";
import { identifierValidation } from "../utils/validation";
import { IRecoverPasswordValues } from "../types/types";

function RecoverPassword() {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecoverPasswordValues>({
    defaultValues: {
      usernameOrEmail: state.identifier || "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit: SubmitHandler<IRecoverPasswordValues> = (formData) => {
    api
      .post("users/forget", {
        identifier: formData.usernameOrEmail,
      })
      .then((result) => {
        // triger toasst success send email
      })
      .catch((error) => {
        // trigger toast error message
      });
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <text
        id="title"
        className="text-[16px] leading-[20px] text-center font-normal mb-[25px]"
      >
        بازیابی رمز عبور
      </text>
      <form
        id="recover-form"
        className="flex gap-5 flex-col items-start justify-start mt-[20px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputContainer
          placeholder="نام کاربری یا ایمیل"
          icon={userIcon}
          type="text"
          width="320px"
          {...register("usernameOrEmail", identifierValidation())}
        />
        <ErrorMessage errorMessage={errors?.usernameOrEmail?.message} />
        <section id="buttons">
          <button
            type="submit"
            id="submit__button"
            className="mt-auto mb-[20px] w-[184px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[14px] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
          >
            ارسال لینک بازیابی رمز عبور
          </button>
          <Link
            to="/auth/login"
            id="cancel__link"
            className="text-[#2B2B2B] no-underline w-[104px] h-[36px] ml-[10px] hover:font-semibold"
          >
            انصراف
          </Link>
        </section>
      </form>
    </div>
  );
}

export default RecoverPassword;
