import React, { useState, useRef, useCallback, useEffect } from "react";
import MainButton from "./MainButton";
import Switch from "./Switch";
import { useModal } from "../customhook/useModal";
import { Controller, useForm } from "react-hook-form";
import { useAddPostMutation } from "../api/Posts";
import ErrorMessage from "./ErrorMessage";
import PostPicturesSelect from "./PostPicturesSelect";

export interface IAddPostValues {
  tags: string;
  description: string;
  closeFriendsOnly: boolean;
}

const AddPostModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    clearErrors,
    setError,
  } = useForm<IAddPostValues>({
    defaultValues: { tags: "", description: "", closeFriendsOnly: false },
    mode: "all",
    delayError: 700,
  });

  const { mutate } = useAddPostMutation();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { isOpen, onClose } = useModal();

  const submitForm = (formValues: IAddPostValues) => {
    const requestBody = {
      ...formValues,
      tags: formValues.tags.trim().replace(/\s+/g, " ").split(" "),
    };
    const form_data = new FormData();

    Object.entries(requestBody).forEach((entery) => {
      const [key, value] = entery;
      form_data.append(key, JSON.stringify(value));
    });
    selectedFiles.forEach((file) => form_data.append("photos", file));

    console.log(form_data);

    mutate(form_data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-bone rounded-[24px] shadow-xl transition-all">
      <h3 className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-navy font-primary">
        افزودن پست
      </h3>
      <div className=" flex flex-col object-cover  ">
        <PostPicturesSelect
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
        />
        <div className="mb-4 font-primary">
          <div className="flex justify-end my-2 text-[16px] font-medium leading-[20px] text-navy">
            توضیحات
          </div>
          <textarea
            className="w-full h-32 rounded-lg border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-gray-300 resize-none"
            {...register("description")}
          />
        </div>
        <div>
          <div className="flex justify-end my-2 text-[16px] font-medium leading-[20px] text-navy">
            تگ ها
          </div>
          <textarea
            className="w-full h-[40px] rounded-[30px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-gray-300 resize-none"
            {...register("tags")}
          />
        </div>
        <div className="flex items-center justify-end text-[14px] font-medium text-navy">
          فقط نمایش به دوستان نزدیک
          <div className="ml-3">
            <Controller
              name="closeFriendsOnly"
              control={control}
              render={({ field: { onChange, value } }) => {
                return <Switch checked={value} onChange={onChange} />;
              }}
            />
          </div>
        </div>

        <div className="flex">
          <MainButton onClick={handleSubmit(submitForm)}>ثبت عکس</MainButton>
          <button
            type="button"
            className="px-4 py-2 mr-2 text-sm font-normal text-black hover:font-semibold focus:outline-none"
            onClick={onClose}
          >
            پشیمون شدم
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
