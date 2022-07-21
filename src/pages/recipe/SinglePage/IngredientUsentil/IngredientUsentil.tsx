import { IconNbrIngredient } from "components/misc/IconNbrIngredient";
import React, { useState } from "react";
import { SectionIngredient } from "./SectionIngredient";
import { SectionUstensil } from "./SectionUsentil";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { Button } from "../../../../components";

interface IIngredientUsentil {
  recipe: any;
}

export const IngredientUsentil: React.FC<IIngredientUsentil> = ({ recipe }) => {
  const [isIngredientSelected, setIngredientSelected] = useState(true);
  const [isBulkLDCActive, setIsBulkLDCActive] = useState(false);

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
        <div className="flex items-center justify-end space-x-2 md:space-x-4 | mt-5">
          <span className="text-sm font-normal">
            {isBulkLDCActive ? "Retirer tout de " : "Ajouter tout à "}ma liste
            de course
          </span>
          <Button
            className={`px-4 mr-3 shadow-md ${
              isBulkLDCActive && "border-blue"
            } hover:text-blue active:border-blue active:bg-white`}
            haveIcon={true}
            type="darkBlueIcon"
            onClick={() => {
              setIsBulkLDCActive(!isBulkLDCActive);
            }}
          >
            <i
              className={`bx bx-cart-download ${
                isBulkLDCActive ? "text-blue" : "text-darkBlue"
              }  text-2xl`}
            ></i>
          </Button>
        </div>
      </div>
    </div>
  );
};
