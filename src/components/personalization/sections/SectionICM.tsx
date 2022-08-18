import ModalIngredientSearch from "../ModalIngredientSearch";
import React from "react";
import { ICMingredients } from "../PersonalizationHelper";
import { getImagePath } from "../../../helpers/image.helper";

interface SectionICMProps {
  spacing?: string;
  ingredientsAtHome?: any;
}

export const SectionICM: React.FC<SectionICMProps> = ({
  spacing,
  ingredientsAtHome,
}) => {
  return (
    <div className="">
      <div className={`flex flex-wrap md:mx-36 ${spacing}`}>
        {ingredientsAtHome.map((ingredient: any) => (
          <div className="flex flex-col items-center text-center space-y-1 | md:mr-7 mb-2">
            <img
              src={getImagePath(ingredient.image)}
              className="w-[77px] h-[76px] md:w-20 md:h-20 rounded-lg object-cover"
              alt={ingredient.name}
            />
            <p className="text-sm font-normal w-24 leading-4">
              {ingredient.name}
            </p>
          </div>
        ))}
        <div className="ml-2">
          <ModalIngredientSearch
            btn={
              <div
                className="flex items-center justify-center w-[77px] h-[76px] md:w-20 md:h-20 | bg-white rounded-lg drop-shadow-md | mb-2"
                id="listpage-ingredientchezmoi-ajouter"
              >
                <span className="text-2xl font-semibold">+</span>
              </div>
            }
          ></ModalIngredientSearch>
        </div>
      </div>
      <ModalIngredientSearch
        btn={
          <div className="text-center mb-2">
            <span
              className="underline font-medium cursor-pointer"
              id="listpage-ingredientchezmoi-modifier"
            >
              Modifier mes ingrédients
            </span>
          </div>
        }
      ></ModalIngredientSearch>
    </div>
  );
};

export default SectionICM;
