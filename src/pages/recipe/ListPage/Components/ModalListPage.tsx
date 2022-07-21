import React from "react";
import { Button } from "components/misc/Button";

interface IModalListPage {
  isShowModal: boolean;
  parentFunction: any;
  nbrFilter: any;
}

export const ModalListPage: React.FC<IModalListPage> = props => {
  return (
    <>
      <div
        className="flex items-center text-center mt-2 space-x-2 | font-medium"
        onClick={() => props.parentFunction(true)}
      >
        <i className="bx bx-filter-alt text-xl"></i>
        <div className="underline">
          {props.nbrFilter === 0 ? (
            <span>Ajouter des filtres</span>
          ) : (
            <span>
              {" "}
              Filtre{props.nbrFilter > 1 ? "s" : ""} ({props.nbrFilter}){" "}
            </span>
          )}
        </div>
      </div>
      {props.isShowModal ? (
        <>
          <Button
            type="green"
            className="justify-self-start fixed top-14 z-40 w-32 ml-4"
            onClick={() => props.parentFunction(false)}
          >
            Valider
          </Button>

          <div
            className="bg-white overflow-x-hidden
            overflow-y-auto fixed inset-0 overscroll-contain z-30 outline-none focus:outline-none"
          >
            <div className="absolute w-full top-10 mt-4 pb-20">
              {props.children}
            </div>
          </div>
          <div className="grid justify-items-center fixed bottom-0 h-20 z-40 bg-white w-full">
            <Button
              type="green"
              className=" z-40e w-4/5 h-10 ml-4 self-center"
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
