import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import userIcon from "../assets/photos/person.svg";
import key from "../assets/photos/key.svg";
import arrowback from "../assets/photos/arrow-back-dark.svg";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { api } from "../../src/api/instance";
import { identifierValidation } from "../utils/validation";
import MainButton from "../components/MainButton";
import { ILoginFormValues } from "../types/types";
import { toast } from "react-toastify";
import { successToast } from "../utils/customToast";

function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    setValue,
  } = useForm<ILoginFormValues>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
    mode: "all",
    delayError: 700,
  });

  // to delete
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmit: SubmitHandler<ILoginFormValues> = async (formData) => {
    await api
      .post("users/login", {
        identifier: formData.usernameOrEmail,
        password: formData.password,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.data.token);
        navigate(state?.lastPath || "/app/home");
        successToast("با موفقیت وارد شدید");
      })
      .catch((error) => {
        // trigger toast message
        setValue("password", "");
        setError("password", {
          type: "validate",
          message: "نام کاربری یا رمز عبور اشتباه است",
        });
      });
  };

  return (
    <div className="flex flex-col  items-center w-full h-full p-5 bg-bone font-secondary ">
      <section
        id="switch-mode"
        className="flex justify-between w-full mb-[20px]"
      >
        <Link
          to="/auth/signup"
          id="signup__button"
          className="text-base font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-cloud hover:font-semibold "
        >
          ثبت نام در کالج گرام
        </Link>
        <div className="w-[1px] h-full bg-black"></div>
        <Link
          to="/auth/login"
          id="login__button"
          className="text-4 font-normal leading-[20px] tracking-[-0.02em] text-center cursor-pointer text-charcoal hover:font-semibold "
        >
          ورود به کالج گرام
        </Link>
      </section>
      <form
        id="login-form"
        className="flex flex-col gap-5 items-start justify-start mt-[20px] "
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
        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="320px"
          hasError={Boolean(errors?.password?.message)}
          {...register("password")}
        />
        <ErrorMessage errorMessage={errors?.password?.message} />
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
            <span className="text-[12px] leading-[20px] text-charcoal ml-[6px]">
              من را به خاطر بسپار
            </span>
            <div
              className={`w-[12px] h-[12px] rounded-[4px] ${
                rememberMe ? "bg-white shadow-checkbox" : "bg-amber"
              } flex-shrink-0 ml-2 transition-all duration-300 hover:border`}
            />
          </label>
        </section>
        <MainButton type="submit" isSubmitting={isSubmitting}>
          ورود
        </MainButton>
        <section
          id="other-options"
          className="w-full h-[56px] gap-[16px] flex items-end justify-end flex-col font-medium text-[12px] leading-[20px] tracking-[-2%]"
        >
          <button
            id="recoverpassword__link"
            className="text-amber no-underline flex items-center hover:font-semibold"
            onClick={() =>
              navigate("/auth/recover-password", {
                state: { identifier: getValues("usernameOrEmail") },
              })
            }
          >
            رمز عبورم رو فراموش کردم
            <img src={arrowback} alt="Back Icon" className="h-[8px] ml-2" />
          </button>
          <Link
            to="/auth/signup"
            id="signup__link"
            className="text-amber no-underline flex items-center hover:font-semibold"
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
