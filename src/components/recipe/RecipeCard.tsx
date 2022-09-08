import { RouteName } from "App";
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
import { has } from "lodash";

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
  const imageWidth = isMobile ? 48 : 48;
  const bandeauWidth = isMobile ? 48 : 48;

  return (
    <div
      id={`${id}-recipe-card`}
      className="transform sm:hover:scale-105 ease-linear relative transition-all duration-150 px-1 mb-8 lg:mb-0"
    >
      {/*Code below is just for the bowx selling part*/}
      {amount && (
        <div
          className={`flex flex-col items-center pb-2 absolute right-0 mt-2 mr-3 w-8 h-${
            amount > 1 ? "14" : "8"
          } rounded-2xl`}
        >
          <div className="absolute top-10">
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
      {has(recipe, "ingredientAtHomeCount") && (
        <div className="absolute right-1">
          <div className="flex items-center space-x-1 | bg-blue text-white rounded-bl-lg rounded-tr-lg pl-2 py-0.5 pr-3">
            <i className="bx bx-lemon text-lg"></i>
            <span className="font-normal">
              {recipe?.ingredientAtHomeCount}/{recipe?.numberOfIngredients}
            </span>
          </div>
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
        <img
          src={getImagePath(recipe?.image)}
          alt={recipe?.name}
          className={`flex flex-col object-cover | ${
            enableShadow && "shadow-flat"
          } ${`h-${imageHeight} w-${imageWidth}`}
            rounded-xl | justify-self-center smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
          // @ts-ignore
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        ></img>
      </Link>
      {!disabledFavoriteRecipe && (
        <div className={`absolute top-60 w-${imageWidth} z-10`}>
          <FavouriteField
            isRefetchData={isRefetchData}
            parentFunction={parentFunction}
            recipe={recipe}
          />
        </div>
      )}

      <div className={` h-auto ${`w-${bandeauWidth}`}`}>
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
          <h4 className="text-center p-1 leading-5">{recipe?.name}</h4>
          <Icon
            time={recipe?.duration}
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
