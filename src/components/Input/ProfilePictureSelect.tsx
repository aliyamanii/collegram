import React, { useCallback, useEffect, useRef, useState } from "react";
import cam from "../assets/photos/cam.svg";
import retry from "../assets/photos/retry.svg";

function ProfilePictureSelect({
  selectedFiles,
  setSelectedFiles,
  currentImage,
}: {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  currentImage: string;
}) {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    <div className="flex justify-center items-center ">
      <label
        htmlFor="fileInput"
        className="w-[120px] h-[120px] flex items-center justify-center rounded-full overflow-hidden cursor-pointer border border-gray-300"
      >
        {selectedFiles.length === 0 ? (
          currentImage ? (
            <div className="flex justify-center items-center">
              <img src={currentImage} alt="+" className="object-cover" />
              <img
                src={retry}
                alt={"Retry"}
                className="w-[24px] h-[24px] absolute  rounded-full bg-white border-4 border-white"
              />
            </div>
          ) : (
            <img src={cam} alt="+" className="object-cover" />
          )
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
  );
}

export default ProfilePictureSelect;
