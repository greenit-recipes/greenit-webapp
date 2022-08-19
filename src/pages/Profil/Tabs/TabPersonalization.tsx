import React from "react";
import SectionPersonalization from "components/personalization/sections/SectionPersonalization";
import ModalPersonalization from "components/personalization/ModalPersonalization";
import { Button } from "components";
import { ExploreMore } from "components/recipe/ExploreMore";
import { RecommendedRecipes } from "../../recipe/ListPage/Components/RecommendedRecipes";

interface TabPersonalizationProps {
  hasParticularities?: boolean;
  parentFunction: any;
  particularities: any;
  ingredientAtHome: any;
}

export const TabPersonalization: React.FC<TabPersonalizationProps> = ({
  hasParticularities = true,
  parentFunction,
  particularities,
  ingredientAtHome,
}) => {
  return (
    <div className="w-full mb-24">
      <div className="w-full flex flex-col items-center justify-center | mb-4">
        <div className="w-full flex items-center justify-center space-x-2">
          <i className="bx bxs-category-alt text-3xl text-green"></i>
          <h2 className="text-xl font-semibold">Mes préférences</h2>
        </div>
        <span className="text-2xl font-diy">
          Trouve les recettes qui te correspondent !
        </span>
      </div>

      <div className="w-full py-5 bg-greenL">
        {hasParticularities ? (
          <>
            <SectionPersonalization
              parentFunction={parentFunction}
              /*@ts-ignore*/
              particularities={JSON.parse(particularities)}
            />
          </>
        ) : (
          <div className="w-full flex flex-col items-center py-5 bg-greenL text-center space-y-4">
            <p className="mx-16">
              Indique tes particularités pour trouver des recettes
              personnalisées à tes besoins.
            </p>
            <ModalPersonalization
              parentFunction={parentFunction}
              btn={
                <Button
                  className="w-64 px-1"
                  haveIcon={true}
                  type="green"
                  id="profil-particularites-definir-particularites"
                >
                  <i className="bx bxs-category-alt text-2xl mt-0.5 mr-2"></i>
                  Définir mes particularités
                </Button>
              }
            ></ModalPersonalization>
          </div>
        )}
      </div>
      {hasParticularities && (
        <>
          <div className="w-full flex flex-col items-center justify-center | mt-6 mb-4">
            <div className="w-full flex items-center justify-center space-x-2">
              <i className="bx bxs-category-alt text-3xl text-green"></i>
              <h2 className="text-xl font-semibold">Sélection personnalisée</h2>
            </div>
            <span className="text-2xl font-diy">
              Des recettes spécialement adaptées !
            </span>
          </div>
          <div className="md:flex md:justify-center w-full pt-4 pl-4 msm:overflow-x-auto">
            <div className="flex w-max">
              <RecommendedRecipes
                particularities={particularities}
                ingredientAtHome={ingredientAtHome}
              />
              <ExploreMore id="profil-particularites-explorer" filter="/" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TabPersonalization;
