import React, { useState, useRef, useCallback, useEffect } from "react";
import emailIcon from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import Switch from "./Switch";
import InputContainer from "./InputContainer";
import MainButton from "./MainButton";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  editPasswordValidation,
  editConfirmPasswordValidation,
  emailValidation,
  editLastNameValidation,
  editFirstNameValidation,
} from "../utils/validation";
import ErrorMessage from "./ErrorMessage";
import { useModal } from "../customhook/useModal";
import { useEditUserInfo } from "../api/user";
import ProfilePictureSelect from "./ProfilePictureSelect";
import { UserMeInfo } from "../types/types";

export interface IEditProfileValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  bio: string;
  isPrivate: boolean;
}

export interface EditProfileModalProps {
  user: UserMeInfo;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user }) => {
  const { onClose } = useModal();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { email, isPrivate, profileUrl, lastName, firstName, bio } = user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    control,
    setError,
    clearErrors,
  } = useForm<IEditProfileValues>({
    defaultValues: {
      email: email,
      firstName: firstName || "",
      lastName: lastName || "",
      password: "",
      confirmPassword: "",
      bio: bio || "",
      isPrivate: isPrivate || false,
    },
    mode: "all",
    delayError: 700,
  });

  const { mutateAsync } = useEditUserInfo();

  const submitHandler: SubmitHandler<IEditProfileValues> = async (
    formValues
  ) => {
    const { confirmPassword, ...requestBody } = formValues;
    const form_data = new FormData();
    Object.entries(requestBody).forEach((entery) => {
      const [key, value] = entery;
      if (value === "") return;
      form_data.append(key, JSON.stringify(value));
    });

    if (selectedFiles[0]) {
      form_data.append("profileUrl", selectedFiles[0]);
    }
    await mutateAsync(form_data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form
      className="w-[375px] px-12 py-6 flex flex-col gap-3 align-middle transform bg-bone rounded-[24px] shadow-xl transition-all"
      dir="rtl"
      onSubmit={handleSubmit(submitHandler)}
    >
      {/* <Controller
        name="photo"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <ProfilePictureSelect
              selectedFiles={value}
              setSelectedFiles={onChange}
            />
          );
        }}
      /> */}
      <ProfilePictureSelect
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        currentImage={profileUrl || ""}
      />
      <div className="flex flex-col gap-7">
        <h3 className="flex justify-center text-lg font-bold text-[16px] leading-[22px] text-navy font-primary">
          ویرایش حساب
        </h3>
        <InputContainer
          placeholder="ایمیل"
          icon={emailIcon}
          type="text"
          width="262px"
          {...register("email", emailValidation())}
        />
        <ErrorMessage errorMessage={errors?.email?.message} />

        <InputContainer
          placeholder="نام"
          icon={emailIcon}
          type="text"
          width="262px"
          {...register("firstName", editFirstNameValidation())}
        />
        <ErrorMessage errorMessage={errors?.firstName?.message} />

        <InputContainer
          placeholder="نام خانوادگی"
          icon={emailIcon}
          type="text"
          width="262px"
          {...register("lastName", editLastNameValidation())}
        />
        <ErrorMessage errorMessage={errors?.lastName?.message} />

        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="262px"
          {...register("password", editPasswordValidation())}
        />
        <ErrorMessage errorMessage={errors?.password?.message} />

        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
          width="262px"
          {...register(
            "confirmPassword",
            editConfirmPasswordValidation(getValues().password)
          )}
        />
        <ErrorMessage errorMessage={errors?.confirmPassword?.message} />

        <div
          className="flex w-full items-center justify-end text-[12px] font-medium text-navy"
          dir="ltr"
        >
          پیج خصوصی باشه
          <div className="ml-3">
            <Controller
              name="isPrivate"
              control={control}
              render={({ field: { onChange, value } }) => {
                return <Switch checked={value} onChange={onChange} />;
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-start mb-2 text-[12px] font-medium leading-[20px] text-navy">
            بایو
          </div>
          <textarea
            className="w-full h-[88px] rounded-lg border-solid border-[1px] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-gray-300 resize-none"
            {...register("bio")}
          />
        </div>
      </div>
      <div className="flex items-center justify-start">
        <MainButton type="submit" isSubmitting={isSubmitting}>
          ثبت تغییرات
        </MainButton>
        <button
          type="button"
          className="px-4 py-2 m-0 text-sm font-normal text-black hover:font-semibold focus:outline-none"
          onClick={() => onClose()}
        >
          پشیمون شدم
        </button>
      </div>
    </form>
  );
};

export default EditProfileModal;
