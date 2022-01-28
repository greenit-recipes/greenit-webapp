import React from "react";
import { logo, facile, intermediaire, difficile, ingredients1, ingredients2, ingredients3, ingredients4, ingredients5, ingredients6 } from "../../icons";

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
    // difficulty
    Facile: facile,
    Intermediaire: intermediaire,
    Expert: difficile,

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
  const itemNbOfIngredeints = types[nbOfIngredient as keyof typeof types];
  const itemDifficulty = types[difficulty as keyof typeof types];

  let child;
    child = (
      <div className="grid grid-cols-2 justify-item-center lg:px-2 pb-1">
        <div className="span-col-1 flex flex-col items-center">
          <img
            src={itemDifficulty}
            className={`h-${height ?? 26} w-${width ?? 30}`}
          />
          <h1 className="py-1 text-xs lg:text-sm">{difficulty}</h1>
        </div>
        <div className="span-col-1 flex flex-col items-center">
          <img
            src={itemNbOfIngredeints}
            className={`h-${height ?? 26} w-${width ?? 30}`}
          />
          <h1 className="py-1 text-xs lg:text-sm">
            {nbOfIngredient} ingredients
          </h1>
        </div>
      </div>
    );

  return <div>{child}</div>;
};
