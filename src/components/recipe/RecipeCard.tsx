import { RouteName } from "App";
import { LikeField } from "components/layout/LikeField";
import { getImagePath } from "helpers/image.helper";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RecipeDifficulty } from "../../graphql";
import useIsMobile from "../../hooks/isMobile";
import { FavouriteField } from "../layout/FavouriteField";
import { Icon } from "../misc";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./RecipeCard.css";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe: any;
  isCarrousel?: boolean;
  isProfilPage?: boolean;
  parentFunction?: any;
  onClickFunctionListPage?: any;
  disabledFavoriteRecipe?: boolean;
  isRefetchData?: boolean;
  isDisplayUserBadge?: boolean;
  isLikeDisabled?: boolean;
  index?: number;
  amount?: number;
  id?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
  isCarrousel = false,
  parentFunction = null,
  onClickFunctionListPage = null,
  disabledFavoriteRecipe = false,
  isRefetchData = false,
  isLikeDisabled = false,
  isDisplayUserBadge = true,
  index,
  id,
  amount,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isMobile = useIsMobile();
  const imageHeight = isMobile ? 72 : 72;
  const imageWidth = isMobile ? 52 : 52;
  const bandeauWidth = isMobile ? 52 : 52;

  return (
    <div
      id={`${id}-recipe-card`}
      className="transform sm:hover:scale-105 ease-linear relative transition-all duration-150 px-1 mb-14 md:mb-16 lg:mb-10"
    >
      {amount && (
        <div
          className={`flex flex-col items-center pb-2 absolute right-0 mt-2 mr-3 w-8 h-${
            amount > 1 ? "14" : "8"
          } rounded-2xl bg-white`}
        >
          <div className="absolute top-0">
            <IconContext.Provider value={{ className: "text-3.5xl text-blue" }}>
              <BsFillCheckCircleFill />
            </IconContext.Provider>
          </div>
          {amount > 1 && (
            <span className="absolute mt-1.5 top-6 font-semibold text-sm">
              x{amount}
            </span>
          )}
        </div>
      )}
      <Link
        to={{
          pathname: `${RouteName.recipes}/${recipe?.urlId}`,
        }}
        onClick={() => {
          return onClickFunctionListPage
            ? onClickFunctionListPage(index)
            : null;
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
            rounded-t-2xl | justify-self-center smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
            // @ts-ignore
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          ></img>
        </div>
      </Link>
      {!isLikeDisabled && (
        <LikeField
          recipe={recipe}
          isRecipeCard={true}
          isCarrousel={isCarrousel}
        ></LikeField>
      )}

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
          onClick={() => {
            return onClickFunctionListPage
              ? onClickFunctionListPage(index)
              : null;
          }}
          to={{
            pathname: `${RouteName.recipes}/${recipe?.urlId}`,
          }}
        >
          <h4 className="text-center mt-4 p-1">{recipe?.name}</h4>
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
