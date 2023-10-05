import React, { ReactNode, MouseEvent } from "react";
import SpinnerIcon from "../assets/photos/spinner.svg";

interface ButtonProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  isSubmitting?: boolean;
  disabledMode?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  type = "button",
  isSubmitting,
  disabledMode,
}) => {
  return (
    <button
      className={`py-2 px-4 text-sm font-medium text-white bg-amber rounded-full  hover:text-black  ${className} flex justify-center items-center ${
        disabledMode ? "bg-slate-700 hover:text-white" : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={isSubmitting || disabledMode}
    >
      {isSubmitting && (
        <img
          src={SpinnerIcon}
          className="absolute  animate-spin w-3 z-20"
          alt=""
        />
      )}
      <div className={isSubmitting ? "opacity-0 z-0" : ""}>{children}</div>
    </button>
  );
};

export default MainButton;
