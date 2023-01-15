import { RouteName } from "App";
import { Button } from "components";
import Modal from "components/layout/Modal/Modal";
import { ModalMarketTest } from "components/layout/Modal/modalMarketTest";
import { getImagePath } from "helpers/image.helper";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface IngredientCard {
  id?: string;
  isCTA?: boolean;
  keyID?: string;
  name: string;
  price: string;
  producer: string;
  image: any;
  filter?: string;
  rating?: string;
  isOnLandingPage?: boolean;
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
  rating,
  isOnLandingPage,
}) => {
  const [showModalMarket, setShowModalMarket] = useState(false);

  return (
    <div className="relative transform sm:hover:scale-105 ease-linear transition-all duration-150">
      {!isCTA ? (
        <>
          <Link
            to={{
              pathname: `${RouteName.market}/${id}`,
            }}
          >
            <button id={`ingredientCard-${name}`} className="relative">
              <div className="flex flex-col w-44 lg:w-52 gap-1">
                <div className="flex relative items-center h-36 w-44 lg:h-40 lg:w-52 rounded-md object-cover overflow-hidden">
                  <img
                    id={`ingredientCard-${name}`}
                    className="w-full object-cover rounded-md"
                    src={getImagePath(image)}
                    alt="photo de l'ingredient"
                    loading="lazy"
                  />
                  {isOnLandingPage && (
                    <div className="absolute bottom-0 right-0 items-center | bg-green text-white rounded-br-md rounded-tl-md px-3 py-2">
                      <span> ★ {rating}</span>
                    </div>
                  )}
                </div>
                <h4 className="text-left leading-5 text-lg mt-1 lg:mt-2">
                  {name}
                </h4>
                <p className="text-left w-2/3 leading-4 text-sm">{producer}</p>
                <p className="text-left font-medium text-lg">{price} €</p>
              </div>
            </button>
          </Link>
          <Button
            id="ingredientCard-addToCart"
            type="darkBlueIcon"
            className="absolute bottom-0 right-0 w-12 h-10"
            haveIcon={true}
            onClick={() => setShowModalMarket(true)}
          >
            <i
              className={`bx bx-cart-download text-darkBlue text-2xl`}
              id="ingredientCard-addToCart"
            ></i>
            <i
              className={`bx bx-plus text-sm text-darkBlue absolute -top-0.5 right-0.5`}
              id="ingredientCard-addToCart"
            ></i>
          </Button>
          <Modal
            isCenter={true}
            onClose={() => setShowModalMarket(false)}
            show={showModalMarket}
          >
            <div className="flex flex-col items-center p-4 text-center md:w-[800px]">
              <ModalMarketTest />
            </div>
          </Modal>
        </>
      ) : (
        <Link
          to={`${RouteName.listpagemarket}/${filter}`}
          className="bg-white sm:hover:shadow-flat rounded-lg |
        transform sm:hover:scale-101 ease-linear transition-all duration-120"
        >
          <div
            id={`ingredientCardCTA-${filter}`}
            className="grid h-full w-44 lg:w-52 gap-1 justify-center content-center"
          >
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
