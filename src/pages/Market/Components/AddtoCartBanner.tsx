import { Button } from "components";
import Modal from "components/layout/Modal/Modal";
import { ModalMarketTest } from "components/layout/Modal/modalMarketTest";
import React, { useState } from "react";

interface AddtoCartBanner {
  Formobile: boolean;
  price: any;
}

export const AddtoCartBanner: React.FC<AddtoCartBanner> = ({
  Formobile = true,
  price,
}) => {
  const [showModalMarket, setShowModalMarket] = useState(false);

  return (
    <>
      <Modal
        isCenter={true}
        onClose={() => setShowModalMarket(false)}
        show={showModalMarket}
      >
        <div className="flex flex-col items-center p-4 text-center md:w-[800px]">
          <ModalMarketTest />
        </div>
      </Modal>

      {!Formobile ? (
        <div className="grid grid-cols-2 gap-y-2 justify-center w-2/3 h-auto bg-yellowL rounded-md mt-4 p-4">
          <div className="flex flex-col col-span-2 items-center justify-center w-full">
            <h2>{price} €</h2>
            <p className="text-sm">Prix sans livraison</p>
          </div>
          <div className="flex gap-2 col-span-2 w-full">
            <div className="flex border-1 bg-white rounded-md w-16 items-center justify-center">
              <h4> 1</h4>
            </div>
            <Button
              id="ingredientPage-Ajouer-au-panier"
              className="w-full"
              type="darkBlue"
              onClick={() => setShowModalMarket(true)}
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 fixed bottom-0 w-full h-auto bg-yellowL rounded-md p-4 z-30">
          <div className="flex col-span-2 gap-2 items-center justify-center w-full">
            <h2>{price}€</h2>
            <p className="text-sm">Prix sans livraison</p>
          </div>
          <div className="flex gap-2 col-span-2 w-full">
            <div className="flex border-1 bg-white rounded-md w-16 items-center justify-center">
              <h4> 1</h4>
            </div>
            <Button
              id="ingredientPage-Ajouer-au-panier"
              className="w-full"
              type="darkBlue"
              onClick={() => setShowModalMarket(true)}
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
