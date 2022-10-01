import { RouteName } from "App";
import { Button } from "components";
import { getImagePath } from "helpers/image.helper";
import { visage } from "icons";
import React from "react";
import { Link } from "react-router-dom";
import { Url } from "url";

interface IngredientCard {
  id: string;
  isCTA?: boolean;
  keyID?: string;
  name?: string;
  price?: string;
  producer?: string;
  image?: any;
  filter?: string;
}

export const IngredientCard: React.FC<IngredientCard> = ({
  isCTA,
  keyID,
  name,
  price,
  producer,
  image,
  filter,
  id,
}) => {
  return (
    <div className="relative">
      {!isCTA ? (
        <>
          <Link
            to={{
              pathname: `${RouteName.market}/${id}`,
            }}
          >
            <div
              id={keyID}
              className="relative transform sm:hover:scale-105 ease-linear transition-all duration-150"
            >
              <div className="flex flex-col w-44 lg:w-48 gap-1">
                <div className="flex items-center h-36 w-44 lg:h-40 lg:w-48 rounded-md object-cover overflow-hidden">
                  <img
                    className="w-full object-cover shadow-flat"
                    src={getImagePath(image)}
                    alt="photo de l'ingredient"
                    loading="lazy"
                  />
                </div>
                <h4 className="leading-5 text-lg mt-1 lg:mt-2">{name}</h4>
                <p className="w-2/3 leading-4 text-sm">{producer}</p>
                <p className="font-medium text-lg">{price} €</p>
              </div>
            </div>
          </Link>
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
        </>
      ) : (
        <Link
          id={keyID}
          to={`${RouteName.market}${filter && "?" + filter}`}
          className="bg-white sm:hover:shadow-flat rounded-lg |
        transform sm:hover:scale-101 ease-linear transition-all duration-120"
        >
          <div className="grid w-44 lg:w-48 gap-1 justify-center content-center">
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
