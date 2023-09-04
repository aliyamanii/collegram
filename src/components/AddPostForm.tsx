import React, { useState, useRef } from "react";
import InputContainer from "./InputContainer";
import { Switch } from "@headlessui/react";
import x from "../assets/photos/x.svg";
import plus from "../assets/photos/plus.svg";

interface AddPostFormProps {
  onSubmit: (postData: { title: string; content: string }) => void;
  onCancel: () => void;
  onAdd: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onSubmit, onCancel }) => {
  const [postData, setPostData] = useState({ caption: "", tags: "" });
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const files = Array.from(fileList).slice(0, 8);
      setSelectedFiles(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setFilePreviews(previews);
    }
  };

  const handleSubmit = () => {};

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
    <div className=" flex flex-col object-cover  ">
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
            className="flex justify-end items-center w-[168px] h-[36px] cursor-pointer p-3 rounded-md  font-bold hover:bg-[#FFE4B5] text-[#C19008] transition-all duration-300"
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
      </div>
      <div className="mb-4 font-primary">
        <div className="flex justify-end my-2 text-[16px] font-medium leading-[20px] text-[#17494D]">
          توضیحات
        </div>
        <textarea
          className="w-full h-32 rounded-lg border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-[#cdcdcd] resize-none"
          name="caption"
          value={postData.caption}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <div className="flex justify-end text-[16px] font-medium leading-[20px] text-[#17494D]">
          تگ ها
        </div>
        <textarea
          className="w-full h-[40px] rounded-[30px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-[#cdcdcd] resize-none"
          name="tags"
          value={postData.tags}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end items-end my-5">
        <div className="flex justify-end items-end w-full max-w-xs mx-auto">
          <Switch.Group
            as="div"
            className="flex justify-end items-end space-x-4"
          >
            <Switch.Label className="text-[#17494D]">
              فقط نمایش به دوستان نزدیک
            </Switch.Label>
            <Switch
              as="button"
              checked={switchValue}
              onChange={setSwitchValue}
              className={`${
                switchValue ? "bg-[#C19008]" : "bg-gray-200"
              } relative inline-flex  flex-end flex-shrink-0 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
            >
              {({ checked }) => (
                <span
                  className={`${
                    checked ? "translate-x-5" : "translate-x-0"
                  } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                />
              )}
            </Switch>
          </Switch.Group>
        </div>
      </div>
      <div className="flex">
        <button
          type="button"
          className="w-[104px] h-[36px] inline-flex justify-center  px-4 py-2 text-sm font-medium text-white bg-[#c19008] rounded-[30px] hover:bg-[#ffc72d] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleSubmit}
        >
          ثبت عکس
        </button>
        <button
          type="button"
          className="px-4 py-2 mr-2 text-sm font-normal text-black hover:font-semibold focus:outline-none"
          onClick={onCancel}
        >
          پشیمون شدم
        </button>
      </div>
    </div>
  );
};

export default AddPostForm;
