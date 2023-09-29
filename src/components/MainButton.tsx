import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

const MainButton: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  type = "button",
}) => {
  return (
    <button
      className={`py-2 px-4 text-sm font-medium text-white bg-amber rounded-full hover:bg-yellow-500 hover:text-black hover:transition-all duration-300 ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default MainButton;
