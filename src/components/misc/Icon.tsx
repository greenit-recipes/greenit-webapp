import React from "react";
import { useState } from "react";
import { logo, débutant, ingredients } from "../../icons";
import { RecipeFragment } from "../../graphql";

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
    Facile: débutant,
    Intermediaire: débutant,
    Expert: débutant,

    //ingredients
    1: ingredients,
    2: ingredients,
    3: ingredients,

    Rating: logo,
  };

  // pas d'icon pour le nb of ingredients
  const itemNbOfIngredeints = types[nbOfIngredient as keyof typeof types];
  const itemDifficulty = types[difficulty as keyof typeof types];

  let child;
  if (difficulty) {
    child = (
      <div className="grid grid-cols-2 justify-item-center lg:px-4 pb-1">
        <div className="span-col-1 flex flex-col items-center">
          <img
            src={itemDifficulty}
            className={`h-${height ?? 26} w-${width ?? 30}`}
          />
          <h1 className="py-1 text-xs lg:text-base">{difficulty}</h1>
        </div>
        <div className="span-col-1 flex flex-col items-center">
          <img
            src={ingredients}
            className={`h-${height ?? 26} w-${width ?? 30}`}
          />
          <h1 className="py-1 text-xs lg:text-base">
            {nbOfIngredient} ingredients
          </h1>
        </div>
      </div>
    );
  } else {
    child = <p>0 ingredients</p>;
  }

  return <div>{child}</div>;
};
