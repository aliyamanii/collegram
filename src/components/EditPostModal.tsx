import React, { useState, useRef, useCallback } from "react";
import MainButton from "./MainButton";
import Switch from "./Switch";
import { useModal } from "../customhook/useModal";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editPost, fetchPostDetails } from "../api/Posts";
import { useParams } from "react-router-dom";

export interface IEditPostValues {
  tags: string;
  description: string;
  closeFriendsOnly: boolean;
}

const EditPostModal: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IEditPostValues>({
    defaultValues: async () => {
      const data = await fetchPostDetails(id);
      console.log(data);
      const tagTexts = data.tags.map((tag: any) => tag.value).join(" ");
      const defaultValue: IEditPostValues = {
        tags: tagTexts,
        description: data.description || "",
        closeFriendsOnly: data.closeFriendsOnly || false,
      };
      return defaultValue;
    },
    mode: "all",
    delayError: 700,
  });

  const { mutate } = useMutation({
    mutationKey: ["posts", "detail", id],
    mutationFn: (data: FormData) => editPost(data, id),
    onSuccess: () => {
      // client.invalidateQueries({ queryKey: ["user"], type: "all" });
    },
  });

  const { isOpen, onClose } = useModal();

  const submitForm = (formValues: IEditPostValues) => {
    console.log(formValues);
    const requestBody = {
      ...formValues,
      tags: formValues.tags.trim().replace(/\s+/g, " ").split(" "),
    };
    const form_data = new FormData();
    Object.entries(requestBody).forEach((entery) => {
      const [key, value] = entery;
      form_data.append(key, JSON.stringify(value));
    });

    mutate(form_data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-bone rounded-[24px] shadow-xl transition-all">
      <h3 className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-navy font-primary">
        ویرایش پست
      </h3>
      <div className=" flex flex-col object-cover  ">
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

export default EditPostModal;
