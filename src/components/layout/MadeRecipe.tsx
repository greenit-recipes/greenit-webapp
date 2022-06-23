import { useMutation } from "@apollo/client";
import { Button } from "components/misc";
import { ADD_OR_REMOVE_MADE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { FiSquare } from "react-icons/fi";
import authService from "services/auth.service";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

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
    <div className={`${customClassName}`}>
      {isLoggedIn ? (
        <Button
          id="recette-réalisée-login"
          type="darkBlue"
          rounded="lg"
          haveIcon={true}
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
          className="mr-1"
        >
          <div className={` flex justify-items-center `}>
            {isMade ? (
              <AiFillCheckSquare className="w-6 h-6"></AiFillCheckSquare>
            ) : (
              <FiSquare className="w-6 h-6"></FiSquare>
            )}
            <div className="flex flex-col justify-center ml-1">réalisée</div>
          </div>
        </Button>
      ) : (
        <div>
          <ModalLogGreenit
            btn={
              <Button
                id="recette-réalisée-pas-connecte"
                type="darkBlue"
                rounded="lg"
                haveIcon={true}
                className="mr-1"
              >
                <div className={` flex justify-items-center `}>
                  {isMade ? (
                    <AiFillCheckSquare className="w-6 h-6"></AiFillCheckSquare>
                  ) : (
                    <FiSquare className="w-6 h-6"></FiSquare>
                  )}
                  <div className="flex flex-col justify-center ml-1">
                    réalisée
                  </div>
                </div>
              </Button>
            }
          ></ModalLogGreenit>
        </div>
      )}
    </div>
  );
};
