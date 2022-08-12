import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";
import Personalization from "./Personalization";

interface IModalPersonalization {
  btn: any;
  show?: boolean;
}

//Todo: Load the component lazily
export const ModalPersonalization: React.FC<IModalPersonalization> = ({
  btn,
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
        <Personalization />
      </Modal>
    </div>
  );
};

export default ModalPersonalization;
