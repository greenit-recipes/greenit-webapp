import { getImagePath } from "helpers/image.helper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RecipeDifficulty, RecipeFragment } from "../../graphql";
import useIsMobile from "../../hooks/isMobile";
import { Icon } from "../misc";
import { FavouriteField } from "../layout/FavouriteField";
import { LikeField } from "components/layout/LikeField";
import "./RecipeCard.css";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe: RecipeFragment | null | undefined;
  inCarousel?: boolean;
  isProfilPage?: boolean;
  parentFunction?: any;
  disabledFavoriteRecipe?: boolean;
  isRefetchData?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
  inCarousel,
  isProfilPage,
  parentFunction = null,
  disabledFavoriteRecipe = false,
  isRefetchData = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isMobile = useIsMobile();

  const iconHeight = isMobile ? 10 : 16;
  const imageHeight = isMobile ? 60 : 96;
  const imageWidth = isMobile ? 44 : 60;
  const bandeauWidth = isMobile ? 44 : 60;

  return (
    <div className="transform hover:scale-105 ease-linear transition-all duration-150 px-2 mb-24 md:mb-16 lg:mb-10">
      <Link
        to={{
          pathname: `/recipes/${recipe?.urlId}`,
          state: { recipeId: recipe?.id },
        }}
        className={`inline-block ${!isMobile}`}
      >
        <div>
          <img
            src={getImagePath(recipe?.image)}
            className={`flex flex-col object-cover | ${
              enableShadow && "shadow-lg"
            } ${`h-${imageHeight} w-${imageWidth}`}
            rounded-3xl | justify-self-center smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
            // @ts-ignore
            onLoad={() => setImageLoaded(true)}
          ></img>
        </div>
      </Link>
      <LikeField recipe={recipe} isRecipeCard={true}></LikeField>
      <div
        className={`absolute | h-auto | mt-auto | bg-white shadow-lg rounded-3xl -bottom-20 lg:-bottom-12 ${`w-${bandeauWidth}`}`}
      >
        {!disabledFavoriteRecipe && (
          <div className={`absolute -top-4 lg:-top-6 w-${imageWidth} z-10`}>
            <FavouriteField
              isRefetchData={isRefetchData}
              parentFunction={parentFunction}
              recipe={recipe}
            />
          </div>
        )}
        <h1 className="subpixel-antialiased | text-center mt-5 p-2 text-sm lg:text-lg">
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
