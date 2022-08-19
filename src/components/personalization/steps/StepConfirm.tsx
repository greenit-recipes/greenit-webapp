import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import AuthService, {
  UPDATE_PARTICULARITIES_ACCOUNT,
} from "../../../services/auth.service";
import { ModalLogGreenit } from "../../layout";
import {
  particularityConverter,
  questionnaireMenu,
  selectOption,
} from "../PersonalizationHelper";
import { Button } from "../../misc";
import { NotificationAlert } from "components/layout/NotificationAlert";
import ReactDOM from "react-dom";
import { cloneDeep } from "lodash";

interface StepConfirmProps {
  options: any;
  parentFunction?: any;
  setModalState: any;
  hasParticularities: any;
}

export const StepConfirm: React.FC<StepConfirmProps> = ({
  options,
  parentFunction,
  setModalState,
  hasParticularities = false,
}) => {
  const [
    updateParticularitiesAccount,
    { data: updateAccountData, loading, error },
  ] = useMutation(UPDATE_PARTICULARITIES_ACCOUNT, { errorPolicy: "all" });

  const saveParticularities = (particularities: any) => {
    updateParticularitiesAccount({
      variables: {
        particularities: JSON.stringify(
          particularityConverter(particularities),
        ),
      },
    }).then(() => {
      parentFunction ? parentFunction() : null;
    });
  };

  const [confirmOptions, setConfirmOptions] = useState(
    cloneDeep(questionnaireMenu[3].singleOptions),
  );

  const [isConfirmButtonActive, setIsConfirmButtonActive] = useState(false);
  const [isConfirmButtonClicked, setIsConfirmButtonClicked] = useState(false);

  const isEmptySelection = () => {
    return !(
      //@ts-ignore
      confirmOptions.some(op => op.isSelected)
    );
  };

  useEffect(() => {
    !isEmptySelection()
      ? setIsConfirmButtonActive(true)
      : setIsConfirmButtonActive(false);
  }, [confirmOptions]);

  const isLoggedIn = AuthService.isLoggedIn();

  if (!isLoggedIn) {
    localStorage.setItem("particularity", JSON.stringify(options));
  }

  let keyCounter: any = useRef(0);
  const [isLoginNotifActive, setIsLoginNotifActive] = useState(false);
  const [isParticularitySavedNotifActive, setIsParticularitySavedNotifActive] =
    useState(false);

  useEffect(() => {
    if (isConfirmButtonClicked && isLoginNotifActive) {
      // @ts-ignore
      ReactDOM.render(
        <NotificationAlert
          key={"login-" + keyCounter.current++}
          type="alert"
          titre="Connecte-toi pour les résultats !"
          text="Découvre une sélection de recettes adaptées."
        />,
        document.getElementById("notif"),
      );
    }
    if (isConfirmButtonClicked && isParticularitySavedNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={"particularity-saved-" + keyCounter.current++}
          type="success"
          titre={
            hasParticularities
              ? "Mise à jour de tes particularités !"
              : "Particularités enregistrées !"
          }
          text={
            hasParticularities
              ? "Retrouve ta sélection de recettes adaptées."
              : "Retrouve-les dans ton profil."
          }
        />,
        document.getElementById("notif"),
      );
    }
  }, [
    isLoginNotifActive,
    isParticularitySavedNotifActive,
    isConfirmButtonClicked,
  ]);

  const showLoginNotification = () => {
    if (!isLoginNotifActive) {
      isParticularitySavedNotifActive &&
        setIsParticularitySavedNotifActive(false);
      setIsLoginNotifActive(true);
    }
    return true;
  };

  const showSavedParticularityNotification = () => {
    if (!isParticularitySavedNotifActive) {
      isLoginNotifActive && setIsLoginNotifActive(false);
      setIsParticularitySavedNotifActive(true);
    }
    return true;
  };

  const showHomeRecipes = () => {
    //@ts-ignore
    if (confirmOptions[0].isSelected) {
      localStorage.setItem("hasHomeRecipe__personalization", "true");
      //@ts-ignore
    } else if (confirmOptions[1].isSelected) {
      localStorage.setItem("hasHomeRecipe__personalization", "false");
    }
    return true;
  };

  // @ts-ignore
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-base md:text-lg">
        Des recettes pour la maison, ça te dit ?
      </h4>
      <p className="font-diy text-xl md:text-2xl">
        lessive, liquide vaiselle, nettoyant . . .
      </p>
      <div className="mt-4 mx-10 mb-6 | space-y-4 md:h-40 md:w-[500px]">
        <div className="flex flex-col justify-center md:flex-row md:space-x-4 md:justify-center | mt-2 msm:space-y-3">
          {/*@ts-ignore*/}
          {confirmOptions.map((op: any) => {
            return (
              <div
                id={op.id}
                className={`w-56 py-3  ${
                  op.isSelected
                    ? "border-green bg-greenL text-green"
                    : "border-darkBlue"
                } hover:border-green hover:bg-greenL hover:text-green border-2 rounded-md shadow-md | cursor-pointer`}
                onClick={() => {
                  setConfirmOptions(selectOption(confirmOptions, op.option));
                }}
              >
                {op.option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:flex md:justify-center w-11/12 md:mt-10 md:mb-4">
        {/*@ts-ignore*/}
        {!isLoggedIn &&
          isConfirmButtonActive &&
          showHomeRecipes() &&
          showLoginNotification() && (
            <ModalLogGreenit
              isModalLogin={true}
              parentFunction={setIsConfirmButtonClicked}
              btn={
                <Button
                  id="modal-personalisation-validerstepMoreDetails"
                  className="w-full md:w-20 mt-2 mb-4 shadow-md"
                  type="green"
                >
                  Valider
                </Button>
              }
            />
          )}
        {isLoggedIn &&
          isConfirmButtonActive &&
          showHomeRecipes() &&
          showSavedParticularityNotification() && (
            <Button
              id="modal-personalisation-validerstepMoreDetails"
              className="w-full md:w-20 mt-2 mb-4 shadow-md"
              type="green"
              onClick={() => {
                setIsConfirmButtonClicked(true);
                saveParticularities(options);
                setModalState(false);
              }}
            >
              Valider
            </Button>
          )}
      </div>
    </div>
  );
};

export default StepConfirm;
