import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/photos/person.svg";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import InputContainer from "../../components/Input/InputContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../components/Input/ErrorMessage";
import { api } from "../../api/instance";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../../utils/validation";
import MainButton from "../../components/Input/MainButton";
import { ISignupFormValues } from "../../types/types";
import { errorToast } from "../../utils/customToast";

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
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

  const onSubmit: SubmitHandler<ISignupFormValues> = async (formData) => {
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
        console.log(" herrte");
        //triger toast error message
        if (error.error.errorCode === "USERNAME_TAKEN") {
          setError("username", {
            type: "validate",
            message: "این نام کاربری قبلا استفاده شده است",
          });
        }
        if (error.error.errorCode === "EMAIL_TAKEN") {
          setError("email", {
            type: "validate",
            message: "این ایمیل قبلا استفاده شده است",
          });
        }
        console.log(error.error);
      });
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full h-full p-5 bg-bone font-secondary ">
      <section
        id="switch-mode"
        className="flex justify-between w-full mb-[20px]"
      >
        <Link
          to="/auth/signup"
          id="signup-button"
          className="text-base font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-charcoal hover:font-semibold "
        >
          ثبت نام در کالج گرام
        </Link>
        <div className="w-[1px] h-full bg-black"></div>
        <Link
          to="/auth/login"
          id="login-button"
          className="text-4 font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-cloud hover:font-semibold"
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

        <MainButton type="submit" isSubmitting={isSubmitting}>
          ثبت نام
        </MainButton>
      </form>
    </div>
  );
}

export default SignUp;
