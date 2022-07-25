import { Link } from "react-router-dom";
import { RouteName } from "App";
import { Button } from "components";
import React from "react";
import { LDCIngredients } from "components/personalization/PersonalizationHelper";
import { SectionIngredient } from "../../recipe/SinglePage/IngredientUsentil/SectionIngredient";

interface TabLDCProps {
  hasLDC: boolean;
}

export const TabLDC: React.FC<TabLDCProps> = ({ hasLDC }) => {
  return (
    <div className="mx-10">
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
            {LDCIngredients.map((item: any, index: any) => (
              <div key={index}>
                <SectionIngredient data={item} />
              </div>
            ))}
            <div className="flex items-center mt-2">
              <p className="text-sm">
                Pour enlever un ingrédient, appuie dessus et clique sur{" "}
              </p>
              <i className="bx bx-cart-download text-3xl text-blue"></i>
            </div>
            <div className="flex flex-col items-center | mt-5">
              <Button className="px-4 py-2 mr-3 mb-4 shadow-md" type="green">
                Acheter maintenant
              </Button>
              <Button
                className="px-4 py-1 mr-3 mb-4 shadow-md"
                haveIcon={true}
                type="darkBlue"
              >
                <i className="bx bx-share text-2xl mt-0.5 mr-2 flipIcon"></i>
                Me l’envoyer
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mt-5 font-normal">Ta liste est vide !</p>
            <p className="mt-2 font-normal">
              Pour ajouter un ingrédient à ta liste de course, appuie sur le
              panier sur les ingrédients des recettes
            </p>
            <i className="bx bx-cart-download mt-2 text-3xl mb-6"></i>
            <Link to={RouteName.recipes}>
              <Button className="mb-4 shadow-md" type="darkBlue">
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
