import React from "react";

interface ButtonProps {
  type: "blue" | "green" | "yellow" | "orange" | "grey" | "red" | "submit";
  rounded?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
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
      className={`${className} flex justify-center items-center cursor-pointer
      px-3 py-1 bold text-white border-2 border-transparent
      text-sm md:text-base
      ease-linear transition-all duration-150
      bg-${type ? type : "blue"} 
      hover:shadow-lg hover:bg-white active:bg-white hover:border-${type ? type : "blue"
        } hover:text-${type ? type : "blue"} rounded-${rounded ? rounded : "md"
        } `}
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
