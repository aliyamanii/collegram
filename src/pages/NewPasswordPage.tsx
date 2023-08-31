import React from "react";
import { Link } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import key from "../assets/photos/key.svg";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

function NewPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
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
            validate: (value) => {
              const { password } = getValues();
              return (
                password === value || "تکرار رمز عبور برابر با رمز عبور نیست"
              );
            },
          })}
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
