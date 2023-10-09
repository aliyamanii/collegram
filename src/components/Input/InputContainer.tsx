import React from "react";

interface InputContainerProps {
  placeholder: string;
  icon: string;
  type: string;
  width: string;
  hasError?: boolean;
}

const InputContainer = React.forwardRef<HTMLInputElement, InputContainerProps>(
  ({ placeholder, icon, type, width, hasError = false, ...rest }, ref) => {
    return (
      <div id="input__container" className={`relative w-[${width}]`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full h-full rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[30px]
                      text-[12px] font-normal placeholder:text-gray-300 ${
                        hasError ? "outline outline-2 outline-red-500" : ""
                      } `}
          ref={ref}
          {...rest}
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
);

export default InputContainer;
