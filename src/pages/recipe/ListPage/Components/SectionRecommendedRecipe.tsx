import React from "react";
import ModalPersonalizationInfo from "components/personalization/ModalPersonalizationInfo";
import useIsMobile from "hooks/isMobile";
import { RecommendedRecipes } from "./RecommendedRecipes";

interface SectionRecommendedRecipeInteface {
  particularities: any;
  ingredientAtHome: any;
}

export const SectionRecommendedRecipe: React.FC<
  SectionRecommendedRecipeInteface
> = ({ particularities, ingredientAtHome }) => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-2">
      <div className="flex text-center justify-center space-x-2 md:mb-5">
        <h3 className="text-2xl font-normal">Recettes pour vous</h3>
        <ModalPersonalizationInfo
          btn={
            <i
              className="bx bx-info-circle hover:text-blue text-2xl mt-1 cursor-pointer"
              id="listpage-informations"
            ></i>
          }
        ></ModalPersonalizationInfo>
      </div>
      {isMobile ? (
        <div className="grid justify-center grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
          <RecommendedRecipes
            ingredientAtHome={ingredientAtHome}
            particularities={particularities}
            quantity={10}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center | py-1-4 px-8 mb-14">
          <div className="flex flex-wrap justify-center gap-y-10 gap-x-4">
            <RecommendedRecipes
              ingredientAtHome={ingredientAtHome}
              particularities={particularities}
              quantity={10}
            />
          </div>
        </div>
      )}
    </div>
  );
};
