import React from "react";
import { Link } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import key from "../assets/photos/key.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "../utils/validation";
import { INewPasswordFormValues } from "../types/types";

function NewPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<INewPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit: SubmitHandler<INewPasswordFormValues> = (formData) => {
    // formData is object of our input names with theirvalues
    // to do => connect with api
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-5 bg-[#f3f0ee] font-primary ">
      <p
        id="title"
        className="text-[16px] leading-[20px] text-center font-normal mb-[15px]"
      >
        تنظیم رمز عبور جدید
      </p>
      <form
        id="recover-form"
        className="flex gap-5 flex-col items-start justify-start mt-[20px]"
        onSubmit={handleSubmit(onSubmit)}
      >
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
