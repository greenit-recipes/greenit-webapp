import { IconNbrIngredient } from "components/misc/IconNbrIngredient";
import { useState } from "react";
import { SectionIngredient } from "./SectionIngredient";
import { SectionUstensil } from "./SectionUsentil";

interface IIngredientUsentil {
  recipe: any;
}

export const IngredientUsentil: React.FC<IIngredientUsentil> = ({ recipe }) => {
  /* 
    <div className="w-5/6">
        <h2 className="pb-1 text-xl md:text-2xl">Ustensiles</h2>
        {recipe?.utensils.map((item: any, index: number) => (
          <h3 className="text-lg md:text-xl pt-2" key={index}>
            {item.name}
          </h3>
        ))}
      </div>
    */

  const [isIngredientSelected, setIngredientSelected] = useState(true);

  return (
    <div className="flex items-center mt-14 mb-14">
      <div className="w-full">
        <div className={`flex ${ isIngredientSelected ? "ingredient-border": "ingredient-border-ustensil"}`}>
        
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
            <IconNbrIngredient nbOfIngredient={recipe?.numberOfIngredients} />
            <div className="text-xl ml-2">Ustensiles</div>
          </div>
        </div>

        {/* @ts-ignore*/}
        {/*recipe.ingredients.map((item, index) => (
          <h3 className="pt-2" key={index}>
            {item.amount} {item.name}
          </h3>
        ))*/}
        <div className={`${isIngredientSelected ? "" : "hidden"}`}>
          <SectionIngredient />
          <SectionIngredient />
          <SectionIngredient />
          <SectionIngredient />
          <SectionIngredient />
        </div>
        <div className={`${isIngredientSelected ? "hidden" : ""}`}>
          <SectionUstensil />
        </div>
      </div>
    </div>
  );
};
