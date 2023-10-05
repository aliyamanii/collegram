import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import userIcon from "../assets/photos/person.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { api } from "../api/instance";
import { identifierValidation } from "../utils/validation";
import MainButton from "../components/MainButton";
import { IRecoverPasswordValues } from "../types/types";
import { errorToast, successToast } from "../utils/customToast";

function RecoverPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRecoverPasswordValues>({
    defaultValues: {
      usernameOrEmail: state.identifier || "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit: SubmitHandler<IRecoverPasswordValues> = async (formData) => {
    await api
      .post("users/password", {
        identifier: formData.usernameOrEmail,
      })
      .then((result) => {
        console.log(result);
        // triger toasst success send email
        successToast(
          `ایمیل بازیابی رمز عبور به این آدرس ${result.data.data.email} فرستاده شد`
        );
      })
      .catch((error) => {
        // errorToast("چیزی اشتباه پیش رفت");
      });
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-5 bg-bone font-primary ">
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
        <section id="buttons" className="flex items-center ">
          <MainButton type="submit" isSubmitting={isSubmitting}>
            ارسال لینک بازیابی رمز عبور
          </MainButton>
          <Link
            to="/auth/login"
            id="cancel__link"
            className="text-charcoal no-underline w-[104px] h-[36px] ml-[10px] hover:font-semibold flex justify-center items-center"
          >
            انصراف
          </Link>
        </section>
      </form>
    </div>
  );
}

export default RecoverPassword;
