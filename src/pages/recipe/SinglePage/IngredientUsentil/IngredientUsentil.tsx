import { IconNbrIngredient } from "components/misc/IconNbrIngredient";
import React, { useState } from "react";
import { SectionIngredient } from "./SectionIngredient";
import { SectionUstensil } from "./SectionUsentil";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { Button } from "../../../../components";
import { cloneDeep, max } from "lodash";
import { hasIngredientOnList } from "../../../../components/personalization/PersonalizationHelper";
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST } from "../SinglePage-helper";

interface IIngredientUsentil {
  recipe: any;
}

export const IngredientUsentil: React.FC<IIngredientUsentil> = ({ recipe }) => {
  const [isIngredientSelected, setIngredientSelected] = useState(true);
  const [isBulkLDCActive, setIsBulkLDCActive] = useState(
    recipe.ingredients.every((ingredient: any) =>
      //@ts-ignore
      hasIngredientOnList(window.me.ingredientShoppingListUser, ingredient.id),
    ),
  );
  let isICMactive = false;
  let isLDCactive = false;

  const [
    createOrDeleteIngredientShoppingList,
    { data: createOrDeleteLDCdata, loading: loadingLDC, error: errorLDC },
  ] = useMutation(ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST, {
    errorPolicy: "all",
  });

  const ingredientShoppingListOperations: any = {
    potentialAdditions: [],
    potentialDeletions: [],
  };

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
          {recipe.ingredients.map((item: any, index: any) => {
            isLDCactive = hasIngredientOnList(
              //@ts-ignore
              window.me.ingredientShoppingListUser,
              item.id,
            );
            isICMactive = hasIngredientOnList(
              //@ts-ignore
              window.me.ingredientAtHomeUser,
              item.id,
            );
            if (isLDCactive) {
              ingredientShoppingListOperations.potentialDeletions.push(item.id);
            } else {
              ingredientShoppingListOperations.potentialAdditions.push(item.id);
            }
            return (
              <div key={index}>
                <SectionIngredient
                  data={item}
                  isLDCactive={isLDCactive}
                  isICMactive={isICMactive}
                />
              </div>
            );
          })}
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
            id="recipepage-ingredientall-LDC"
            className={`px-4 mr-3 shadow-md ${
              isBulkLDCActive && "border-blue"
            } hover:text-blue active:border-blue active:bg-white`}
            haveIcon={true}
            type="darkBlueIcon"
            onClick={() => {
              const ingredientShoppingList = {
                additions: [],
                deletions: [],
              };
              if (!isBulkLDCActive) {
                ingredientShoppingList.additions =
                  ingredientShoppingListOperations.potentialAdditions;
              } else {
                ingredientShoppingList.deletions =
                  ingredientShoppingListOperations.potentialDeletions;
              }
              createOrDeleteIngredientShoppingList({
                variables: {
                  ingredientShoppingList,
                },
              });
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
