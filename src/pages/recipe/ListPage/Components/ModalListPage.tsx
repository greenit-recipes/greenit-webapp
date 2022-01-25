import React from "react";
import { Button } from "components/misc/Button";

interface IModalListPage {
  isShowModal: boolean;
  parentFunction: any;
}

export const ModalListPage: React.FC<IModalListPage> = (props) => {
  return (
    <>
      <Button
        className="ease-linear transition-all duration-150 mt-2 w-4/5 h-10 rounded"
        type="orange"
        onClick={() => props.parentFunction(true)}
      >
        Ajouter un filtre
      </Button>
      {props.isShowModal ? (
        <>
          <Button
            type="orange"
            className="justify-self-start fixed top-14 z-50 w-32 ml-4"
            onClick={() => props.parentFunction(false)}
          >
            Valider
          </Button>

          <div
            className="bg-blue items-center flex overflow-x-hidden 
            overflow-y-auto fixed inset-0 overscroll-contain pt-80 z-30 outline-none focus:outline-none pt-14"
          >
            <div className="flex bg-red">{props.children}</div>
          </div>
          <div className="grid justify-items-center fixed bottom-0 h-20 z-50 bg-white w-screen">
            <Button
              type="orange"
              className=" z-50 w-4/5 h-10 ml-4 self-center"
              onClick={() => props.parentFunction(false)}
            >
              Afficher les résultats
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};
