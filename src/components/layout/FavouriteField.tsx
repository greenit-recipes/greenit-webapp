import React, { useState } from "react";
import { likedIconOn, likedIconOff } from "../../icons";
import authService from "services/auth.service";
import { RecipeFragment } from "../../graphql";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  ADD_OR_REMOVE_FAVORITE_RECIPE,
} from "pages/CreateRecipe/CreateRecipeRequest";

interface FavouriteField {
  className?: string;
  recipe: any;
  parentFunction?: any;
  isRefetchData?: boolean;
}

export const FavouriteField: React.FC<FavouriteField> = ({
  recipe,
  parentFunction = null,
  isRefetchData = false,
}) => {
  const isLoggedIn = authService.isLoggedIn();
  const [isFavorite, setFavorite] = useState(
    recipe?.isAddToFavoriteByCurrentUser
  );

  const [addOrRemoveFavoriteRecipe] = useMutation(
    ADD_OR_REMOVE_FAVORITE_RECIPE
  );

  return (
    <div className="grid justify-items-center">
      {isLoggedIn ? (
        <button
          onClick={() => {
            if(!isRefetchData) setFavorite(!isFavorite);
            // @ts-ignore: Object is possibly 'null'.
            addOrRemoveFavoriteRecipe({
              variables: {
                recipeId: recipe?.id,
              },
            }).then(() => {
              return parentFunction ? parentFunction() : null
            });
          }}
        >
          {isFavorite ? (
            <img className="w-9 h-9 lg:w-12 lg:h-12" alt="like" src={likedIconOn} />
          ) : (
            <img className="w-9 h-9 lg:w-12 lg:h-12" alt="dislike" src={likedIconOff} />
          )}
        </button>
      ) : (
        <Link to="/register">
          <img className="w-9 h-9 lg:w-12 lg:h-12" src={likedIconOff} />
        </Link>
      )}
    </div>
  );
};
