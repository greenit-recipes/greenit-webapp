import { useMutation } from "@apollo/client";
import { Loading } from "components/layout/Loading";
import { Button } from "components/misc";
import { getRandomKey } from "components/personalization/PersonalizationHelper";
import { ADD_OR_REMOVE_FAVORITE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import { classNames } from "react-select/dist/declarations/src/utils";
import authService from "services/auth.service";
import { likedIconOff, likedIconOn } from "../../icons";
import { NotificationAlert } from "./NotificationAlert";

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
              className={`tooltip justify-items-center ${
                customClassName ? customClassName : "grid"
              }`}
            >
              <Button
                id="recipe-card-favoriteButton"
                type="blueIcon"
                className={` ${isRecipePage ? "h-10" : "h-9"}`}
                isOnClickActive={false}
                haveIcon={true}
                onClick={() => {
                  if (!isRefetchData) setFavorite(!isFavorite);
                  // @ts-ignore: Object is possibly 'null'.
                  addOrRemoveFavoriteRecipe({
                    variables: {
                      recipeId: recipe?.id,
                    },
                  })
                    .then(() => {
                      return parentFunction ? parentFunction() : null;
                    })
                    .then(() => {
                      ReactDOM.render(
                        <NotificationAlert
                          key={getRandomKey("ingredient-limit-reached")}
                          type="alert"
                          titre="Recette retirée de tes favoris"
                        />,
                        document.getElementById("notif"),
                      );
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
                <span className="tooltiptext font-medium pt-1.5">
                  Retirer des favoris
                </span>
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
                className={` ${isRecipePage ? "h-10" : "h-9"}`}
                rounded="lg"
                haveIcon={true}
                isOnClickActive={false}
                onClick={() => {
                  if (!isRefetchData) setFavorite(!isFavorite);
                  // @ts-ignore: Object is possibly 'null'.
                  addOrRemoveFavoriteRecipe({
                    variables: {
                      recipeId: recipe?.id,
                    },
                  })
                    .then(() => {
                      return parentFunction ? parentFunction() : null;
                    })
                    .then(() => {
                      ReactDOM.render(
                        <NotificationAlert
                          key={getRandomKey("ingredient-limit-reached")}
                          type="success"
                          titre="Recette ajoutée à tes favoris"
                          text="Retrouve les dans ton profil !"
                        />,
                        document.getElementById("notif"),
                      );
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
                <span className="tooltiptext pt-1.5 font-medium">
                  Ajouter des favoris
                </span>
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
                      className="h-9"
                    >
                      <i
                        className={`bx bx-bookmark-heart bx-sm ${
                          isToltipActif ? "" : ""
                        }`}
                      ></i>
                    </Button>
                    <span className="absolute tooltiptext pt-9 font-medium">
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
