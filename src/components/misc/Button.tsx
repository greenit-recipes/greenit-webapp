import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonProps {
  type:
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "grey"
    | "red"
    | "blueL"
    | "darkBlue";
  id?: string;
  rounded?: string;
  className?: string;
  onClick?: () => void;
  haveIcon?: boolean;
  disabled?: boolean;
  href?: string;
  haveArrow?: boolean;
  isArrowDown?: boolean;
  isLoading?: boolean;
}

interface ButtonStyle {
  hoverBgColor: string;
  borderColor: string;
  borderRadius: string;
  textColor: string;
  hoverTextColor: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  rounded,
  className,
  children,
  haveIcon = false,
  id,
  onClick,
  haveArrow,
  isArrowDown,
  isLoading,
}) => {
  const style: ButtonStyle = {
    hoverBgColor: "",
    borderColor: "",
    textColor: "",
    borderRadius: "",
    hoverTextColor: "",
  };

  switch (type) {
    case "green":
      style.hoverBgColor = "bg-green";
      style.textColor = "text-white";
      style.borderColor = "border-green";
      style.hoverTextColor = "hover:text-green";
      break;
    case "yellow":
      style.hoverBgColor = "hover:bg-yellow";
      style.borderColor = "border-yellow";
      style.hoverTextColor = "text-yellow";
      break;
    case "orange":
      style.hoverBgColor = "hover:bg-orange";
      style.borderColor = "border-orange";
      style.hoverTextColor = "text-orange";
      break;
    case "darkBlue":
      style.hoverBgColor = "hover:bg-darkBlue";
      style.borderColor = "border-darkBlue";
      style.hoverTextColor = "text-darkBlue";
      break;
    case "grey":
      style.hoverBgColor = "hover:bg-grey";
      style.borderColor = "border-grey";
      style.hoverTextColor = "text-grey";
      break;
    case "red":
      style.hoverBgColor = "hover:bg-red";
      style.borderColor = "border-red";
      style.hoverTextColor = "text-red";
      break;
    case "blueL":
      style.hoverBgColor = "hover:bg-blueL";
      style.borderColor = "border-blueL";
      style.hoverTextColor = "text-blueL";
      break;
    default:
      style.hoverBgColor = "hover:bg-blue";
      style.borderColor = "border-blue";
      style.hoverTextColor = "text-blue";
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
      text-sm ${
        haveIcon ? "px-2 py-1" : "px-3 py-2 "
      } bold  border-2 border-transparent
      fontQSbold md:ease-linear transition-all duration-150
      ${style.hoverTextColor}
      hover:shadow-lg  ${
        type === "green"
          ? "hover:bg-white"
          : "bg-white hover:text-white active:bg-white"
      }
      ${style.borderColor}
      ${style.textColor}
      ${style.borderRadius}
      ${style.hoverBgColor}
        `}
      onClick={onClick}
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
