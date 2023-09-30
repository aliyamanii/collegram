import React, { useState, useRef, useCallback, useEffect } from "react";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import Switch from "./Switch";
import InputContainer from "./InputContainer";
import MainButton from "./MainButton";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  ChangePasswordValidation,
  ConfirmChangePasswordValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "../utils/validation";
import ErrorMessage from "./ErrorMessage";
import { useModal } from "../customhook/useModal";
import { fetchMyInfo, useEditUserInfo } from "../api/user";
import ProfilePictureSelect from "./ProfilePictureSelect";

export interface IEditProfileValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  bio: string;
  isPrivate: boolean;
}

const EditProfileModal: React.FC = () => {
  const { onClose } = useModal();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    setError,
    clearErrors,
  } = useForm<IEditProfileValues>({
    defaultValues: async () => {
      const data = await fetchMyInfo();
      const defaultValue: IEditProfileValues = {
        email: data.email,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        password: "",
        confirmPassword: "",
        bio: data.bio || "",
        isPrivate: data.isPrivate || false,
      };
      return defaultValue;
    },
    mode: "all",
    delayError: 700,
  });

  const { mutate } = useEditUserInfo();

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
    mutate(form_data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="w-[375px] h-3/5  p-12 flex flex-col gap-7 align-middle transform bg-bone rounded-[24px] shadow-xl transition-all">
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
      />
      <div className="flex flex-col gap-8">
        <h3 className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-navy font-primary">
          ویرایش حساب
        </h3>
        <InputContainer
          placeholder="ایمیل"
          icon={email}
          type="text"
          width="262px"
          {...register("email", emailValidation())}
        />
        <ErrorMessage errorMessage={errors?.email?.message} />

        <InputContainer
          placeholder="نام"
          icon={email}
          type="text"
          width="262px"
          {...register("firstName", firstNameValidation())}
        />
        <ErrorMessage errorMessage={errors?.firstName?.message} />

        <InputContainer
          placeholder="نام خانوادگی"
          icon={email}
          type="text"
          width="262px"
          {...register("lastName", lastNameValidation())}
        />
        <ErrorMessage errorMessage={errors?.lastName?.message} />

        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="262px"
          {...register("password", ChangePasswordValidation())}
        />
        <ErrorMessage errorMessage={errors?.password?.message} />

        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
          width="262px"
          {...register(
            "confirmPassword",
            ConfirmChangePasswordValidation(getValues().password)
          )}
        />
        <ErrorMessage errorMessage={errors?.confirmPassword?.message} />

        <div className="flex w-full items-center justify-end text-[14px] font-medium text-navy">
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
          <div className="flex justify-end mb-2 text-[16px] font-semibold leading-[20px] text-navy">
            بایو
          </div>
          <textarea
            className="w-full h-[88px] rounded-lg border-solid border-[1px] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-gray-300 resize-none"
            {...register("bio")}
          />
        </div>
      </div>
      <div className="flex items-center justify-start">
        <MainButton onClick={handleSubmit(submitHandler)}>
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
    </div>
  );
};

export default EditProfileModal;
