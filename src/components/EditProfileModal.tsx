import React, { useState, useRef, useCallback, useEffect } from "react";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import cam from "../assets/photos/cam.svg";
import retry from "../assets/photos/retry.svg";
import Switch from "./Switch";
import InputContainer from "./InputContainer";
import MainButton from "./MainButton";
import { Form, SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  confirmPasswordValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
} from "../utils/validation";
import ErrorMessage from "./ErrorMessage";
import { useModal } from "../customhook/useModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserInfo, fetchUserInfo } from "../api/user";
import ProfilePictureSelect from "./ProfilePictureSelect";

const EditProfileModal: React.FC = () => {
  const [privatePost, setPrivatePost] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { onClose } = useModal();

  interface IEditProfileValues {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmPassword: string;
    bio: string;
    isPrivate: boolean;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<IEditProfileValues>({
    defaultValues: async () => {
      const data = await fetchUserInfo();
      console.log("yesss", data);
      const defaultValue: IEditProfileValues = {
        email: data.email,
        firstname: data.firstname || "",
        lastname: data.lastname || "",
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

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data) => editUserInfo(data),
  });

  const submitHandler: SubmitHandler<IEditProfileValues> = async (formData) => {
    const { confirmPassword, ...requestBody } = formData;

    var form_data = new FormData();

    for (var key in requestBody) {
      form_data.append(key, JSON.stringify(requestBody[key]));
    }
    console.log(form_data);

    const response = await editUserInfo(form_data);
    onClose();
  };

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const preview = URL.createObjectURL(file);
        setSelectedFiles([file]);
        setFilePreviews([preview]);
      }
    },
    []
  );

  const showFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedFiles);
    const updatedPreviews = filePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setFilePreviews(updatedPreviews);
  };

  return (
    <div
      className="w-[375px] h-3/5  p-12 flex flex-col gap-7 align-middle transform bg-[#F3F0EE] rounded-[24px] shadow-xl transition-all"
      onSubmit={() => handleSubmit(submitHandler, () => console.log(errors))}
    >
      <ProfilePictureSelect />

      <div className="flex flex-col gap-8">
        <h3 className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-[#17494D] font-primary">
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
          {...register("firstname", firstNameValidation())}
        />
        <ErrorMessage errorMessage={errors?.firstname?.message} />

        <InputContainer
          placeholder="نام خانوادگی"
          icon={email}
          type="text"
          width="262px"
          {...register("lastname", lastNameValidation())}
        />
        <ErrorMessage errorMessage={errors?.lastname?.message} />

        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="262px"
          {...register("password", passwordValidation())}
        />
        <ErrorMessage errorMessage={errors?.password?.message} />

        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
          width="262px"
          {...register(
            "confirmPassword",
            confirmPasswordValidation(getValues().password)
          )}
        />
        <ErrorMessage errorMessage={errors?.confirmPassword?.message} />

        <div className="flex w-full items-center justify-end text-[14px] font-medium text-[#17494D]">
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
          <div className="flex justify-end mb-2 text-[16px] font-semibold leading-[20px] text-[#17494D]">
            بایو
          </div>
          <textarea
            className="w-full h-[88px] rounded-lg border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-[#cdcdcd] resize-none"
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
