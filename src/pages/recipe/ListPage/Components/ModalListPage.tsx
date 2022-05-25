import React from 'react';
import { Button } from 'components/misc/Button';

interface IModalListPage {
  isShowModal: boolean;
  parentFunction: any;
  nbrFilter: any;
}

export const ModalListPage: React.FC<IModalListPage> = props => {
  return (
    <>
      <Button
        className="ease-linear transition-all duration-150 mt-2 w-4/5 h-8 rounded"
        type="grey"
        onClick={() => props.parentFunction(true)}
      >
        {props.nbrFilter === 0 ? (
          <span>Ajouter un filtre</span>
        ) : (
          <span>
            {' '}
            Filtre{props.nbrFilter > 1 ? 's' : ''} ({props.nbrFilter}){' '}
          </span>
        )}
      </Button>
      {props.isShowModal ? (
        <>
          <Button
            type="blue"
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
              type="blue"
              className=" z-40 w-4/5 h-10 ml-4 self-center"
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
