import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../misc";
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
  const iconHeight = isMobile ? 18 : 20;
  const iconWidth = isMobile ? 16 : 18;
  const isLoggedIn = authService.isLoggedIn();

  const [addOrRemoveLikeRecipe] = useMutation(ADD_OR_REMOVE_LIKE_RECIPE);
  const [addOrRemoveFavoriteRecipe] = useMutation(
    ADD_OR_REMOVE_FAVORITE_RECIPE
  );

  return (
    <div className="relative">
      <Link
        to={{
          pathname: `/recipes/${recipe?.urlId}`,
          state: { recipeId: recipe?.id },
        }}
        className={`mb-9 ${!isMobile && "ml-9"}`}
      >
        <LikeField>
          {nbrLiked}
        </LikeField>
        
        <img
        className={`flex flex-col | ${
          enableShadow && "shadow-lg"
        } rounded-3xl | justify-self-center`}
        style={{
          height: "28rem",
          width: "20rem",
        }}
        src={getImagePath(recipe?.image)}
        ></img>        
        
        <div
          className="h-auto | mt-auto | bg-white shadow-lg rounded-3xl absolute bottom-0"
          style={{
            width: "20rem",
          }}
        >
          <h1 className="subpixel-antialiased| ml-10 mr-5 | flex py-3 justify-center text-lg md:text-xl">
            {recipe?.name}
          </h1>
          <div className="flex flex-row | justify-between | ml-6 mr-6">
            <Icon
              height={iconHeight}
              width={iconWidth}
              icon={recipe?.category?.name}
            />
            <Icon
              height={iconHeight}
              width={iconWidth}
              icon={
                recipe?.difficulty === RecipeDifficulty.Beginner
                  ? "Facile"
                  : recipe?.difficulty === RecipeDifficulty.Intermediate
                  ? "Intermediaire"
                  : "Expert"
              }
            />
            <Icon
              height={iconHeight}
              width={iconWidth}
              icon={
                recipe
                  ? recipe?.duration < 15
                    ? "15 min"
                    : recipe?.duration < 30
                    ? "30 min"
                    : "1 heure"
                  : undefined
              }
            />
          </div>
        </div>
      </Link>
      <div className="relative">
        <div>
          {isLoggedIn && (
            <button
              onClick={() => {
                setLiked(!isLiked);
                // @ts-ignore: Object is possibly 'null'.
                setNbrLiked(!isLiked ? nbrLiked + 1 : nbrLiked - 1);
                addOrRemoveLikeRecipe({
                  variables: {
                    recipeId: recipe?.id,
                  },
                }).then(() => parentFunction ? parentFunction() : null);
              }}
            >
              {isLiked ? "dislike" : "like batard"}
            </button>
          )}
        </div>
        <div>
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
              {isFavorite ? "Enlever des favoris" : "Ajouter au favoris"}
            </button>
          )}
        </div>
        <div>
          {recipe?.numberOfIngredients && (
            <div>nbr ingredients === {recipe?.numberOfIngredients}</div>
          )}
        </div>
      </div>
    </div>
  );
};
