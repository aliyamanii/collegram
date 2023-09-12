import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/photos/person.svg";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import InputContainer from "../components/InputContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { api } from "../api/instance";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../utils/validation";
import { ISignupFormValues } from "../types/types";

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignupFormValues>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit: SubmitHandler<ISignupFormValues> = (formData) => {
    // formData is object of our input names with theirvalues
    // to do => connect with api

    api
      .post("users/signup/", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/app/home");
      })
      .catch((error) => {
        //triger toast error message
      });
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <section
        id="switch-mode"
        className="flex justify-between w-full mb-[20px]"
      >
        <Link
          to="/auth/signup"
          id="signup-button"
          className="text-base font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#2b2b2b] hover:font-semibold "
        >
          ثبت نام در کالج گرام
        </Link>
        <div className="w-[1px] h-full bg-[black]"></div>
        <Link
          to="/auth/login"
          id="login-button"
          className="text-4 font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-[#a5a5a5] hover:font-semibold"
        >
          ورود به کالج گرام
        </Link>
      </section>
      <form
        id="signup-form"
        className="flex flex-col items-start gap-5 justify-start "
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputContainer
          placeholder="نام کاربری"
          icon={userIcon}
          type="text"
          width="320px"
          {...register("username", usernameValidation())}
        />
        <ErrorMessage errorMessage={errors?.username?.message} />
        <InputContainer
          placeholder="ایمیل"
          icon={email}
          type="text"
          width="320px"
          {...register("email", emailValidation())}
        />
        <ErrorMessage errorMessage={errors?.email?.message} />

        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="320px"
          {...register("password", passwordValidation())}
        />
        <ErrorMessage errorMessage={errors?.password?.message} />

        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
          width="320px"
          {...register(
            "confirmPassword",
            confirmPasswordValidation(getValues().password)
          )}
        />
        <ErrorMessage errorMessage={errors?.confirmPassword?.message} />
        <button
          id="submit__button"
          className="mt-auto mb-[20px] w-[84px] h-[36px] py-[8px] px-[16px] border-none bg-[gold] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
}

export default SignUp;
