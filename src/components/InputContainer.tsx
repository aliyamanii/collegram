import React from "react";

interface InputContainerProps {
  placeholder: string;
  icon: string;
  type: string;
}

function InputContainer({ placeholder, icon, type }: InputContainerProps) {
  return (
    <div
      id="input__container"
      className="relative w-[277px] h-[36px] mb-[30px]"
    >
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[30px] text-[12px] font-normal placeholder:text-[#cdcdcd]"
      />
      <img
        src={icon}
        alt="Icon"
        className="absolute top-0 right-[8px] bottom-0 my-auto"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}

export default InputContainer;
