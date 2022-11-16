import { Link } from "react-router-dom";
import { RouteName } from "App";
import { Button } from "components";
import React, { useState } from "react";
import {
  formatShoppingList,
  getRandomKey,
  hasIngredientOnList,
} from "components/personalization/PersonalizationHelper";
import useIsMobile from "../../../hooks/isMobile";
import { RWebShare } from "react-web-share";
import Modal from "components/layout/Modal/Modal";
import { ModalMarketTest } from "components/layout/Modal/modalMarketTest";
import { SectionIngredient } from "pages/recipe/SinglePage/IngredientUsentil/SectionIngredient";

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

  const [showModalMarket, setShowModalMarket] = useState(false);

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
                <div key={getRandomKey("section-ingredient")}>
                  <SectionIngredient
                    isIngredientListUserActive={true}
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
                  Pour enlever un ingrédient, clique dessus puis sur{" "}
                </p>
                <i className="bx bx-cart-download text-3xl text-blue"></i>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-3 items-center | mt-5">
              <Button
                className="h-10 w-full md:w-80"
                type="green"
                id="profil-LDCtab-acheter"
                onClick={() => {
                  window.open("https://www.joliessence.com/?ae=108");
                }}
              >
                <i className="bx bx-cart text-2xl mt-0.5 mr-2"></i>
                Acheter chez notre partenaire
              </Button>

              <RWebShare
                data={{
                  text: formatShoppingList(ingredientShoppingList),
                  url: "",
                  title: "Ma liste de course",
                }}
              >
                <Button
                  className="h-10 w-full md:w-80"
                  haveIcon={true}
                  type="darkBlue"
                  id="profil-LDCtab-envoyer"
                >
                  <i className="bx bx-mail-send text-2xl mt-0.5 mr-2"></i>
                  Recevoir ma liste de course
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
