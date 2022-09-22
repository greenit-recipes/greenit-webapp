import { RouteName } from "App";
import { Button } from "components";
import { visage } from "icons";
import React from "react";
import { Link } from "react-router-dom";

interface IngredientCard {
  isToltipActif?: boolean;
  isCTA?: boolean;
  filter?: string;
  keyID: string;
}

export const IngredientCard: React.FC<IngredientCard> = ({
  isCTA,
  keyID,
  isToltipActif,
  filter,
}) => {
  return (
    <div
      id={keyID}
      className="flex flex-col gap-1 | h-56 w-44 md:h-60 md:w-48 | transform sm:hover:scale-105 ease-linear transition-all duration-150"
    >
      {!isCTA ? (
        <>
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex items-center h-36 w-48 rounded object-cover overflow-hidden">
              <img
                className="object-cover"
                src={visage}
                alt="img-ingredient"
                loading="lazy"
              />
            </div>
            <h4>Huile végétale d’avocat BIO</h4>
            <p>Mycosmetik</p>
            <h4>4,60 €</h4>
            <Button
              id="ingredient-card-addToCart"
              type="darkBlueIcon"
              className="absolute bottom-0 right-0 w-12 h-10"
              haveIcon={true}
            >
              <i className={`bx bx-cart-download text-darkBlue text-2xl`}></i>
              <i
                className={`bx bx-plus text-sm text-darkBlue absolute -top-0.5 right-0.5`}
              ></i>
            </Button>
          </div>
        </>
      ) : (
        <Link
          id={keyID}
          to={`${RouteName.market}${filter && "?" + filter}`}
          className="w-full h-full bg-white sm:hover:shadow-flat rounded-lg |
        transform sm:hover:scale-101 ease-linear transition-all duration-120"
        >
          <div className="grid w-full h-full justify-center content-center">
            <div className="flex flex-col h-20 justify-center">
              <i className="text-5xl bx bx-right-arrow-alt text-center mr-2"></i>
              <p className="text-md font-medium text-center">Explorer plus</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
