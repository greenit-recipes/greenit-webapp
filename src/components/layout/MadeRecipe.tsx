import { useMutation } from "@apollo/client";
import { ModalLogGreenit } from "components/layout/ModalLogGreenit/ModalLogGreenit";
import { ADD_OR_REMOVE_MADE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { FiSquare } from "react-icons/fi";
import authService from "services/auth.service";

interface IMadeRecipe {
  customClassName?: string;
  recipe: any;
  isToltipActif?: boolean;
  parentFunction?: any;
  isRefetchData?: boolean;
}

export const MadeRecipe: React.FC<IMadeRecipe> = ({
  recipe,
  parentFunction = null,
  isRefetchData = false,
  customClassName,
}) => {
  const isLoggedIn = authService.isLoggedIn();
  const [isMade, setMade] = useState(recipe?.isMadeByCurrentUser);

  const [addOrRemoveMadeRecipe] = useMutation(ADD_OR_REMOVE_MADE_RECIPE);

  return (
    <>
      {isLoggedIn ? (
        <button
          className={`btn-single-page p-2 flex ${
            customClassName ? customClassName : ""
          }`}
          onClick={() => {
            if (!isRefetchData) setMade(!isMade);
            // @ts-ignore: Object is possibly 'null'.
            addOrRemoveMadeRecipe({
              variables: {
                recipeId: recipe?.id,
              },
            }).then(() => {
              return parentFunction ? parentFunction() : null;
            });
          }}
        >
          <div className={` flex justify-items-center `}>
            {isMade ? (
              <AiFillCheckSquare className="w-6 h-6"></AiFillCheckSquare>
            ) : (
              <FiSquare className="w-6 h-6"></FiSquare>
            )}
            <div className="flex flex-col justify-center ml-1">recette réalisée</div>
          </div>
        </button>
      ) : (
        <div>
          <ModalLogGreenit
            btn={
              <button
                className={`btn-single-page p-2 flex ${
                  customClassName ? customClassName : ""
                }`}
              >
                <div className={` flex justify-items-center `}>
                  {isMade ? (
                    <AiFillCheckSquare className="w-6 h-6"></AiFillCheckSquare>
                  ) : (
                    <FiSquare className="w-6 h-6"></FiSquare>
                  )}

                  <div className="flex flex-col justify-center ml-1 ">
                    recette réalisée
                  </div>
                </div>
              </button>
            }
          ></ModalLogGreenit>
        </div>
      )}
    </>
  );
};
