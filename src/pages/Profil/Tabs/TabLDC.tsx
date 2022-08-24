import { Link } from "react-router-dom";
import { RouteName } from "App";
import { Button } from "components";
import React from "react";
import {
  formatShoppingList,
  hasIngredientOnList,
  LDCIngredients,
} from "components/personalization/PersonalizationHelper";
import { SectionIngredient } from "../../recipe/SinglePage/IngredientUsentil/SectionIngredient";
import useIsMobile from "../../../hooks/isMobile";
import { ModalShoppingListPurchase } from "../ModalShoppingListPurchase";
import { RWebShare } from "react-web-share";

interface TabLDCProps {
  hasLDC: boolean;
  ingredientShoppingList?: any;
  user: any;
  parentFunction: any;
}

export const TabLDC: React.FC<TabLDCProps> = ({
  hasLDC,
  user,
  ingredientShoppingList,
  parentFunction,
}) => {
  let isICMactive = false;
  let isLDCactive = false;

  const isMobile = useIsMobile();

  return (
    <div className="mx-10 md:mx-56">
      <div className="w-full flex flex-col items-center justify-center | mb-2">
        <div className="text-center mb-2">
          <div className="w-full flex items-center justify-center space-x-2">
            <i className="bx bx-cart-download text-3xl text-blue"></i>
            <h2 className="text-xl font-semibold">Liste de course</h2>
          </div>
          <span className="text-2xl font-diy">
            Ajoute les ingrédients à ta liste de course depuis la recette !
          </span>
        </div>
        {hasLDC ? (
          <div>
            {ingredientShoppingList.map((item: any, index: any) => {
              isLDCactive = hasIngredientOnList(
                user.ingredientShoppingListUser,
                item.id,
              );
              isICMactive = hasIngredientOnList(
                user.ingredientAtHomeUser,
                item.id,
              );

              return (
                <div key={index}>
                  <SectionIngredient
                    parentFunction={parentFunction}
                    data={item}
                    isLDCactive={isLDCactive}
                    isICMactive={isICMactive}
                  />
                </div>
              );
            })}
            {isMobile && (
              <div className="flex items-center mt-2">
                <p className="text-sm">
                  Pour enlever un ingrédient, appuie dessus et clique sur{" "}
                </p>
                <i className="bx bx-cart-download text-3xl text-blue"></i>
              </div>
            )}
            <div className="flex flex-col items-center | mt-5">
              <ModalShoppingListPurchase
                btn={
                  <Button
                    className="px-4 py-2 mr-3 mb-4 shadow-md"
                    type="green"
                    id="profil-LDCtab-acheter"
                  >
                    Acheter maintenant
                  </Button>
                }
              />

              <RWebShare
                data={{
                  text: formatShoppingList(ingredientShoppingList),
                  url: "",
                  title: "Ma liste de course",
                }}
              >
                <Button
                  className="px-4 py-1 mr-3 mb-4 shadow-md"
                  haveIcon={true}
                  type="darkBlue"
                  id="profil-LDCtab-envoyer"
                >
                  <i className="bx bx-share text-2xl mt-0.5 mr-2 flipIcon"></i>
                  Me l’envoyer
                </Button>
              </RWebShare>
            </div>
          </div>
        ) : (
          <div className="text-center ">
            <p className="mt-5 font-normal">Ta liste est vide !</p>
            <p className="mt-2 font-normal">
              Pour ajouter un ingrédient à ta liste de course, appuie sur le
              panier sur les ingrédients des recettes
            </p>
            <i className="bx bx-cart-download mt-2 text-3xl mb-6"></i>
            <Link to={RouteName.recipes} className="grid">
              <Button
                className="mb-4 shadow-md justify-self-center"
                type="darkBlue"
                id="profil-LDCtab-explorer-recette"
              >
                Explorer les recettes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabLDC;
