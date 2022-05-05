import useIsMobile from "hooks/isMobile";
import {
  ingredientBeginner,
  ustensilsAlreadyHaveBeginner,
  ustensilsBeginner,
} from "pages/GreenitFullXp/FullXpHelper";
import { SectionIngredient } from "pages/recipe/SinglePage/IngredientUsentil/SectionIngredient";
import { SectionUstensil } from "pages/recipe/SinglePage/IngredientUsentil/SectionUsentil";
import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

const list = (
  <div className="ml-10 lg:ml-0 lg:mt-36">
    <div className="mt-4">
      <p className="mt-1">🌱 Qualité certifiée</p>
      <p className="mt-1">🚜 Ingrédients issus de l’agriculture biologique</p>
      <p className="mt-1">✋ Pas de gâchis ni de stock d’ingrédients</p>
      <p className="mt-1">🌍 Contenants en verre 100% réutilisables</p>
    </div>
  </div>
);

const IngredientUsentilFullXp = () => {
  const isMobile = useIsMobile();
  const [isArrowDown, setArrowDown] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row  justify-around mt-0 lg:mt-20">
      <div className="w-full lg:w-2/5">
        <div className="flex flex-col mb-6">
          <div className="ml-10 lg:ml-0">
            {" "}
            <h1 className="text-2xl font-medium">Ingrédients et ustensiles</h1>
          </div>
          {isMobile && list}
        </div>
        <div className="flex justify-center flex-col w-full rounded-none lg:rounded-2xl bg-greenL p-5">
          <p className="text-xl fontQSemibold text-center lg:text-left mt-2">
            Inclus dans la box
          </p>
          <p className="text-xs lg:text-sm mt-4">Tous les ingrédients</p>
          <div
            className={`flex items-center btn-single-page ingredient-shadow h-11 mt-4 ${
              !isMobile ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              if (!isMobile) setArrowDown(!isArrowDown);
            }}
          >
            <div className="w-4/6 ml-14"> 12 ingrédients dans la box </div>
            <div className="w-1/6">
              <div className="flex items-center justify-end w-full">
                <HiOutlineChevronDown
                  className={`w-6 h-6  mr-6 cursor-pointer ${
                    isArrowDown ? "section-arrow-up" : "section-arrow-down"
                  }`}
                  onClick={() => {
                    setArrowDown(!isArrowDown);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={!isArrowDown ? "fadeIn-arrow" : " fadeOut-arrow"}>
            {ingredientBeginner.map((item: any, index: any) => (
              <SectionIngredient data={item} />
            ))}
          </div>

          <p className="text-xs lg:text-sm mt-4">Ustensiles</p>
          {ustensilsBeginner.map((item: any, index: any) => (
            <SectionUstensil data={item} />
          ))}
        </div>
        <div className="flex justify-center flex-col w-full p-5">
          <p className="text-xl fontQSemibold text-center lg:text-left mt-6">
            À trouver chez toi !
          </p>
          {ustensilsAlreadyHaveBeginner.map((item: any, index: any) => (
            <SectionUstensil data={item} />
          ))}
        </div>
      </div>
      {!isMobile && list}
    </div>
  );
};

export default IngredientUsentilFullXp;
