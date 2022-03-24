import { getImagePath } from "helpers/image.helper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RecipeDifficulty } from "../../graphql";
import useIsMobile from "../../hooks/isMobile";
import { Icon } from "../misc";
import { FavouriteField } from "../layout/FavouriteField";
import { LikeField } from "components/layout/LikeField";
import "./RecipeCard.css";
import { RouteName } from "App";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe: any;
  isCarrousel?: boolean;
  isProfilPage?: boolean;
  parentFunction?: any;
  disabledFavoriteRecipe?: boolean;
  isRefetchData?: boolean;
  isDisplayUserBadge?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
  isCarrousel = false,
  parentFunction = null,
  disabledFavoriteRecipe = false,
  isRefetchData = false,
  isDisplayUserBadge = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isMobile = useIsMobile();

  const imageHeight = isMobile ? 56 : 72;
  const imageWidth = isMobile ? 40 : 48;
  const bandeauWidth = isMobile ? 40 : 48;

  return (
    <div className="transform sm:hover:scale-105 ease-linear relative transition-all duration-150 px-1 mb-14 md:mb-16 lg:mb-10">
      <Link
        to={{
          pathname: `${RouteName.recipes}/${recipe?.urlId}`,
        }}
        className={`inline-block ${!isMobile}`}
      >
        <div>
          <img
            src={getImagePath(recipe?.image)}
            alt={recipe?.name}
            className={`flex flex-col object-cover | ${
              enableShadow && "shadow-lg"
            } ${`h-${imageHeight} w-${imageWidth}`}
            rounded-2xl | justify-self-center smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
            // @ts-ignore
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          ></img>
        </div>
      </Link>
      <LikeField recipe={recipe} isRecipeCard={true} isCarrousel={isCarrousel}></LikeField>
      <div
        className={`absolute | h-auto | mt-auto | bg-white shadow-lg rounded-2xl -bottom-10 lg:-bottom-12 ${`w-${bandeauWidth}`}`}
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
        <Link
          to={{
            pathname: `${RouteName.recipes}/${recipe?.urlId}`,
          }}
        >
          <div className="fontQSmedium text-center mt-4 p-1 text-xs lg:text-sm">
            {recipe?.name}
          </div>
          <Icon
            nbOfIngredient={recipe?.numberOfIngredients}
            difficulty={
              recipe?.difficulty === RecipeDifficulty.Beginner
                ? "Facile"
                : recipe?.difficulty === RecipeDifficulty.Intermediate
                ? "Moyen"
                : "Expert"
            }
          />
        </Link>
      </div>
    </div>
  );
};
