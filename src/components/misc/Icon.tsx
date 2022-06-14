import React from "react";

interface IconProps {
  text?: string;
  height?: number;
  width?: number;
  nbOfIngredient?: number | null | undefined;
  difficulty?: string;
}

export const Icon: React.FC<IconProps> = ({
  text,
  height,
  width,
  nbOfIngredient,
  difficulty,
}) => {
  return (
    <div className="flex w-full my-1 justify-center">
      <p className="mr-3">{nbOfIngredient} ingredients</p>
      <div className="self-center w-0 h-5 border-r border-grey"></div>
      <p className="ml-3">{difficulty}</p>
    </div>
  );
};
