import React from "react";

interface ButtonProps {
  type: "blue" | "green" | "yellow" | "orange" | "grey" | "submit";
  rounded?: string;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  rounded,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      className={`flex justify-center items-center cursor-pointer
      p-3 h-10 bold text-white border-2 border-transparent
      text-sm md:text-base
      ease-linear transition-all duration-150
      bg-${type ? type: "blue"} 
      hover:shadow-lg hover:bg-white active:bg-white hover:border-${
        type ? type : "blue"
      } hover:text-${type ? type : "blue"} rounded-${
        rounded ? rounded : "md"
      } ${className}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};