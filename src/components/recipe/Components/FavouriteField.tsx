import React, { useState } from "react";
import { likedIconOn, likedIconOff } from "../../../icons";
import useIsMobile from "../../../hooks/isMobile";
import authService from "services/auth.service";
import { RecipeFragment } from "../../../graphql";
import { useMutation } from "@apollo/client";
import {
  ADD_OR_REMOVE_FAVORITE_RECIPE,
  ADD_OR_REMOVE_LIKE_RECIPE,
} from "pages/CreateRecipe/CreateRecipeRequest";

interface FavouriteField {
  className?: string;
  recipe: RecipeFragment | null | undefined;
}

export const FavouriteField: React.FC<FavouriteField> = ({ recipe }) => {
  const isLoggedIn = authService.isLoggedIn();
  const isMobile = useIsMobile();
  const [isLiked, setLiked] = useState(recipe?.isLikedByCurrentUser);
  const [isFavorite, setFavorite] = useState(
    recipe?.isAddToFavoriteByCurrentUser
  );

  const [addOrRemoveLikeRecipe] = useMutation(ADD_OR_REMOVE_LIKE_RECIPE);
  const [addOrRemoveFavoriteRecipe] = useMutation(
    ADD_OR_REMOVE_FAVORITE_RECIPE
  );

  return (
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
            });
          }}
        >
          {isFavorite ? (
            <img className="w-8 h-8 lg:w-12 lg:h-12" src={likedIconOn} />
          ) : (
            <img className="w-8 h-8 lg:w-12 lg:h-12" src={likedIconOff} />
          )}
        </button>
      )}
    </div>
  );
};
