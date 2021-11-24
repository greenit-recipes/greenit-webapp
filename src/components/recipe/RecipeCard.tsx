import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../misc";
import useIsMobile from "../../hooks/isMobile";
import { RecipeDifficulty, RecipeFragment } from "../../graphql";
<<<<<<< HEAD
import { useMutation } from "@apollo/client";
import {
  ADD_OR_REMOVE_FAVORITE_RECIPE,
  ADD_OR_REMOVE_LIKE_RECIPE,
} from "pages/CreateRecipe/CreateRecipeRequest";
import authService from "services/auth.service";
import { getImagePath } from "helpers/image.helper";
=======
>>>>>>> bf42135 (recipecards responsive + login)
import { LikeField } from "./Components/LikeField";
import { FavouriteField } from "./Components/FavouriteField";

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

  const [nbrLiked, setNbrLiked] = useState(recipe?.numberOfLikes);
  const iconHeight = isMobile ? 10 : 16;
  const imageHeight = isMobile ? 60 : 96;
  const imageWidth = isMobile ? 40 : 60;
  const bandeauWidth = isMobile ? 40 : 60;
  const nbOfIngredients = recipe?.numberOfIngredients;

  return (
    <div className="relative m-2 mb-14 lg:m-4">
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
            className={`flex flex-col object-cover | ${
              enableShadow && "shadow-lg"
            } ${`h-${imageHeight} w-${imageWidth}`}
            rounded-3xl | justify-self-center`}
            src={getImagePath(recipe?.image)}
            ></img>
        </div>
      </Link>
      <div className={`absolute bottom-2/7 w-${imageWidth} z-10`}>
        <FavouriteField
         recipe={recipe}
        />
      </div>
      <div
        className={`h-auto | mt-auto | bg-white shadow-lg rounded-3xl absolute top-40 lg:top-64 ${`w-${bandeauWidth}`}`}
      >
        <h1 className="subpixel-antialiased | text-center mt-5 p-1 text-sm lg:text-xl">
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
