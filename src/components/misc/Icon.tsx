import React from "react";

interface IconProps {
  text?: string;
  height?: number;
  width?: number;
  difficulty?: string;
  time?: number | string;
}

export const Icon: React.FC<IconProps> = ({
  text,
  height,
  width,
  time,
  difficulty,
}) => {
  return (
    <div className="flex gap-6 w-full justify-center mt-0.5">
      <div className="flex gap-1">
        <i className="bx bx-compass text-xl"></i>
        <p className="font-regular text-base">{difficulty}</p>
      </div>
      <div className="flex gap-1">
        <i className="bx bxs-hourglass text-xl"></i>
        <p className="font-regular text-base">{time} min</p>
      </div>
    </div>
  );
};
