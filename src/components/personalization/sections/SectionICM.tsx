import ModalIngredientSearch from "../ModalIngredientSearch";
import React from "react";
import { ICMingredients } from "../PersonalizationHelper";

export const SectionICM = () => {
  return (
    <div className="">
      <div className="flex flex-wrap space-x-1 md:space-x-6 mx-7 md:mx-36">
        {ICMingredients.map(ingredient => (
          <div className="flex flex-col items-center text-center space-y-1 | mb-2">
            <img
              src={ingredient.image}
              className="w-[60px] h-[60px] md:w-20 md:h-20 rounded-lg object-cover"
              alt={ingredient.alt}
            />
            <p className="text-xs font-normal w-24">{ingredient.name}</p>
          </div>
        ))}
        <ModalIngredientSearch
          btn={
            <div className="flex items-center justify-center w-[60px] h-[60px] md:w-20 md:h-20 | bg-white rounded-lg drop-shadow-md | mb-2">
              <span className="text-2xl font-semibold">+</span>
            </div>
          }
        ></ModalIngredientSearch>
      </div>
      <ModalIngredientSearch
        btn={
          <div className="text-center mb-2">
            <span className="underline font-medium cursor-pointer">
              Modifier mes ingrédients
            </span>
          </div>
        }
      ></ModalIngredientSearch>
    </div>
  );
};

export default SectionICM;
