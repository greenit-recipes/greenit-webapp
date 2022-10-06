import { getImagePath } from "helpers/image.helper";
import useIsMobile from "hooks/isMobile";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { Button } from "components";
import { useMutation } from "@apollo/client";
import {
  ADD_OR_REMOVE_INGREDIENT_AT_HOME,
  ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST,
} from "../SinglePage-helper";
import ReactDOM from "react-dom";
import { NotificationAlert } from "components/layout/NotificationAlert";
import authService from "services/auth.service";
import { Link, useLocation } from "react-router-dom";
import {
  getRandomKey,
  hasIngredientOnList,
} from "../../../../components/personalization/PersonalizationHelper";

interface ISectionIngredient {
  className?: string;
  data: any;
  isICMactive?: boolean;
  isLDCactive?: boolean;
  parentFunction?: any;
  isIngredientListUserActive?: boolean;
}

export const SectionIngredient: React.FC<ISectionIngredient> = ({
  data,
  className,
  isICMactive = false,
  isLDCactive = false,
  parentFunction,
  isIngredientListUserActive = false,
}) => {
  const [isArrowDown, setArrowDown] = useState(true);
  //@ts-ignore
  const [isICMActive, setIsICMActive] = useState(isICMactive);
  //@ts-ignore
  const [isLDCActive, setIsLDCActive] = useState(isLDCactive);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isLoggedIn = authService.isLoggedIn();

  useEffect(() => {
    isLDCactive
      ? !isLDCActive && setIsLDCActive(true)
      : isLDCActive && setIsLDCActive(false);
  }, [isLDCactive]);

  const [
    createOrDeleteIngredientAtHomeUser,
    { data: createOrDeleteICMdata, loading: loadingICM, error: errorICM },
  ] = useMutation(ADD_OR_REMOVE_INGREDIENT_AT_HOME, { errorPolicy: "all" });

  const [
    createOrDeleteIngredientShoppingList,
    { data: createOrDeleteLDCdata, loading: loadingLDC, error: errorLDC },
  ] = useMutation(ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST, {
    errorPolicy: "all",
  });

  const [isICMAddedNotifActive, setIsICMAddedNotifActive] = useState(false);
  const [isLDCAddedNotifActive, setIsLDCAddedNotifActive] = useState(false);
  const [isLDCUpdatedNotifActive, setIsLDCUpdatedNotifActive] = useState(false);
  const [isLDCAccessNotifActive, setIsLDCAccessNotifActive] = useState(false);

  useEffect(() => {
    if (isICMAddedNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey(
            "icm-added-" + location.pathname === "profile"
              ? "profile"
              : "recipe",
          )}
          type="success"
          title="Ajouté(s) aux ingrédients chez toi !"
          text="Retrouve ta liste dans ton profil."
        />,
        document.getElementById("notif"),
      );
      setIsICMAddedNotifActive(false);
    }

    if (isLDCAddedNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey(
            "ldc-added-" + location.pathname === "profile"
              ? "profile"
              : "recipe",
          )}
          type="success"
          title="Ajouté(s) à la liste de course !"
          text="Retrouve ta liste dans ton profil."
        />,
        document.getElementById("notif"),
      );
      setIsLDCAddedNotifActive(false);
    }

    if (isLDCUpdatedNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey("ldc-updated")}
          type="success"
          title="Mise à jour de ta liste de course !"
          text="Ajoute des ingrédients depuis les recettes."
        />,
        document.getElementById("notif"),
      );
      setIsLDCUpdatedNotifActive(false);
    }

    if (isLDCAccessNotifActive) {
      ReactDOM.render(
        <NotificationAlert
          key={getRandomKey("ingredient-card-ldc-access")}
          type="alert"
          title="Tu n’as pas accès à la liste de course."
          text="Crée-toi un compte pour ajouter à ta liste !"
        />,
        document.getElementById("notif"),
      );
      setIsLDCAccessNotifActive(false);
    }
  }, [
    isICMAddedNotifActive,
    isLDCAddedNotifActive,
    isLDCUpdatedNotifActive,
    isLDCAccessNotifActive,
  ]);

  return (
    <>
      <div
        className={`flex items-center btn-single-page ingredient-shadow max-h-32 mt-4 ${
          !isMobile ? "cursor-pointer" : ""
        }`}
      >
        <div
          className="flex items-center justify-between"
          onClick={() => {
            if (!isMobile) setArrowDown(!isArrowDown);
          }}
        >
          {data?.amount && (
            <div className="flex items-center justify-center h-12 py-2 px-4 text-center rounded-l-md bg-blueL font-semibold">
              {data?.amount}
            </div>
          )}
          <img
            className="w-12 h-12 rounded"
            alt={data?.name}
            loading="lazy"
            src={getImagePath(data?.image)}
          ></img>
        </div>
        <div
          className="flex-grow w-1/6 ml-4"
          onClick={() => {
            if (!isMobile) setArrowDown(!isArrowDown);
          }}
        >
          {" "}
          {data?.name}{" "}
        </div>
        <div className="w-1/6">
          <div className="flex items-center justify-end w-full">
            {isIngredientListUserActive && !isMobile && (
              <div className="flex ml-4">
                <div className="tooltip relative flex-col">
                  <Button
                    id="recipepage-ingredientcard-ICM"
                    className={`relative px-4 mr-3 shadow-md ${
                      isICMActive && "border-blue"
                    } hover:text-blue active:border-blue active:bg-white`}
                    haveIcon={true}
                    type="darkBlueIcon"
                    onClick={() => {
                      if (isLoggedIn) {
                        setIsICMActive(!isICMActive);
                        !isICMActive &&
                          !isICMAddedNotifActive &&
                          setIsICMAddedNotifActive(true);
                        createOrDeleteIngredientAtHomeUser({
                          variables: {
                            ingredientAtHome: {
                              additions: [data?.id],
                              deletions: [],
                            },
                          },
                        }).then(() => {
                          parentFunction ? parentFunction() : null;
                        });
                      } else {
                        if (parentFunction ? parentFunction(data) : null) {
                          setIsICMActive(!isICMActive);
                          !isICMActive &&
                            !isICMAddedNotifActive &&
                            setIsICMAddedNotifActive(true);
                        }
                      }
                    }}
                  >
                    <i
                      className={`bx ${
                        isICMActive
                          ? "bxs-lemon text-blue"
                          : "bx-lemon text-darkBlue"
                      }  text-xl`}
                    ></i>
                    <i
                      className={`bx ${
                        isICMActive
                          ? "bx-minus text-blue"
                          : "bx-plus text-darkBlue"
                      }
                   text-sm text-darkBlue absolute -top-0.5 right-0.5`}
                    ></i>
                  </Button>
                  {!isICMActive && (
                    <span className="tooltipcontent -top-7 -right-10">
                      J’ai cet ingrédient chez moi
                    </span>
                  )}
                </div>
                <div className="tooltip relative flex-col">
                  <Button
                    id="recipepage-ingredientcard-LDC"
                    className={`relative px-4 mr-3 shadow-md ${
                      isLDCActive && "border-blue"
                    } hover:text-blue active:border-blue active:bg-white`}
                    haveIcon={true}
                    type="darkBlueIcon"
                    onClick={() => {
                      if (isLoggedIn) {
                        setIsLDCActive(!isLDCActive);
                        !isLDCActive &&
                          !isLDCAddedNotifActive &&
                          setIsLDCAddedNotifActive(true);
                        isLDCActive &&
                          !isLDCUpdatedNotifActive &&
                          setIsLDCUpdatedNotifActive(true);
                        createOrDeleteIngredientShoppingList({
                          variables: {
                            ingredientShoppingList: {
                              additions: [data?.id],
                              deletions: [],
                            },
                          },
                        }).then(() => {
                          parentFunction ? parentFunction() : null;
                        });
                      } else {
                        setIsLDCAccessNotifActive(true);
                      }
                    }}
                  >
                    <i
                      className={`bx bx-cart-download ${
                        isLDCActive ? "text-blue" : "text-darkBlue"
                      }  text-xl`}
                    ></i>
                    <i
                      className={`bx ${
                        isLDCActive
                          ? "bx-minus text-blue"
                          : "bx-plus text-darkBlue"
                      }
                   text-sm text-darkBlue absolute -top-0.5 right-0.5`}
                    ></i>
                  </Button>
                  <span className="tooltipcontent -top-7 -right-20">
                    {!isLDCActive ? "Ajouter à" : "Enlever de"} ma liste de
                    course
                  </span>
                </div>
              </div>
            )}
            <i
              className={`bx bx-chevron-down bx-md mr-6 cursor-pointer ${
                isArrowDown ? "section-arrow-up" : "section-arrow-down"
              }`}
              onClick={() => {
                setArrowDown(!isArrowDown);
              }}
            />
          </div>
        </div>
      </div>
      <div className={!isArrowDown ? "fadeIn-arrow" : " fadeOut-arrow"}>
        <div className="rounded-b bg-blueL">
          <div className="w-5/6 ml-6 lg:w-4/6">
            {isIngredientListUserActive && isMobile && (
              <div className="flex justify-around pt-5 space-x-2 mb-2">
                <div className="flex items-center">
                  <Button
                    id="recipepage-ingredientcard-ICM"
                    className={`relative px-4 mr-3 shadow-md ${
                      isICMActive && "border-blue"
                    } hover:text-blue active:border-blue active:bg-white`}
                    haveIcon={true}
                    type="darkBlueIcon"
                    onClick={() => {
                      if (isLoggedIn) {
                        setIsICMActive(!isICMActive);
                        !isICMActive &&
                          !isICMAddedNotifActive &&
                          setIsICMAddedNotifActive(true);
                        createOrDeleteIngredientAtHomeUser({
                          variables: {
                            ingredientAtHome: {
                              additions: [data?.id],
                              deletions: [],
                            },
                          },
                        }).then(() => {
                          parentFunction ? parentFunction() : null;
                        });
                      } else {
                        if (parentFunction ? parentFunction(data) : null) {
                          setIsICMActive(!isICMActive);
                          !isICMActive &&
                            !isICMAddedNotifActive &&
                            setIsICMAddedNotifActive(true);
                        }
                      }
                    }}
                  >
                    <i
                      className={`bx ${
                        isICMActive
                          ? "bxs-lemon text-blue"
                          : "bx-lemon text-darkBlue"
                      }  text-2xl`}
                    ></i>
                    <i
                      className={`bx ${
                        isICMActive
                          ? "bx-minus text-blue"
                          : "bx-plus text-darkBlue"
                      }
                   text-sm text-darkBlue absolute -top-0.5 right-0.5`}
                    ></i>
                  </Button>
                  <span className="text-xs font-semibold">
                    Ingrédient déjà chez moi
                  </span>
                </div>
                <div className="flex items-center">
                  <Button
                    id="recipepage-ingredientcard-LDC"
                    className={`relative px-4 mr-3 shadow-md ${
                      isLDCActive && "border-blue"
                    } hover:text-blue active:border-blue active:bg-white`}
                    haveIcon={true}
                    type="darkBlueIcon"
                    onClick={() => {
                      if (isLoggedIn) {
                        setIsLDCActive(!isLDCActive);
                        !isLDCActive &&
                          !isLDCAddedNotifActive &&
                          setIsLDCAddedNotifActive(true);
                        isLDCActive &&
                          !isLDCUpdatedNotifActive &&
                          setIsLDCUpdatedNotifActive(true);
                        createOrDeleteIngredientShoppingList({
                          variables: {
                            ingredientShoppingList: {
                              additions: [data?.id],
                              deletions: [],
                            },
                          },
                        }).then(() => {
                          parentFunction ? parentFunction() : null;
                        });
                      } else {
                        setIsLDCAccessNotifActive(true);
                      }
                    }}
                  >
                    <i
                      className={`bx bx-cart-download ${
                        isLDCActive ? "text-blue" : "text-darkBlue"
                      }  text-2xl`}
                    ></i>
                    <i
                      className={`bx ${
                        isLDCActive
                          ? "bx-minus text-blue"
                          : "bx-plus text-darkBlue"
                      }
                   text-sm text-darkBlue absolute -top-0.5 right-0.5`}
                    ></i>
                  </Button>
                  <p className="text-xs font-semibold">
                    {isLDCActive ? "Retirer de " : "Ajouter à "}ma liste de
                    course
                  </p>
                </div>
              </div>
            )}
            <div className="pt-4">
              {data?.description && HTMLReactParser(data?.description)}
            </div>
            <h4 className="pt-4 fontQSemibold">Alternatives</h4>
            <div>{data?.alternative && HTMLReactParser(data?.alternative)}</div>
            <div className="flex-col items-center pt-4 pb-6 lg:flex-row">
              <h4 className="fontQSemibold">Où acheter ?</h4>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
                <div className="flex-col">
                  {data?.isSupermarket && (
                    <div className="flex items-center ml-6">
                      <BsShop className="w-8 h-8 mr-2" />
                      <div>
                        Biocop
                        <br />
                        Supermarché
                      </div>
                    </div>
                  )}

                  {data?.isOnline && (
                    <div className="flex items-center ml-6 mr-2 w-24">
                      <RiComputerLine className="w-8 h-8 mr-2" />
                      <div>En ligne</div>
                    </div>
                  )}
                </div>
                {/*{data?.purchaseLink && (
                  <>
                    {!isMobile && (
                      <p className="self-start text-sm">
                        Nous conseillons notre marque partenaire pour
                        l’accessibilité et la qualité des produits. 👉
                      </p>
                    )}
                    <div className="md:self-start flex md:h-10 msm:mt-2 msm:justify-center">
                      <a href={data?.purchaseLink} target="_blank">
                        <Button
                          id="recipepage-ingredients-commanderBoutton"
                          type="blue"
                          rounded="lg"
                        >
                          Commander
                        </Button>
                      </a>
                    </div>
                  </>
                )}*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
