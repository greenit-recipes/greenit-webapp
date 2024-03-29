import React from "react";

interface ButtonProps {
  type: "primary" | "secondary" | "info" | "success" | "orange";
  rounded?: string;
  className?: string;
  onClick? : () => void;

}

const BUTTON_COLOURS = {
  primary: "#95cdfb",
  secondary: "",
  info: "",
  success: "#bae893",
  orange: "#fec4b0"
};
export const Button: React.FC<ButtonProps> = ({
  type,
  rounded,
  className,
  children,
  onClick
}) => {
  return (
    <div
      style={{
        backgroundColor: BUTTON_COLOURS[type],
      }}
      className={`flex justify-center items-center rounded-${rounded} text-white ${className}`}
      onClick={() => {
        if (onClick){
          onClick()
        }
      }}
    >
      {children}
    </div>
  );
};
