import { IconNbrIngredient } from "components/misc/IconNbrIngredient";
import { useState } from "react";
import { SectionIngredient } from "./SectionIngredient";
import { SectionUstensil } from "./SectionUsentil";
import { GiForkKnifeSpoon } from "react-icons/gi";

interface IIngredientUsentil {
  recipe: any;
}

export const IngredientUsentil: React.FC<IIngredientUsentil> = ({ recipe }) => {
  const [isIngredientSelected, setIngredientSelected] = useState(true);

  return (
    <div className="flex items-center mt-14 mb-14">
      <div className="w-full">
        <div
          className={`flex ${
            isIngredientSelected
              ? "ingredient-border"
              : "ingredient-border-ustensil"
          }`}
        >
          <div
            className={`flex pb-1 cursor-pointer justify-center h-14 w-44 items-center ingredient-base ${
              isIngredientSelected
                ? "ingredient-shadow-btn is-selected-single-page"
                : ""
            } `}
            onClick={() => {
              setIngredientSelected(true);
            }}
          >
            <IconNbrIngredient nbOfIngredient={recipe?.numberOfIngredients} />
            <div className="text-xl ml-2">Ingredients</div>
          </div>
          <div
            className={`flex pb-1 cursor-pointer justify-center h-14 w-44 items-center ingredient-base-ustensil ${
              !isIngredientSelected
                ? "ingredient-shadow-btn is-selected-single-page-ustensil"
                : ""
            }`}
            onClick={() => {
              setIngredientSelected(false);
            }}
          >
            <GiForkKnifeSpoon/>
            <div className="text-xl ml-2">Ustensiles</div>
          </div>
        </div>
        
        <div className={`${isIngredientSelected ? "" : "hidden"}`}>
          {recipe.ingredients.map((item: any, index: any) => (
            <SectionIngredient data={item} key={index} />
          ))}
        </div>
        <div className={`${isIngredientSelected ? "hidden" : ""}`}>
          {recipe.utensils.map((item: any, index: any) => (
            <SectionUstensil data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
