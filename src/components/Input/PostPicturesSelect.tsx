import React, { useCallback, useEffect, useRef, useState } from "react";
import x from "../assets/photos/x.svg";
import plus from "../assets/photos/plus.svg";
import { IAddPostValues } from "../Modals/AddPostModal";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

function PostPicturesSelect({
  selectedFiles,
  setSelectedFiles,
  setError,
  clearErrors,
  errors,
}: {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setError: UseFormSetError<IAddPostValues>;
  clearErrors: UseFormClearErrors<IAddPostValues>;
  errors: FieldErrors<IAddPostValues>;
}) {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;

      if (fileList) {
        const files = Array.from(fileList).slice(0, 8);
        setSelectedFiles(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setFilePreviews(previews);
      }
    },
    []
  );

  useEffect(() => {
    const length = selectedFiles.length;
    if (length > 5 || length === 0) {
      setError("root", { message: "باید بین یک تا پنج عکس انتخاب کنید" });
    } else {
      clearErrors("root");
    }
  }, [selectedFiles]);

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
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
      />

      <div className="flex justify-end my-3">
        <div
          onClick={showFileInput}
          className="flex justify-end items-center w-[168px] h-[36px] cursor-pointer p-3 rounded-md  font-bold hover:bg-[#FFE4B5] text-amber transition-all duration-300"
        >
          بارگذاری عکس ها
          <img src={plus} alt={"+"} className="mx-2" />
        </div>
      </div>
      <div className="flex flex-wrap flex-grow-0">
        {filePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-[112px] h-[112px] object-cover m-2 rounded-[24px]"
            />
            <div
              className=" w-[24px] h-[24px] flex items-center justify-center absolute top-0 right-0 p-1 bg-white hover:bg-pink-200 rounded-full hover:cursor-pointer transition-all duration-300"
              onClick={() => removeImage(index)}
            >
              <img
                src={x}
                alt={"X"}
                className="w-[12] h-[12px] absolute m-2 rounded-[24px]"
              />
            </div>
          </div>
        ))}
      </div>
      <ErrorMessage errorMessage={errors?.root?.message} />
    </div>
  );
}

export default PostPicturesSelect;
