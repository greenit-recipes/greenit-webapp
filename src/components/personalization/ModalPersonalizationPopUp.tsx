import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";
import {
  Gif_ICM,
  Gif_LDC,
  Gif_Personnalisation,
  Gif_Profil,
} from "../../icons";
import { getStep } from "./PersonalizationHelper";
import { useQuery } from "@apollo/client";
import { GET_FEATURE_BY_NAME } from "../../services/feature.service";
import { Button } from "../misc";
import { ModalLogGreenit } from "../layout";

interface ModalPersonalizationPopUpProps {
  show?: boolean;
}

const popUpMenu = [
  {
    image: Gif_Personnalisation,
    alt: "",
    name: "Répondez aux questionnaires pour trouver des recettes en fonction de vos particularités !",
  },
  {
    image: Gif_ICM,
    alt: "",
    name: "Ajoutez les ingrédients de chez vous pour réaliser des recettes avec vos stocks !",
  },
  {
    image: Gif_LDC,
    alt: "",
    name: "Ajustez votre liste de course d’ingrédients pour simplifier vos achats.",
  },
  {
    image: Gif_Profil,
    alt: "",
    name: "Retrouvez votre carnet de recettes et votre impact dans votre espace !",
  },
];

export const ModalPersonalizationPopUp: React.FC<
  ModalPersonalizationPopUpProps
> = ({ show = false }) => {
  const [showModal, setShowModal] = useState(show);
  const [menu, setMenu] = useState(popUpMenu[0].name);
  const { loading, data } = useQuery(GET_FEATURE_BY_NAME, {
    variables: {
      name: "is_greenit_personalization_popup",
    },
    errorPolicy: "all",
  });

  const selectStep = (step: number) => {
    setMenu(popUpMenu[step].name);
  };

  useEffect(() => {
    //Activate on first render since its child uses a transition
    if (data?.featureFlag.isActive && !showModal) {
      !localStorage.getItem("is_greenit_personalization_popup") &&
        setTimeout(() => {
          localStorage.setItem("is_greenit_personalization_popup", "true");
          setShowModal(true);
          if (showModal) {
            // à voir
            document.body.classList.add("no-scroll");
            return () => {
              document.body.classList.remove("no-scroll");
            };
          }
        }, 2000);
    }
  }, [data]);

  if (loading) {
    return <></>;
  }

  return (
    data?.featureFlag.isActive && (
      <div>
        <Modal onClose={() => setShowModal(false)} show={showModal}>
          <div className="flex flex-col justify-center items-center space-y-5 -mt-4 mx-3 md:w-[500px] md:mx-20">
            <div className="flex space-x-2 mb-3">
              <h3 className="font-semibold">Y’a du nouveau sur Greenit !</h3>
            </div>
            <div className="flex flex-col items-center text-center -mt-8 md:-mt-6 space-y-4">
              {(() => {
                switch (menu) {
                  case popUpMenu[0].name:
                    return (
                      <>
                        <img
                          className="w-80 w-80 md:w-96 md:h-96"
                          src={popUpMenu[0].image}
                          alt={popUpMenu[0].alt}
                        />
                        <h3>{popUpMenu[0].name}</h3>
                      </>
                    );
                  case popUpMenu[1].name:
                    return (
                      <>
                        <img
                          className="w-80 w-80 md:w-96 md:h-96"
                          src={popUpMenu[1].image}
                          alt={popUpMenu[1].alt}
                        />
                        <h3>{popUpMenu[1].name}</h3>
                      </>
                    );
                  case popUpMenu[2].name:
                    return (
                      <>
                        <img
                          className="w-80 w-80 md:w-96 md:h-96"
                          src={popUpMenu[2].image}
                          alt={popUpMenu[2].alt}
                        />
                        <h3>{popUpMenu[2].name}</h3>
                      </>
                    );
                  case popUpMenu[3].name:
                    return (
                      <>
                        <img
                          className="w-80 w-80 md:w-96 md:h-96"
                          src={popUpMenu[3].image}
                          alt={popUpMenu[3].alt}
                        />
                        <h3>{popUpMenu[3].name}</h3>
                        <ModalLogGreenit
                          btn={
                            <Button
                              id="modal-nouveaute-creer-compte"
                              type="blue"
                              rounded="lg"
                              className="msm:w-[300px] mr-1"
                            >
                              Créer un compte
                            </Button>
                          }
                        ></ModalLogGreenit>
                      </>
                    );
                }
              })()}

              {/*Stepper*/}
              <div className="flex justify-center items-center space-x-6 mt-4">
                {getStep(popUpMenu, menu) > 0 && (
                  <i
                    className="bx bx-left-arrow-alt text-4xl cursor-pointer"
                    onClick={() => selectStep(getStep(popUpMenu, menu) - 1)}
                  ></i>
                )}

                {[1, 2, 3, 4].map(el => {
                  return (
                    <div
                      onClick={() => {
                        selectStep(el - 1);
                      }}
                      className={`flex items-center justify-center cursor-pointer text-base ${
                        menu === popUpMenu[el - 1].name
                          ? " w-8 h-8 bg-darkBlue rounded-full text-white"
                          : ""
                      }`}
                    >
                      {el.toString()}
                    </div>
                  );
                })}

                {getStep(popUpMenu, menu) < popUpMenu.length - 1 && (
                  <i
                    className="bx bx-right-arrow-alt text-4xl cursor-pointer"
                    onClick={() => selectStep(getStep(popUpMenu, menu) + 1)}
                  ></i>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  );
};

export default ModalPersonalizationPopUp;
