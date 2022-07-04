import { useMutation } from "@apollo/client";
import { Loading } from "components/layout/Loading";
import { Button } from "components/misc";
import { ADD_OR_REMOVE_FAVORITE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { Suspense, useState } from "react";
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
    <div className="grid justify-items-center">
      {isLoggedIn ? (
        <div>
          {isFavorite ? (
            <div
              className={`tooltip justify-items-center ${
                customClassName ? customClassName : "grid"
              }`}
            >
              <Button
                id="favorite"
                type="darkBlue"
                rounded="lg"
                haveIcon={true}
                className="mr-1"
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
                  className={`bx bxs-bookmark-heart bx-sm ${
                    !isToltipActif ? "" : ""
                  }`}
                ></i>
                {!isToltipActif && "favoris"}
              </Button>
              {isToltipActif && (
                <span className="tooltiptext mt-1">Retirer des favoris</span>
              )}
            </div>
          ) : (
            <div
              className={`tooltip justify-items-center ${
                customClassName ? customClassName : "grid"
              }`}
            >
              <Button
                id="favorite"
                type="darkBlue"
                rounded="lg"
                haveIcon={true}
                className="mr-1"
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
                <span className="tooltiptext mt-1">Retirer des favoris</span>
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
                    id="favorite"
                    type="darkBlue"
                    rounded="lg"
                    haveIcon={true}
                    className="mr-1"
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
                  <button className={isBtnDesing ? "btn-single-page" : ""}>
                    <div
                      className={`tooltip justify-items-center ${
                        customClassName ? customClassName : "grid"
                      }`}
                    >
                      <img
                        className="w-10 h-10"
                        alt="dislike button"
                        src={likedIconOff}
                        loading="lazy"
                      />
                      <span className="tooltiptext">Ajouter aux favoris</span>{" "}
                    </div>
                  </button>
                }
              ></ModalLogGreenit>
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};
