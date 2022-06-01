import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";

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
  isLoading?: boolean;
}

interface ButtonStyle {
  bgColor: string;
  hoverBorderColor: string;
  hoverTextColor: string;
  borderRadius: string;
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
  const style: ButtonStyle = {
    bgColor: "",
    hoverBorderColor: "",
    hoverTextColor: "",
    borderRadius: "",
  };

  switch (type) {
    case "green":
      style.bgColor = "bg-green";
      style.hoverBorderColor = "hover:border-green";
      style.hoverTextColor = "hover:text-green";
      break;
    case "yellow":
      style.bgColor = "bg-yellow";
      style.hoverBorderColor = "hover:border-yellow";
      style.hoverTextColor = "hover:text-yellow";
      break;
    case "orange":
      style.bgColor = "bg-orange";
      style.hoverBorderColor = "hover:border-orange";
      style.hoverTextColor = "hover:text-orange";
      break;
    case "grey":
      style.bgColor = "bg-grey";
      style.hoverBorderColor = "hover:border-grey";
      style.hoverTextColor = "hover:text-grey";
      break;
    case "red":
      style.bgColor = "bg-red";
      style.hoverBorderColor = "hover:border-red";
      style.hoverTextColor = "hover:text-red";
      break;
    case "blueL":
      style.bgColor = "bg-blueL";
      style.hoverBorderColor = "hover:border-blueL";
      style.hoverTextColor = "hover:text-blueL";
      break;
    default:
      style.bgColor = "bg-blue";
      style.hoverBorderColor = "hover:border-blue";
      style.hoverTextColor = "hover:text-blue";
  }
  switch (rounded) {
    case "lg":
      style.borderRadius = "rounded-lg";
      break;
    default:
      style.borderRadius = "rounded-md";
  }

  return (
    <button
      id={id}
      disabled={isLoading}
      className={`${className} flex justify-center items-center cursor-pointer
      px-3 py-1 bold text-white border-2 border-transparent
      text-sm md:
      ease-linear transition-all duration-150
      ${style.bgColor}
      hover:shadow-lg hover:bg-white active:bg-white
      ${style.hoverBorderColor}
      ${style.hoverTextColor}
      ${style.borderRadius}
        `}
      onClick={() => {
        if (onClick) {
          onClick();
        } else if (onClickArrow) {
          // @ts-ignore
          onClickArrow(!isArrowDown);
        }
      }}
    >
      {isLoading ? (
        <div className="animate-spin">
          <BiLoaderAlt />
        </div>
      ) : (
        children
      )}
      {haveArrow && (
        <HiOutlineChevronDown
          className={`w-6 h-6 ml-2 cursor-pointer ${
            isArrowDown ? "section-arrow-up" : "section-arrow-down"
          }`}
        />
      )}
    </button>
  );
};
