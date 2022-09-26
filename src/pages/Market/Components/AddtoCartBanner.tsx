import { Button } from "components";
import React from "react";

interface AddtoCartBanner {
  Formobile: boolean;
}

export const AddtoCartBanner: React.FC<AddtoCartBanner> = ({
  Formobile = true,
}) => {
  return (
    <>
      {!Formobile ? (
        <div className="grid grid-cols-2 gap-y-2 justify-center w-2/3 h-auto bg-yellowL rounded-md mt-4 p-4">
          <div className="flex flex-col items-center">
            <h3>4,60 €</h3>
            <p>Prix non-adhérent</p>
          </div>
          <div className="flex flex-col items-center">
            <h3>3,90 €</h3>
            <p className="font-medium text-yellow">Prix adhérent</p>
          </div>
          <div className="flex gap-2 col-span-2 w-full">
            <div className="flex border-1 bg-white rounded-md w-16 items-center justify-center">
              <h4> 1</h4>
            </div>
            <Button className="w-full" type="darkBlue">
              Ajouter au panier
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 fixed  bottom-0 w-full h-auto bg-yellowL rounded-md p-4">
          <div className="flex gap-2 items-center">
            <h2>4,60 €</h2>
            <p className="text-sm">Prix non-adhérent</p>
          </div>
          <div className="flex gap-2 items-center">
            <h2>3,90 €</h2>
            <p className="font-medium text-yellow text-sm">Prix adhérent</p>
          </div>
          <div className="flex gap-2 col-span-2 w-full">
            <div className="flex border-1 bg-white rounded-md w-16 items-center justify-center">
              <h4> 1</h4>
            </div>
            <Button className="w-full" type="darkBlue">
              Ajouter au panier
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
