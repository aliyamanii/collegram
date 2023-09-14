import React, { useState, useRef, useCallback, useEffect } from "react";
import x from "../assets/photos/x.svg";
import plus from "../assets/photos/plus.svg";
import MainButton from "./MainButton";
import Switch from "./Switch";

interface AddPostModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (postData: { caption: string; tags: string }) => void;
  onCancel: () => void;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  isOpen,
  closeModal,
  onSubmit,
  onCancel,
}) => {
  const [postData, setPostData] = useState({ caption: "", tags: "" });
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPostData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

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

  const handleSubmit = () => {
    onSubmit(postData);
  };

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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeModal]);

  return (
    <div className={`absolute inset-0 z-10 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={closeModal}
      ></div>
      <div className="absolute w-fit h-fit left-[40%] top-[20%] inset-0 flex items-center justify-center p-4 text-center">
        <div className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-[#F3F0EE] rounded-[24px] shadow-xl transition-all">
          <h3 className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-[#17494D] font-primary">
            افزودن پست
          </h3>
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
              <div className="flex justify-end my-2 text-[16px] font-medium leading-[20px] text-[#17494D]">
                تگ ها
              </div>
              <textarea
                className="w-full h-[40px] rounded-[30px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[16px] text-[12px] font-normal placeholder:text-[#cdcdcd] resize-none"
                name="tags"
                value={postData.tags}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-end text-[14px] font-medium text-[#17494D]">
              فقط نمایش به دوستان نزدیک
              <div className="ml-3">
                <Switch
                  checked={switchValue}
                  onChange={() => setSwitchValue(!switchValue)}
                />
              </div>
            </div>

            <div className="flex">
              <MainButton>ثبت عکس</MainButton>
              <button
                type="button"
                className="px-4 py-2 mr-2 text-sm font-normal text-black hover:font-semibold focus:outline-none"
                onClick={onCancel}
              >
                پشیمون شدم
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
