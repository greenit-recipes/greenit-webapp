import React from "react";
import { ingredients1, ingredients2, ingredients3 } from "../../icons";

interface IIconNbrIngredient {
  nbOfIngredient: number;
  customClass?: string;
}

export const IconNbrIngredient: React.FC<IIconNbrIngredient> = ({
  nbOfIngredient,
  customClass,
}) => {
  let itemNbOfIngredients = "";

  if (nbOfIngredient > 0 && nbOfIngredient <= 2) {
    itemNbOfIngredients = ingredients1;
  } else if (nbOfIngredient >= 3 && nbOfIngredient <= 4) {
    itemNbOfIngredients = ingredients2;
  } else itemNbOfIngredients = ingredients3;

  return (
    <img
      alt="Nombre d'ingredient"
      src={itemNbOfIngredients}
      className={`self-center pb-1 h-9 w-8 ${customClass}`}
    />
  );
};
