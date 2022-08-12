import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";

interface IModalPersonalizationInfo {
  btn: any;
  show?: boolean;
}

//Todo: Load the component lazily
export const ModalPersonalizationInfo: React.FC<IModalPersonalizationInfo> = ({
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
        <div className="flex flex-col justify-center items-center space-y-5 -mt-4 mx-3 md:w-[800px] md:mx-20">
          <div className="flex justify-center text-center space-x-2 mb-5">
            <h3 className="text-2xl font-normal">
              Comment marche la sélection de recettes pour moi ?
            </h3>
          </div>
          <div className="flex flex-col items-center space-y-3 leading-5">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 bg-darkBlue text-white rounded-full">
                1
              </span>
              <h3>Tes particularités</h3>
            </div>
            <i className="bx bxs-category-alt text-4xl text-green"></i>
            <p>
              Notre algorithme établit les “recettes pour moi” en incluant
              uniquement les recettes qui correspondent à tes particularités.
            </p>
          </div>
          <div className="flex flex-col items-center msm:space-y-3 text-darkBlue | leading-5">
            <div className="flex items-center space-x-3 md:mb-3">
              <span className="flex items-center justify-center w-7 h-7 bg-darkBlue text-white rounded-full">
                2
              </span>
              <h3>Les ingrédients chez toi</h3>
            </div>
            <i className="bx bxs-lemon text-4xl text-blue md:mb-2"></i>
            <p className="md:self-start">
              Les ingrédient chez toi n’excluent aucune recette. Ils permettent
              de prioriser les “recettes pour moi”.
            </p>
            <p className="md:self-start mb-5 md:mb-10">
              Plus une recette possède des ingrédients que tu as déjà chez toi,
              plus elle sera mise en avant.
            </p>
            <div className="flex space-x-3">
              <div className="flex items-center space-x-1 | bg-blue text-white rounded-b-xl rounded-tr-xl px-2 py-0.5">
                <i className="bx bx-lemon text-xl"></i>
                <span className="font-normal">1/2</span>
              </div>
              <div className="flex items-center space-x-1 | bg-blue text-white rounded-b-xl rounded-tr-xl px-2 py-0.5">
                <i className="bx bx-lemon text-xl"></i>
                <span className="font-normal">3/5</span>
              </div>
              <div className="flex items-center space-x-1 | bg-blue text-white rounded-b-xl rounded-tr-xl px-2 py-0.5">
                <i className="bx bx-lemon text-xl"></i>
                <span className="font-normal">4/4</span>
              </div>
            </div>
            <p className="md:my-4">
              Les badges ingrédients sur les recettes permettent d’identifier
              les recettes dont tu possèdes déjà les ingrédients.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalPersonalizationInfo;
