import React from "react";

interface NavButtonProps {
  type: "blue" | "green" | "yellow" | "orange" | "grey" | "red";
  rounded?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  type,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${className} flex justify-center items-center cursor-pointer
        border-b-2 border-transparent px-5 pb-2 mt-2
        ease-linear transition-all duration-150
        font-medium text-base md:text-lg
        hover:border-${
          type ? type : "blue"
        } hover:text-${type ? type : "blue"}`}
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
