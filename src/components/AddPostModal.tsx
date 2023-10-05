import React, { useState, useRef, useCallback, useEffect } from "react";
import MainButton from "./MainButton";
import Switch from "./Switch";
import { useModal } from "../customhook/useModal";
import { Controller, useForm } from "react-hook-form";
import { useAddPostMutation } from "../api/Posts";
import ErrorMessage from "./ErrorMessage";
import PostPicturesSelect from "./PostPicturesSelect";
import { descriptionValidation, tagsValidation } from "../utils/validation";
import { successToast } from "../utils/customToast";

export interface IAddPostValues {
  tags: string;
  description: string;
  closeFriendsOnly: boolean;
}

const AddPostModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    control,
    clearErrors,
    setError,
  } = useForm<IAddPostValues>({
    defaultValues: { tags: "", description: "", closeFriendsOnly: false },
    mode: "all",
    delayError: 700,
  });

  const { mutateAsync } = useAddPostMutation();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { isOpen, onClose } = useModal();

  const submitForm = async (formValues: IAddPostValues) => {
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

    await mutateAsync(form_data, {
      onSuccess: () => {
        successToast("پست با موفقیت افزوده شد");
        onClose();
      },
    });
  };

  return (
    <form
      className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-bone rounded-[24px] shadow-xl transition-all"
      onSubmit={handleSubmit(submitForm)}
    >
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
        <div className="mb-4 font-primary flex flex-col gap-6">
          <div className="flex flex-col gap-3 justify-between">
            <div className="flex justify-end my-2 text-[16px] font-medium leading-[20px] text-navy">
              توضیحات
            </div>
            <textarea
              className="w-full h-32 rounded-lg border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-gray-300 resize-none"
              {...register("description", descriptionValidation())}
            />
            <ErrorMessage errorMessage={errors?.description?.message} />
          </div>

          <div>
            <div className="flex justify-end my-2 text-[16px] font-medium leading-[20px] text-navy">
              تگ ها
            </div>
            <div className="flex flex-col gap-3 justify-between">
              <textarea
                className="w-full h-[40px] rounded-[30px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-gray-300 resize-none"
                {...register("tags", tagsValidation())}
              />
              <ErrorMessage errorMessage={errors?.tags?.message} />
            </div>
          </div>
          <div className="flex items-center justify-end text-[14px] font-medium text-navy">
            <div> فقط نمایش به دوستان نزدیک</div>
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
            <MainButton type="submit" isSubmitting={isSubmitting}>
              ثبت عکس
            </MainButton>
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
    </form>
  );
};

export default AddPostModal;
