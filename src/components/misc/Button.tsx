import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonProps {
  type:
    | "none"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "grey"
    | "red"
    | "blueL"
    | "darkBlue"
    | "darkBlueIcon"
    | "blueIcon"
    | "FavoritedarkBlueIcon";
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
  isSelected?: boolean;
  isOnClickActive?: boolean;
}

interface ButtonStyle {
  hoverBgColor: string;
  borderColor: string;
  borderRadius: string;
  textColor: string;
  hoverTextColor: string;
  bgColor: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  rounded,
  className,
  children,
  haveIcon = false,
  id,
  onClick,
  isOnClickActive = false,
  haveArrow,
  isArrowDown,
  isLoading,
  isSelected = false,
}) => {
  const style: ButtonStyle = {
    hoverBgColor: "",
    borderColor: "",
    textColor: "",
    borderRadius: "",
    hoverTextColor: "",
    bgColor: "",
  };

  switch (type) {
    case "green":
      style.hoverBgColor = "bg-green";
      style.textColor = "text-white";
      style.borderColor = "border-green";
      style.hoverTextColor = "hover:text-green";
      style.bgColor = "bg-white";
      break;
    case "yellow":
      style.hoverBgColor = "hover:bg-yellow";
      style.borderColor = "border-yellow";
      style.hoverTextColor = "hover:text-white";
      style.bgColor = "bg-yellow";
      style.textColor = "text-yello";
      break;
    case "orange":
      style.hoverBgColor = "hover:bg-orange";
      style.borderColor = "border-orange";
      style.hoverTextColor = "hover:text-white";
      style.bgColor = "bg-orange";
      style.textColor = "text-orange";
      break;
    case "darkBlue":
      style.hoverBgColor = "hover:bg-darkBlue";
      style.bgColor = "bg-darkBlue";
      style.borderColor = "border-darkBlue";
      style.hoverTextColor = "hover:text-white";
      style.textColor = "text-darkBlue";
      break;
    case "darkBlueIcon":
      style.hoverBgColor = "hover:bg-white";
      style.borderColor = "border-darkBlue";
      style.hoverTextColor = "hover:text-white";
      style.textColor = "text-darkBlue";
      style.bgColor = "bg-white";
      break;
    case "FavoritedarkBlueIcon":
      style.hoverBgColor = "hover:bg-white";
      style.borderColor = "border-darkBlue";
      style.hoverTextColor = "hover:text-blue hover:border-blue";
      style.textColor = "text-darkBlue";
      style.bgColor = "bg-white";
      break;
    case "grey":
      style.hoverBgColor = "hover:bg-grey";
      style.borderColor = "border-grey";
      style.hoverTextColor = "hover:text-white";
      style.bgColor = "bg-grey";
      style.textColor = "text-grey";
      break;
    case "red":
      style.hoverBgColor = "hover:bg-red";
      style.borderColor = "border-red";
      style.hoverTextColor = "hover:text-white";
      style.bgColor = "bg-red";
      style.textColor = "text-red";
      break;
    case "blueL":
      style.hoverBgColor = "hover:bg-blueL";
      style.borderColor = "border-blueL";
      style.hoverTextColor = "hover:text-white";
      style.textColor = "text-blueL";
      style.bgColor = "bg-blueL";
      break;
    case "blueIcon":
      style.hoverBgColor = "hover:bg-white";
      style.borderColor = "border-blue";
      style.hoverTextColor = "hover:text-darkBlue";
      style.textColor = "text-blue";
      style.bgColor = "bg-white";
      break;
    case "blue":
      style.hoverBgColor = "hover:bg-blue";
      style.borderColor = "border-blue";
      style.hoverTextColor = "hover:text-white";
      style.textColor = "text-blue";
      style.bgColor = "bg-blue";
      break;
    default:
      style.hoverBgColor = "hover:bg-blue";
      style.borderColor = "border-blue";
      style.hoverTextColor = "hover:text-white";
      style.textColor = "text-blue";
      style.bgColor = "bg-blue";
  }

  switch (rounded) {
    case "lg":
      style.borderRadius = "rounded-lg";
      break;
    default:
      style.borderRadius = "rounded-md";
  }

  const [isClicked, setIsClicked] = useState(isSelected);

  return (
    <button
      id={id}
      disabled={isLoading}
      className={`${className} flex justify-center items-center cursor-pointer
      text-sm ${
        haveIcon ? "px-3 py-0.5" : "px-3 py-2 "
      } bold  border-2 border-transparent
      fontQSbold md:ease-linear transition-all duration-150
      hover:shadow-lg  ${
        type === "green"
          ? "hover:bg-white " + style.hoverTextColor
          : "bg-white " + style.hoverTextColor + " active:bg-white"
      }
      ${style.borderColor}
      ${style.borderRadius}
      ${style.hoverBgColor}
      ${
        isClicked
          ? (type !== "green" ? "text-white " : "text-green ") + style.bgColor
          : style.textColor
      }
        `}
      onClick={() => {
        isOnClickActive && setIsClicked(!isClicked);
        onClick ? onClick() : null;
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
