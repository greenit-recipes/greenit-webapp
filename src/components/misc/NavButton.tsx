import React from "react";

interface NavButtonProps {
  type:
    | "black"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "grey"
    | "red"
    | "darkBlue";
  rounded?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  id?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  type,
  id,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      id={id}
      className={`${className} flex justify-center items-center cursor-pointer
        border-b-2 border-transparent px-5 pb-2 mt-2
        ease-linear transition-all duration-150 z-100
        arrow-img fontQSmedium darkBlue`}
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
