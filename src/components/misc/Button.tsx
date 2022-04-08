import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface ButtonProps {
  type: "blue" | "green" | "yellow" | "orange" | "grey" | "red" | "submit";
  id?: string;
  rounded?: string;
  className?: string;
  onClick?: () => void;
  onClickArrow?: (isArrowDown: boolean) => void;
  disabled?: boolean;
  href?: string;
  haveArrow?: boolean;
  isArrowDown?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  rounded,
  className,
  children,
  id,
  onClick,
  onClickArrow,
  haveArrow,
  isArrowDown,
}) => {
  return (
    <button
      id={id}
      className={`${className} flex justify-center items-center cursor-pointer
      px-3 py-1 bold text-white border-2 border-transparent
      text-sm md:
      ease-linear transition-all duration-150
      bg-${type ? type : "blue"} 
      hover:shadow-lg hover:bg-white active:bg-white hover:border-${
        type ? type : "blue"
      } hover:text-${type ? type : "blue"} rounded-${
        rounded ? rounded : "md"
      } `}
      onClick={() => {
        if (onClick) {
          onClick();
        } else if (onClickArrow) {
          // @ts-ignore
          onClickArrow(!isArrowDown);
        }
      }}
    >
      {children}
      {haveArrow && (
        <HiOutlineChevronDown
          className={`w-6 h-6 ml-2 cursor-pointer ${
            isArrowDown
              ? "section-arrow-up"
              : "section-arrow-down"
          }`}
        />
      )}
    </button>
  );
};
