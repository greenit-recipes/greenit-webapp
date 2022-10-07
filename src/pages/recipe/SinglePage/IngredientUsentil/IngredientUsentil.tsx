import React, { useEffect, useRef, useState } from "react";
import { SectionIngredient } from "./SectionIngredient";
import { SectionUstensil } from "./SectionUsentil";
import { Button } from "components";
import {
  getRandomKey,
  hasIngredientOnList,
} from "components/personalization/PersonalizationHelper";
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST } from "../SinglePage-helper";
import { cloneDeep } from "lodash";
import authService from "services/auth.service";
import ReactDOM from "react-dom";
import { NotificationAlert } from "components/layout/NotificationAlert";

interface IIngredientUsentil {
  recipe: any;
  ingredientShoppingList: any;
  ingredientAtHome: any;
  parentFunction?: any;
}

export const IngredientUsentil: React.FC<IIngredientUsentil> = ({
  recipe,
  ingredientShoppingList,
  ingredientAtHome,
  parentFunction,
}) => {
  const [isIngredientSelected, setIngredientSelected] = useState(true);
  const [isBulkLDCActive, setIsBulkLDCActive] = useState(
    recipe.ingredients.every((ingredient: any) => {
      return hasIngredientOnList(ingredientShoppingList, ingredient.id);
    }),
  );

  useEffect(() => {
    if (
      recipe.ingredients.every((ingredient: any) => {
        return hasIngredientOnList(ingredientShoppingList, ingredient.id);
      })
    ) {
      !isBulkLDCActive && setIsBulkLDCActive(true);
    } else {
      isBulkLDCActive && setIsBulkLDCActive(false);
    }
  }, [ingredientShoppingList]);

  let isICMactive = false;
  let isLDCactive = false;
  const isLoggedIn = authService.isLoggedIn();

  const [ingredientAtHomeCurrent, setIngredientAtHomeCurrent] = useState(
    cloneDeep(
      !isLoggedIn
        ? JSON.parse(
            // @ts-ignore
            localStorage.getItem("ingredientAtHome") || JSON.stringify([]),
          )
        : ingredientAtHome,
    ),
  );

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

  const [isLDCBulkAddedNotifActive, setIsLDCBulkAddedNotifActive] =
    useState(false);
  const [isLimitReachedNotifActive, setIsLimitReachedNotifActive] =
    useState(false);
  const [isLDCAccessNotifActive, setIsLDCAccessNotifActive] = useState(false);

  useEffect(() => {
    if (isLDCBulkAddedNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey("ldc-bulk-added")}
          type="success"
          title="Ajouté(s) aux ingrédients chez toi !"
          text="Retrouve ta liste dans ton profil."
        />,
        document.getElementById("notif"),
      );
      setIsLDCBulkAddedNotifActive(false);
    }
    if (isLimitReachedNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey("ingredient-limit-reached-recipe")}
          type="alert"
          title="Tu as beaucoup d’ingrédients chez toi ?"
          text="Crée-toi un compte pour en ajouter plus !"
        />,
        document.getElementById("notif"),
      );
      setIsLimitReachedNotifActive(false);
    }
    if (isLDCAccessNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey("ldc-bulk-access")}
          type="alert"
          title="Tu n’as pas accès à la liste de course."
          text="Crée-toi un compte pour ajouter à ta liste !"
        />,
        document.getElementById("notif"),
      );
      setIsLDCAccessNotifActive(false);
    }
  }, [
    isLDCBulkAddedNotifActive,
    isLimitReachedNotifActive,
    isLDCAccessNotifActive,
  ]);

  const updateIngredientAtHome = (ingredient: any) => {
    let newIngredient = [];
    if (!ingredientAtHomeCurrent.some((el: any) => el.id === ingredient.id)) {
      if (!isLoggedIn && ingredientAtHomeCurrent.length + 1 <= 2) {
        newIngredient = cloneDeep(ingredientAtHomeCurrent);
        newIngredient.push(ingredient);
        setIngredientAtHomeCurrent(newIngredient);
        localStorage.setItem("ingredientAtHome", JSON.stringify(newIngredient));
      } else {
        setIsLimitReachedNotifActive(true);
        return false;
      }
    } else {
      newIngredient = ingredientAtHomeCurrent.filter(
        (el: any) => el.id != ingredient.id,
      );
      setIngredientAtHomeCurrent(newIngredient);
      localStorage.setItem("ingredientAtHome", JSON.stringify(newIngredient));
    }
    return true;
  };

  return (
    <div className="flex items-center mt-12 mb-8">
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
          {
            //Todo : update bulk icon active
            recipe.ingredients.map((item: any, index: any) => {
              isLDCactive = hasIngredientOnList(
                ingredientShoppingList,
                item.id,
              );
              isICMactive = hasIngredientOnList(
                ingredientAtHomeCurrent,
                item.id,
              );
              if (isLDCactive) {
                ingredientShoppingListOperations.potentialDeletions.push(
                  item.id,
                );
              } else {
                ingredientShoppingListOperations.potentialAdditions.push(
                  item.id,
                );
              }
              return (
                <div key={index}>
                  <SectionIngredient
                    isIngredientListUserActive={true}
                    parentFunction={
                      isLoggedIn ? parentFunction : updateIngredientAtHome
                    }
                    data={item}
                    isLDCactive={isLDCactive}
                    isICMactive={isICMactive}
                  />
                </div>
              );
            })
          }
        </div>
        <div className={`${isIngredientSelected ? "hidden" : ""}`}>
          {recipe.utensils.map((item: any, index: any) => (
            <div key={index}>
              <SectionUstensil data={item} key={index} />
            </div>
          ))}
        </div>
        {/* Comment below just for the market test time */}
        {/*<div className="flex items-center justify-end space-x-2 md:space-x-4 | mt-5">
          <span className="text-sm font-normal">
            {isBulkLDCActive ? "Retirer tout de " : "Ajouter tout à "}ma liste
            de course
          </span>
          <Button
            id="recipepage-ingredientall-LDC"
            className={`relative px-4 mr-3 shadow-md ${
              isBulkLDCActive && "border-blue"
            } hover:text-blue active:border-blue active:bg-white`}
            haveIcon={true}
            type="darkBlueIcon"
            onClick={() => {
              if (isLoggedIn) {
                setIsBulkLDCActive(!isBulkLDCActive);
                !isBulkLDCActive &&
                  !isLDCBulkAddedNotifActive &&
                  setIsLDCBulkAddedNotifActive(true);
                const ingredientShoppingListCurrent = {
                  additions: [],
                  deletions: [],
                };
                if (!isBulkLDCActive) {
                  ingredientShoppingListCurrent.additions =
                    ingredientShoppingListOperations.potentialAdditions;
                } else {
                  ingredientShoppingListCurrent.deletions =
                    ingredientShoppingListOperations.potentialDeletions;
                }
                createOrDeleteIngredientShoppingList({
                  variables: {
                    ingredientShoppingList: ingredientShoppingListCurrent,
                  },
                }).then(() => {
                  parentFunction ? parentFunction() : null;
                });
              } else {
                setIsLDCAccessNotifActive(true);
              }
            }}
          >
            <i
              className={`bx bx-cart-download ${
                isBulkLDCActive ? "text-blue" : "text-darkBlue"
              }  text-2xl`}
            ></i>
            <i
              className={`bx ${
                isBulkLDCActive ? "bx-minus text-blue" : "bx-plus text-darkBlue"
              }
                   text-sm text-darkBlue absolute -top-0.5 right-0.5`}
            ></i>
          </Button>
            </div>*/}
      </div>
    </div>
  );
};
