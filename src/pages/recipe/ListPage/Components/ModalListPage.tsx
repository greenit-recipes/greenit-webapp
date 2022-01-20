import React from "react";
import { Button } from "components/misc/Button";

interface IModalListPage {
  isShowModal: boolean;
parentFunction: any
}

export const ModalListPage: React.FC<IModalListPage> = (props) => {
  return (
    <>
      <Button
        className="w-26 ease-linear transition-all duration-150 mt-2"
        type="grey"
        onClick={() => props.parentFunction(true)}
      >
        Ajoute un filtre
      </Button>
      {props.isShowModal ? (
        <>
          <div className="pl-6 ph-auto bg-white items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div>
              {props.children}
            </div>
            <Button type="grey" onClick={() => props.parentFunction(false)}>FERMER</Button>
          </div>
        </>
      ) : null}
    </>
  );
};
