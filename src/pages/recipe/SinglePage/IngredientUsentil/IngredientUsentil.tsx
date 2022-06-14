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
    <div className="flex items-center mt-12 mb-12">
      <div className="w-full">
        <div className={`flex ${isIngredientSelected ? "" : ""}`}>
          <div
            className={`flex border-b-4 ${
              isIngredientSelected
                ? "border-blue shadow-btn-section"
                : "border-blueL"
            }  cursor-pointer justify-center h-12 w-64 items-center`}
            onClick={() => {
              setIngredientSelected(true);
            }}
          >
            <i className="bx bx-bowl-hot bx-sm"></i>
            <h4 className="ml-2">Ingrédients</h4>
          </div>
          <div
            className={`flex border-b-4 ${
              !isIngredientSelected
                ? "shadow-btn-section border-blue"
                : "border-blueL"
            } cursor-pointer justify-center h-12 w-64 items-center `}
            onClick={() => {
              setIngredientSelected(false);
            }}
          >
            <i className="bx bx-knife bx-sm"></i>
            <h4 className="ml-2">Ustensiles</h4>
          </div>
        </div>

        <div className={`${isIngredientSelected ? "" : "hidden"}`}>
          {recipe.ingredients.map((item: any, index: any) => (
            <div key={index}>
              <SectionIngredient data={item} />
            </div>
          ))}
        </div>
        <div className={`${isIngredientSelected ? "hidden" : ""}`}>
          {recipe.utensils.map((item: any, index: any) => (
            <div key={index}>
              <SectionUstensil data={item} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
