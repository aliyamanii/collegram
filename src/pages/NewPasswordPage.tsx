import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import key from "../assets/photos/key.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "../utils/validation";
import MainButton from "../components/MainButton";
import { INewPasswordFormValues } from "../types/types";
import { api } from "../api/instance";
import { successToast } from "../utils/customToast";

function NewPassword() {
  const navigate = useNavigate();
  const { token } = useParams() as { token: string };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<INewPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit: SubmitHandler<INewPasswordFormValues> = async (formData) => {
    // formData is object of our input names with theirvalues
    // to do => connect with api
    await api
      .put("/users/password", { password: formData.password, token })
      .then(() => {
        successToast("رمز عبور با موفقیت تغیر کرد");
        navigate("/auth/login");
      })
      .catch();
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-5 bg-bone font-secondary ">
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
          <MainButton type="submit" isSubmitting={isSubmitting}>
            ثبت رمز عبور جدید
          </MainButton>
        </section>
      </form>
    </div>
  );
}

export default NewPassword;
