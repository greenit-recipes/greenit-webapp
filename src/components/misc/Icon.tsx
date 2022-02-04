import React from "react";
import {
  logo,
  ingredients1,
  ingredients2,
  ingredients3,
  ingredients4,
  ingredients5,
  ingredients6,
} from "../../icons";

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
    2: ingredients2,
    3: ingredients3,
    4: ingredients4,
    5: ingredients5,
    6: ingredients6,
    7: ingredients6,
    8: ingredients6,
    9: ingredients6,
    10: ingredients6,
    11: ingredients6,
    12: ingredients6,
    13: ingredients6,
    14: ingredients6,
    15: ingredients6,

    Rating: logo,
  };

  // pas d'icon pour le nb of ingredients
  const itemNbOfIngredients = types[nbOfIngredient as keyof typeof types];
  const itemDifficulty = types[difficulty as keyof typeof types];

  let child;
  child = (
    <div className="flex flex-cols w-full my-1">
      <div className="grid w-1/2 pl-4">
        <div className="grid grid-cols-2 justify-items-center justify-self-center ">
          <h3 className="text-sm lg:text-xl self-center -mr-3">
            {nbOfIngredient}
          </h3>
          <img
            alt="greenit logo"
            src={itemNbOfIngredients}
            className={`h-${height ?? 7} w-${width ?? 6} md:h-${height ?? 9} md:w-${width ?? 8} self-center pb-1`}
          />
        </div>
      </div>
      <div className="border-r-1 h-5 w-0 border-grey self-center"></div>
      <div className="grid w-1/2 pr-4 justify-items-center">
        <h3 className="text-sm lg:text-lg self-center">{difficulty}</h3>
      </div>
    </div>
  );

  return <div>{child}</div>;
};
