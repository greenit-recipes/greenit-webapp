import React from "react";
import { logo, ingredients1, ingredients2, ingredients3 } from "../../icons";

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
  const types = {
    //NbIngredients avec icons asssociés, à refacto

    1: ingredients1,
    2: ingredients1,
    3: ingredients2,
    4: ingredients2,
    5: ingredients3,
    6: ingredients3,
    7: ingredients3,
    8: ingredients3,
    9: ingredients3,
    10: ingredients3,
    11: ingredients3,
    12: ingredients3,
    13: ingredients3,
    14: ingredients3,
    15: ingredients3,

    Rating: logo,
  };

  // pas d'icon pour le nb of ingredients
  const itemNbOfIngredients = types[nbOfIngredient as keyof typeof types];
  const itemDifficulty = types[difficulty as keyof typeof types];

  let child;
  child = (
    <div className="flex w-full my-1 flex-cols">
      <div className="grid w-1/2 pl-4">
        <div className="grid grid-cols-2 justify-items-center justify-self-center ">
          <h3 className="self-center -mr-3 text-sm lg:text-xl">
            {nbOfIngredient}
          </h3>
          <img
            alt="greenit logo"
            src={itemNbOfIngredients}
            className={`h-${height ?? 7} w-${width ?? 6} lg:h-${
              height ?? 9
            } lg:w-${width ?? 8} self-center pb-1`}
          />
        </div>
      </div>
      <div className="self-center w-0 h-5 border-r border-grey"></div>
      <div className="grid w-1/2 pr-4 justify-items-center">
        <h3 className="self-center text-sm lg:text-lg">{difficulty}</h3>
      </div>
    </div>
  );

  return <div>{child}</div>;
};
