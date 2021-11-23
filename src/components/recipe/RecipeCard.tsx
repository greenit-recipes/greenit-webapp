import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../misc";
import { likedIconOn, likedIconOff } from "../../icons";
import useIsMobile from "../../hooks/isMobile";
import { RecipeDifficulty, RecipeFragment } from "../../graphql";
import { useMutation } from "@apollo/client";
import {
  ADD_OR_REMOVE_FAVORITE_RECIPE,
  ADD_OR_REMOVE_LIKE_RECIPE,
} from "pages/CreateRecipe/CreateRecipeRequest";
import authService from "services/auth.service";
import { getImagePath } from "helpers/image.helper";
import { LikeField } from "./Components/LikeField";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe: RecipeFragment | null | undefined;
  inCarousel?: boolean;
  isProfilPage?: boolean;
  parentFunction?: any;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
  inCarousel,
  isProfilPage,
  parentFunction = null,
}) => {
  const isMobile = useIsMobile();
  const [isLiked, setLiked] = useState(recipe?.isLikedByCurrentUser);
  const [isFavorite, setFavorite] = useState(
    recipe?.isAddToFavoriteByCurrentUser
  );
  const [nbrLiked, setNbrLiked] = useState(recipe?.numberOfLikes);
  const iconHeight = isMobile ? 12 : 16;
  const imageHeight = isMobile ? 60 : 96;
  const imageWidth = isMobile ? 40 : 60;
  const bandeauWidth = isMobile ? 40 : 60;
  const isLoggedIn = authService.isLoggedIn();
  const nbOfIngredients = recipe?.numberOfIngredients;

  const [addOrRemoveLikeRecipe] = useMutation(ADD_OR_REMOVE_LIKE_RECIPE);
  const [addOrRemoveFavoriteRecipe] = useMutation(
    ADD_OR_REMOVE_FAVORITE_RECIPE
  );

  return (
    <div className="relative mb-20">
      <Link
        to={{
          pathname: `/recipes/${recipe?.urlId}`,
          state: { recipeId: recipe?.id },
        }}
        className={`inline-block ${!isMobile}`}
      >
        <LikeField>{nbrLiked}</LikeField>

        <div>
          <img
            className={`flex flex-col | ${
              enableShadow && "shadow-lg"
            } ${`h-${imageHeight} w-${imageWidth}`}
            rounded-3xl | justify-self-center`}
            src={getImagePath(recipe?.image)}
            ></img>
        </div>
      </Link>
      <div className="absolute bottom-26 w-64 z-10">
        <div className="grid justify-items-center">
          {isLoggedIn && (
            <button
              onClick={() => {
                setFavorite(!isFavorite);
                // @ts-ignore: Object is possibly 'null'.
                addOrRemoveFavoriteRecipe({
                  variables: {
                    recipeId: recipe?.id,
                  },
                }).then(() => parentFunction ? parentFunction() : null);
              }}
            >
              {isFavorite ? (
                <img className="w-12 h-12" src={likedIconOn} />
              ) : (
                <img className="w-12 h-12" src={likedIconOff} />
              )}
            </button>
          )}
        </div>
      </div>
      <div
        className={`h-auto | mt-auto | bg-white shadow-lg rounded-3xl absolute top-64 ${`w-${bandeauWidth}`}`}
      >
        <h1 className="subpixel-antialiased | text-center mt-5 p-1 text-base md:text-xl">
          {recipe?.name}
        </h1>
        <Icon
          height={iconHeight}
          nbOfIngredient={recipe?.numberOfIngredients}
          difficulty={
            recipe?.difficulty === RecipeDifficulty.Beginner
              ? "Facile"
              : recipe?.difficulty === RecipeDifficulty.Intermediate
              ? "Intermediaire"
              : "Expert"
          }
        />
      </div>
    </div>
  );
};
