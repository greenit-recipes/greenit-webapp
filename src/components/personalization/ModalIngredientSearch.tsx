import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";
import IngredientSearch from "./IngredientSearch";

interface IModalIngredientSearch {
  btn: any;
  show?: boolean;
  ingredientsAtHome: any;
  parentFunction: any;
}

//Todo: Load the component lazily
export const ModalIngredientSearch: React.FC<IModalIngredientSearch> = ({
  btn,
  ingredientsAtHome,
  parentFunction,
}) => {
  const [showModal, setShowModal] = useState(false);

  //Todo: Position the modal in the center
  useEffect(() => {
    if (showModal) {
      // à voir
      document.body.classList.add("no-scroll");

      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, []);

  return (
    <div>
      <div
        className="justify-items-center flex flex-col"
        onClick={() => setShowModal(true)}
      >
        {btn}
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <IngredientSearch
          parentFunction={parentFunction}
          setModalState={setShowModal}
          ingredientsAtHome={ingredientsAtHome}
        />
      </Modal>
    </div>
  );
};

export default ModalIngredientSearch;
