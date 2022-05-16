import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import {BiLoaderAlt} from "react-icons/all";

interface ButtonProps {
  type: "blue" | "green" | "yellow" | "orange" | "grey" | "red" | "blueL";
  id?: string;
  rounded?: string;
  className?: string;
  onClick?: () => void;
  onClickArrow?: (isArrowDown: boolean) => void;
  disabled?: boolean;
  href?: string;
  haveArrow?: boolean;
  isArrowDown?: boolean;
  isLoading?: boolean
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
  isLoading,
}) => {
  return (
    <button
      id={id}
      disabled={isLoading}
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
      {isLoading ? <div className="animate-spin"><BiLoaderAlt/></div> : children}
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
