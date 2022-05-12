import { gql, useMutation } from "@apollo/client";
import { RouteName } from "App";
import Modal from "components/layout/Modal/Modal";
import ModalHelp from "components/layout/modalHelp";
import { useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { FiSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IProfilGreenitFullXp {
  isRecipeMadeBeginnerBox: boolean;
  parentFunction: any;
}

const UPDATE_RECIPE_MADE_BEGINNER_BOX = gql`
  mutation UpdateRecipeMadeBeginnerBox($isRecipeMadeBeginnerBox: Boolean!) {
    updateRecipeMadeBeginnerBox(
      isRecipeMadeBeginnerBox: $isRecipeMadeBeginnerBox
    ) {
      success
    }
  }
`;

export const ProfilGreenitFullXp: React.FC<IProfilGreenitFullXp> = ({
  isRecipeMadeBeginnerBox,
  parentFunction,
}) => {
  const [isMadeBeginnerBox, setMadeBeginnerBox] = useState(
    isRecipeMadeBeginnerBox || false
  );
  const [showModalHelp, setShowModalHelp] = useState(false);
  const [updateRecipeFullXp] = useMutation(UPDATE_RECIPE_MADE_BEGINNER_BOX);

  return (
    <div className="rounded-2xl bg-blueL p-5 lg:w-3/5 m-auto mb-4">
      <p className="text-2xl font-semibold text-center mb-2">
        Ma box Premiers Pas
      </p>
      <div className="flex justify-evenly">
        <img
          className="w-16 h-16 rounded-full"
          alt="lessive"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
          loading="lazy"
        />
        <img
          className="w-16 h-16 rounded-full"
          alt="savon solide"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
          loading="lazy"
        />
        <img
          className="w-16 h-16 rounded-full"
          alt="crème de jour"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
          loading="lazy"
        />
      </div>
      <p className="text-center mt-2 mb-2">Débutons dans le DIY ensemble !</p>
      <Link to={RouteName.tutoFullXpBeginner}>
        <button
          className={`btn-single-page justify-center mb-2 mt-2 p-2 h-10 flex w-full bg-green text-white`}
        >
          J'ai reçu max box Premier pas !
        </button>
      </Link>
      <button
        className={`btn-single-page justify-center mt-2 mb-4 p-2 h-10 flex w-full bg-white`}
        onClick={() => {
          setMadeBeginnerBox(!isMadeBeginnerBox);
          updateRecipeFullXp({
            variables: {
              isRecipeMadeBeginnerBox: !isMadeBeginnerBox,
            },
          }).then(() => {
            return parentFunction()
          });
        }}
      >
        <div className={`flex justify-items-center `}>
          {isMadeBeginnerBox ? (
            <AiFillCheckSquare className="w-6 h-6"></AiFillCheckSquare>
          ) : (
            <FiSquare className="w-6 h-6"></FiSquare>
          )}
          <div className="flex flex-col justify-center ml-1">
            J’ai réalisé les recettes !
          </div>
        </div>
      </button>
      <h3 className="text-xs lg:text-sm text-center">
        Clique ici une fois que tu as réalisée les recettes et calcule ton
        impact DIY !
      </h3>
      <p
        className="text-center mt-4 underline cursor-pointer"
        onClick={() => setShowModalHelp(true)}
      >
        ⚠️ J’ai un problème avec mon colis
      </p>
      <Modal
        isCenter={true}
        onClose={() => setShowModalHelp(false)}
        show={showModalHelp}
      >
        <ModalHelp
          messageModal={"⚠️ J’ai un problème avec mon colis"}
          subMessageModal={
            "Nous sommes navrés de l’apprendre, contacte notre service client et nous tenterons de trouver une solution 🙂"
          }
        ></ModalHelp>
      </Modal>
    </div>
  );
};
