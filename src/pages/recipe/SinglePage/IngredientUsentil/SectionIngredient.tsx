import { getImagePath } from "helpers/image.helper";
import useIsMobile from "hooks/isMobile";
import HTMLReactParser from "html-react-parser";
import React, { useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { Button } from "components";
import { useMutation } from "@apollo/client";
import {
  ADD_OR_REMOVE_INGREDIENT_AT_HOME,
  ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST,
} from "../SinglePage-helper";
import { hasIngredientOnList } from "components/personalization/PersonalizationHelper";

interface ISectionIngredient {
  className?: string;
  data: any;
  isICMactive?: boolean;
  isLDCactive?: boolean;
}

export const SectionIngredient: React.FC<ISectionIngredient> = ({
  data,
  className,
  isICMactive,
  isLDCactive,
}) => {
  const [isArrowDown, setArrowDown] = useState(true);
  //@ts-ignore
  const [isICMActive, setIsICMActive] = useState(isICMactive);
  //@ts-ignore
  const [isLDCActive, setIsLDCActive] = useState(isLDCactive);
  const isMobile = useIsMobile();

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
            {!isMobile && (
              <div className="flex ml-4">
                <Button
                  id="recipepage-ingredientcard-ICM"
                  className={`px-4 mr-3 shadow-md ${
                    isICMActive && "border-blue"
                  } hover:text-blue active:border-blue active:bg-white`}
                  haveIcon={true}
                  type="darkBlueIcon"
                  onClick={() => {
                    setIsICMActive(!isICMActive);
                    createOrDeleteIngredientAtHomeUser({
                      variables: {
                        ingredientAtHome: {
                          additions: [data?.id],
                          deletions: [],
                        },
                      },
                    });
                  }}
                >
                  <i
                    className={`bx ${
                      isICMActive
                        ? "bxs-lemon text-blue"
                        : "bx-lemon text-darkBlue"
                    }  text-xl`}
                  ></i>
                </Button>
                <Button
                  id="recipepage-ingredientcard-LDC"
                  className={`px-4 mr-3 shadow-md ${
                    isLDCActive && "border-blue"
                  } hover:text-blue active:border-blue active:bg-white`}
                  haveIcon={true}
                  type="darkBlueIcon"
                  onClick={() => {
                    setIsLDCActive(!isLDCActive);
                    createOrDeleteIngredientShoppingList({
                      variables: {
                        ingredientShoppingList: {
                          additions: [data?.id],
                          deletions: [],
                        },
                      },
                    });
                  }}
                >
                  <i
                    className={`bx bx-cart-download ${
                      isLDCActive ? "text-blue" : "text-darkBlue"
                    }  text-xl`}
                  ></i>
                </Button>
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
            {isMobile && (
              <div className="flex justify-around pt-5 space-x-2 mb-2">
                <div className="flex items-center">
                  <Button
                    id="recipepage-ingredientcard-ICM"
                    className={`px-4 mr-3 shadow-md ${
                      isICMActive && "border-blue"
                    } hover:text-blue active:border-blue active:bg-white`}
                    haveIcon={true}
                    type="darkBlueIcon"
                    onClick={() => {
                      setIsICMActive(!isICMActive);
                      createOrDeleteIngredientShoppingList({
                        variables: {
                          ingredientAtHome: {
                            additions: [data?.id],
                            deletions: [],
                          },
                        },
                      });
                    }}
                  >
                    <i
                      className={`bx ${
                        isICMActive
                          ? "bxs-lemon text-blue"
                          : "bx-lemon text-darkBlue"
                      }  text-2xl`}
                    ></i>
                  </Button>
                  <span className="text-xs font-semibold">
                    Ingrédient déjà chez moi
                  </span>
                </div>
                <div className="flex items-center">
                  <Button
                    id="recipepage-ingredientcard-LDC"
                    className={`px-4 mr-3 shadow-md ${
                      isLDCActive && "border-blue"
                    } hover:text-blue active:border-blue active:bg-white`}
                    haveIcon={true}
                    type="darkBlueIcon"
                    onClick={() => {
                      setIsLDCActive(!isLDCActive);
                      createOrDeleteIngredientShoppingList({
                        variables: {
                          ingredientShoppingList: {
                            additions: [data?.id],
                            deletions: [],
                          },
                        },
                      });
                    }}
                  >
                    <i
                      className={`bx bx-cart-download ${
                        isLDCActive ? "text-blue" : "text-darkBlue"
                      }  text-2xl`}
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
                <div className="flex items-center ml-6">
                  <RiComputerLine className="w-8 h-8 mr-2" />
                  <div>En ligne</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
