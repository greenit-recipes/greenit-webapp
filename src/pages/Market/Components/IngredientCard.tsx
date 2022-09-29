import { RouteName } from "App";
import { Button } from "components";
import { getImagePath } from "helpers/image.helper";
import { visage } from "icons";
import React from "react";
import { Link } from "react-router-dom";
import { Url } from "url";

interface IngredientCard {
  isCTA?: boolean;
  keyID: string;
  name: string;
  price: string;
  producer: string;
  image: any;
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
}) => {
  return (
    <div>
      {!isCTA ? (
        <Link
          to={{
            pathname: `${RouteName.market}/${name}`,
          }}
        >
          <div
            id={keyID}
            className="relative transform sm:hover:scale-105 ease-linear transition-all duration-150"
          >
            <div className="flex flex-col">
              <div className="flex items-center h-36 w-48 lg:h-40 lg:w-562 rounded object-cover overflow-hidden">
                <img
                  className="w-full object-cover"
                  src={getImagePath(image)}
                  alt="photo de l'ingredient"
                  loading="lazy"
                />
              </div>
              <h4 className="leading-5 mt-2">{name}</h4>
              <p className="w-2/3 leading-5 text-sm">{producer}</p>
              <p>{price} €</p>
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
          </div>
        </Link>
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
