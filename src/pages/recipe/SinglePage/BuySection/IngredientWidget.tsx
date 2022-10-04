import { RouteName } from "App";
import { Button } from "components";
import Modal from "components/layout/Modal/Modal";
import { ModalMarketTest } from "components/layout/Modal/modalMarketTest";
import { getImagePath } from "helpers/image.helper";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface IngredientWidget {
  id: string;
  keyID?: string;
  name?: string;
  price?: string;
  producer?: string;
  image?: any;
  filter?: string;
}

export const IngredientWidget: React.FC<IngredientWidget> = ({
  keyID,
  name,
  price,
  producer,
  image,
  filter,
  id,
}) => {
  const [showModalMarket, setShowModalMarket] = useState(false);

  return (
    <>
      <div
        id={keyID}
        className="flex w-full lg:w-96 h-16 bg-white rounded-md gap-2 shadow-flat | transform sm:hover:scale-105 ease-linear transition-all duration-150"
      >
        <Link
          to={{
            pathname: `${RouteName.market}/${id}`,
          }}
          className="flex gap-2 w-full"
        >
          <div className="w-20 h-16">
            <img
              className="h-full object-cover rounded-md shadow-flat"
              src={getImagePath(image)}
              alt="photo de l'ingredient"
              loading="lazy"
            />
          </div>
          <div className="flex items-center h-full w-3/4">
            <div className="flex flex-col items-center">
              <h4 className="leading-4">{name}</h4>
              <div className="flex gap-2 items-center self-start">
                <p className="leading-4 text-sm">{producer}</p>
                <p>|</p>
                <p className="font-medium text-base">{price} €</p>
              </div>
            </div>
          </div>
        </Link>
        <Button
          id="ingredient-card-addToCart"
          type="darkBlueIcon"
          className="relative w-12 h-10 self-center mr-2"
          haveIcon={true}
          onClick={() => setShowModalMarket(true)}
        >
          <i className={`bx bx-cart-download text-darkBlue text-2xl`}></i>
          <i
            className={`bx bx-plus text-sm text-darkBlue absolute -top-0.5 right-0.5`}
          ></i>
        </Button>
      </div>

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
  );
};
