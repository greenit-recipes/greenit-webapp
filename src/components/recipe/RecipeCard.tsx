import { getImagePath } from "helpers/image.helper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RecipeDifficulty, RecipeFragment } from "../../graphql";
import useIsMobile from "../../hooks/isMobile";
import { Icon } from "../misc";
import { FavouriteField } from "../layout/FavouriteField";
import { LikeField } from "components/layout/LikeField";

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
  const imageWidth = isMobile ? 44 : 60;
  const bandeauWidth = isMobile ? 44 : 60;
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
        <div>
          <img
            className={`flex flex-col object-cover | ${
              enableShadow && "shadow-lg"
            } ${`h-${imageHeight} w-${imageWidth}`}
            rounded-3xl | justify-self-center`}
            // @ts-ignore
            src={getImagePath(recipe?.image)}
          ></img>
        </div>
      </Link>
      <LikeField recipe={recipe} isRecipeCard={true}></LikeField>
      <div className={`absolute bottom-2/7 w-${imageWidth} z-10`}>
        <FavouriteField parentFunction={parentFunction} recipe={recipe} />
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
