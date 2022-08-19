import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";
import Personalization from "./Personalization";

interface IModalPersonalization {
  btn: any;
  show?: boolean;
  parentFunction?: any;
  hasParticularities?: any;
}

//Todo: Load the component lazily
export const ModalPersonalization: React.FC<IModalPersonalization> = ({
  btn,
  parentFunction,
  hasParticularities,
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
        <Personalization
          hasParticularities={hasParticularities}
          parentFunction={parentFunction}
          setModalState={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default ModalPersonalization;
