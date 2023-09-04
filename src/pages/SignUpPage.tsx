import React, { useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/photos/person.svg";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import InputContainer from "../components/InputContainer";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit = (formData: any) => {
    // formData is object of our input names with theirvalues
    // to do => connect with api
    console.log(formData);
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
          {...register("username", {
            required: { value: true, message: ".فیلد نام کاربری اجباری است" },
            minLength: {
              value: 4,
              message: ".نام کاربری نمی تواند کمتر از 4 کارکتر باشد",
            },
            maxLength: {
              value: 64,
              message: ".نام کاربری نمی تواند بیشتر از 64 کارکتر باشید",
            },
            validate: {
              validCharacterCheck: (value) => {
                return (
                  /^[a-z1-9_]{0,}$/i.test(value) ||
                  ".نام کاربری تنها میتواند شامل حروف انگلیسی ،اعداد و _ باشد"
                );
              },
              firstCharacterCheck: (value) => {
                return (
                  /^[a-z]/i.test(value) ||
                  ".نام کاربری تنها میتواند با حروف انگلیسی شروع شود"
                );
              },
            },
          })}
        />
        <ErrorMessage errorMessage={errors?.username?.message} />
        <InputContainer
          placeholder="ایمیل"
          icon={email}
          type="text"
          width="320px"
          {...register("email", {
            required: { value: true, message: ".فیلد ایمیل اجباریست" },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
              message: ".مقدار وارد شده یک ایمیل صحیح نیست",
            },
          })}
        />
        <ErrorMessage errorMessage={errors?.email?.message} />

        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="320px"
          {...register("password", {
            required: {
              value: true,
              message: ".فیلد پسورد اجباریست",
            },
            pattern: {
              value: /^[a-z1-9]{0,}$/i,
              message:
                ".رمز عبور فقط شامل حروف بزرگ و کوجک انگلیسی و اعداد است",
            },
            minLength: {
              value: 8,
              message: ".رمز عبور باید بیشتر از 8 کارکتر باشید",
            },
            maxLength: {
              value: 32,
              message: ".رمز عبور باید کمتر از 32 کارکتر باشد",
            },
          })}
        />
        <ErrorMessage errorMessage={errors?.password?.message} />

        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
          width="320px"
          {...register("confirmPassword", {
            required: { value: true, message: "فیلد تکرار رمز عبور اجباریست" },
            validate: (value) => {
              const { password } = getValues();
              return (
                password === value || "تکرار رمز عبور برابر با رمز عبور نیست"
              );
            },
          })}
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
