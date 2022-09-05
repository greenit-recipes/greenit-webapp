import { useMutation } from "@apollo/client";
import { Loading } from "components/layout/Loading";
import { Button } from "components/misc";
import { ADD_OR_REMOVE_FAVORITE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { Suspense, useState } from "react";
import { classNames } from "react-select/dist/declarations/src/utils";
import authService from "services/auth.service";
import { likedIconOff, likedIconOn } from "../../icons";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

interface IFavouriteField {
  customClassName?: string;
  recipe: any;
  isToltipActif?: boolean;
  isBtnDesing?: boolean;
  isRecipePage?: boolean;
  parentFunction?: any;
  isRefetchData?: boolean;
}

export const FavouriteField: React.FC<IFavouriteField> = ({
  recipe,
  parentFunction = null,
  isRefetchData = false,
  isRecipePage = false,
  customClassName,
  isBtnDesing = false,
  isToltipActif = true,
}) => {
  const isLoggedIn = authService.isLoggedIn();
  const [isFavorite, setFavorite] = useState(
    recipe?.isAddToFavoriteByCurrentUser,
  );

  const [addOrRemoveFavoriteRecipe] = useMutation(
    ADD_OR_REMOVE_FAVORITE_RECIPE,
  );

  return (
    <div className="h-10 grid justify-items-center">
      {isLoggedIn ? (
        <div>
          {isFavorite ? (
            <div
              className={`h-10 tooltip justify-items-center ${
                customClassName ? customClassName : "grid"
              }`}
            >
              <Button
                id="recipe-card-favoriteButton"
                type="blueIcon"
                className="h-10"
                isOnClickActive={false}
                haveIcon={true}
                onClick={() => {
                  if (!isRefetchData) setFavorite(!isFavorite);
                  // @ts-ignore: Object is possibly 'null'.
                  addOrRemoveFavoriteRecipe({
                    variables: {
                      recipeId: recipe?.id,
                    },
                  }).then(() => {
                    return parentFunction ? parentFunction() : null;
                  });
                }}
              >
                <i
                  className={`bx bxs-bookmark-heart bx-sm text-blue ${
                    isToltipActif ? "" : ""
                  }`}
                ></i>
                {!isToltipActif && "favoris"}
              </Button>
              {isToltipActif && (
                <span className="tooltiptext pt-2">Retirer des favoris</span>
              )}
            </div>
          ) : (
            <div
              className={`tooltip justify-items-center ${
                customClassName ? customClassName : "grid"
              }`}
            >
              <Button
                id="recipe-card-favoriteButton"
                type="FavoritedarkBlueIcon"
                rounded="lg"
                haveIcon={true}
                isOnClickActive={false}
                className="h-10"
                onClick={() => {
                  if (!isRefetchData) setFavorite(!isFavorite);
                  // @ts-ignore: Object is possibly 'null'.
                  addOrRemoveFavoriteRecipe({
                    variables: {
                      recipeId: recipe?.id,
                    },
                  }).then(() => {
                    return parentFunction ? parentFunction() : null;
                  });
                }}
              >
                <i
                  className={`bx bx-bookmark-heart bx-sm ${
                    isToltipActif ? "" : ""
                  }`}
                ></i>
                {!isToltipActif && "favoris"}
              </Button>
              {isToltipActif && (
                <span className="tooltiptext pt-2">Ajouter des favoris</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {" "}
          {isRecipePage ? (
            <Suspense fallback={<Loading />}>
              <ModalLogGreenit
                btn={
                  <Button
                    id="RecipePage-favorite-noLogged"
                    type="darkBlue"
                    rounded="lg"
                    haveIcon={true}
                    className="mr-1 h-10"
                  >
                    <i className="bx bx-bookmark-heart bx-sm mr-2"></i>
                    favoris
                  </Button>
                }
              ></ModalLogGreenit>
            </Suspense>
          ) : (
            <Suspense fallback={<Loading />}>
              <ModalLogGreenit
                btn={
                  <div className="tooltip flex w-full justify-center">
                    <Button
                      id="RecipeCard-favorite-noLogged"
                      type="darkBlue"
                      haveIcon={true}
                    >
                      <i
                        className={`bx bx-bookmark-heart bx-sm ${
                          isToltipActif ? "" : ""
                        }`}
                      ></i>
                    </Button>
                    <span className="absolute tooltiptext pt-10">
                      Ajouter au favoris
                    </span>
                  </div>
                }
              ></ModalLogGreenit>
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};
