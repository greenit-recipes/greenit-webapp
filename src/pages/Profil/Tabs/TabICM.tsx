import SectionICM from "../../../components/personalization/sections/SectionICM";
import { Link } from "react-router-dom";
import { RouteName } from "App";
import { Button } from "components";
import ModalIngredientSearch from "components/personalization/ModalIngredientSearch";
import React from "react";

interface TabICMProps {
  hasICM: boolean;
  ingredientsAtHome?: any;
  parentFunction: any;
}

export const TabICM: React.FC<TabICMProps> = ({
  hasICM,
  ingredientsAtHome,
  parentFunction,
}) => {
  return (
    <div className="mx-7 mb-24">
      <div className="w-full flex flex-col items-center justify-center text-center | mb-2">
        <div className="w-full flex items-center justify-center space-x-2">
          <i className="bx bxs-lemon text-3xl text-blue"></i>
          <h2 className="text-xl font-semibold">Ingrédients chez moi</h2>
        </div>
        <span className="text-2xl font-diy">
          Avec les ingrédients chez toi, évite le gaspillage !
        </span>

        {hasICM ? (
          <div className="flex flex-col items-center mt-4 space-y-2">
            <SectionICM
              parentFunction={parentFunction}
              ingredientsAtHome={ingredientsAtHome}
            />
            <Link to={RouteName.recipes}>
              <Button
                className="mb-4 shadow-md"
                type="darkBlue"
                id="profil-ICMtab-acceder-recette"
              >
                Accéder aux recettes
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-2 font-normal">
              Ajoute les ingrédients que tu as déjà chez toi pour trouver des
              recettes adaptées !
            </p>
            <div className="self-start mt-4 w-20">
              <ModalIngredientSearch
                ingredientsAtHome={ingredientsAtHome}
                parentFunction={parentFunction}
                btn={
                  <div className="flex items-center justify-center w-20 h-20 md:w-20 md:h-20 | bg-white rounded-lg drop-shadow-md | mb-2">
                    <span
                      id="profil-ICMtab-ajouter-ingredient"
                      className="text-2xl font-semibold"
                    >
                      +
                    </span>
                  </div>
                }
              ></ModalIngredientSearch>
            </div>
            <div className="mt-9">
              <ModalIngredientSearch
                ingredientsAtHome={ingredientsAtHome}
                parentFunction={parentFunction}
                btn={
                  <div className="text-center mb-2">
                    <span
                      id="profil-ICMtab-modifier-ingredient"
                      className="underline font-medium cursor-pointer"
                    >
                      Modifier mes ingrédients
                    </span>
                  </div>
                }
              ></ModalIngredientSearch>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabICM;
