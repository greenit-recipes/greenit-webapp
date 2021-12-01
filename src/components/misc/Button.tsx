import React from "react";

interface ButtonProps {
  type: "blue" | "green" | "yellow" | "orange" | "submit";
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
      p-3 h-12 text-base md:text-lg bold text-white border-2 border-transparent
      bg-${type ? type: "blue"} 
      hover:bg-white hover:border-${
        type ? type : "blue"
      } hover:text-${type ? type : "blue"} rounded-${
        rounded ? rounded : "lg"
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
