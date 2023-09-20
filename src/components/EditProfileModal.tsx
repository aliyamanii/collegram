import React, { useState, useRef, useCallback, useEffect } from "react";
import email from "../assets/photos/email-light.svg";
import key from "../assets/photos/key.svg";
import cam from "../assets/photos/cam.svg";
import retry from "../assets/photos/retry.svg";
import Switch from "./Switch";
import InputContainer from "./InputContainer";
import MainButton from "./MainButton";
import { useModal } from "../customhook/useModal";

const EditProfileModal: React.FC = () => {
  const [privatePost, setPrivatePost] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { onClose } = useModal();

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
    <div className="w-[375px] h-3/5  p-12 flex flex-col gap-7 align-middle transform bg-[#F3F0EE] rounded-[24px] shadow-xl transition-all">
      <div className="flex justify-center items-center">
        <label
          htmlFor="fileInput"
          className="w-[150px] h-[150px] flex items-center justify-center rounded-full overflow-hidden cursor-pointer border border-gray-300"
        >
          {selectedFiles.length === 0 ? (
            <img src={cam} alt="+" className="object-cover" />
          ) : (
            <div className="relative">
              <img
                src={filePreviews[0]}
                alt="Selected"
                className="object-cover w-full h-full"
              />
              <div
                className="w-[32px] h-[32px] flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 bg-white hover:bg-pink-200 rounded-full hover:cursor-pointer transition-all duration-300"
                onClick={() => removeImage(0)} // Assuming you always have one image selected
              >
                <img
                  src={retry}
                  alt={"Retry"}
                  className="w-[16px] h-[16px] absolute m-2 rounded-full"
                />
              </div>
            </div>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleFileSelect}
          className="hidden"
          ref={fileInputRef}
        />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-[#17494D] font-primary">
          ویرایش حساب
        </h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          ref={fileInputRef}
        />
        <InputContainer
          placeholder="ایمیل"
          icon={email}
          type="text"
          width="262px"
        />
        <InputContainer
          placeholder="نام"
          icon={email}
          type="text"
          width="262px"
        />
        <InputContainer
          placeholder="نام خانوادگی"
          icon={email}
          type="text"
          width="262px"
        />
        <InputContainer
          placeholder="رمز عبور"
          icon={key}
          type="password"
          width="262px"
        />
        <InputContainer
          placeholder="تکرار رمز عبور"
          icon={key}
          type="password"
          width="262px"
        />

        <div className="flex w-full items-center justify-end text-[14px] font-medium text-[#17494D]">
          پیج خصوصی باشه
          <div className="ml-3">
            <Switch
              checked={privatePost}
              onChange={() => setPrivatePost(!privatePost)}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-end mb-2 text-[16px] font-semibold leading-[20px] text-[#17494D]">
            بایو
          </div>
          <textarea
            className="w-full h-[88px] rounded-lg border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-[#cdcdcd] resize-none"
            name="bio"
            // value={bioInput.bio}
            // onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-start">
        <MainButton
          onClick={() => {
            onClose();
          }}
        >
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
