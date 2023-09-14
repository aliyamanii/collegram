import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const MainButton: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <button
      className={`py-2 px-4 text-sm font-medium text-white bg-[#c19008] rounded-full hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MainButton;
