import React from "react";
import { Link } from "react-router-dom";
import InputContainer from "../components/InputContainer";
import userIcon from "../assets/photos/person.svg";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

function RecoverPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameOrEmail: "",
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
          {...register("usernameOrEmail", {
            required: { value: true, message: ".فیلد ایمیل اجباری است" },
            validate: (value) => {
              console.log(emailRegex.test(value));
              return (
                emailRegex.test(value) ||
                /^[a-z][a-z1-9_]{3,63}$/i.test(value) ||
                "مقدار وارد شده یک ایمیل یا نام کاربری صحیح نمی باشد"
              );
            },
          })}
        />
        <ErrorMessage errorMessage={errors?.usernameOrEmail?.message} />
        <section id="buttons">
          <button
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
