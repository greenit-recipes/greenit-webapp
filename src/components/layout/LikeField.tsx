import { useMutation } from "@apollo/client";
import { useState } from "react";
import { clapIconOn, clapIconOff } from "../../icons";
import { ADD_OR_REMOVE_LIKE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import authService from "services/auth.service";
import { Link } from "react-router-dom";
import { RouteName } from "App";

interface ILikeField {
  className?: string;
  recipe: any;
  isCarrousel?: any;
  isRecipeCard?: boolean;
  parentFunction?: any;
}

export const LikeField: React.FC<ILikeField> = ({
  className,
  isRecipeCard = true,
  recipe,
  isCarrousel = false,
  parentFunction = null,
}) => {
  const [isLiked, setLiked] = useState(recipe?.isLikedByCurrentUser);
  const [nbrLiked, setNbrLiked] = useState(recipe?.numberOfLikes);
  const [addOrRemoveLikeRecipe] = useMutation(ADD_OR_REMOVE_LIKE_RECIPE);
  const isLoggedIn = authService.isLoggedIn();

  return (
    <div
      className={
        isRecipeCard
          ? `absolute h-6 lg:h-8 w-12 lg:w-14  ${isCarrousel ? "like-greenit top-1": "top-1 right-2"} | grid justify-items-center | bg-white rounded-xl ${className}`
          : `flex ${className}`
      }
    >
      {isLoggedIn ? (
        <button
          className="flex"
          onClick={() => {
            setLiked(!isLiked);
            // @ts-ignore
            setNbrLiked(!isLiked ? nbrLiked + 1 : nbrLiked - 1);
            // @ts-ignore: Object is possibly 'null'.
            addOrRemoveLikeRecipe({
              variables: {
                recipeId: recipe?.id,
              },
            }).then(() => (parentFunction ? parentFunction() : null));
          }}
        >
          {isLiked ? (
            <img
              src={clapIconOn}
              className="flex self-center w-6 h-6 lg:w-7 lg:h-7 mb-1"
              alt="likes"
              loading="lazy"
            />
          ) : (
            <img
              src={clapIconOff}
              className="flex self-center w-6 h-6 lg:w-7 lg:h-7 mb-1"
              alt="likes"
              loading="lazy"
            />
          )}
          <div className="flex self-center ml-1">{nbrLiked}</div>
        </button>
      ) : (
        <Link to={RouteName.register} className="flex self-center w-6 h-6 lg:w-7 lg:h-7 mr-3">
          <img
            src={clapIconOff}
            className="flex self-center w-6 h-6 lg:w-7 lg:h-7"
            alt="likes"
            loading="lazy"
          />
          <div className="flex self-center ml-1">{nbrLiked}</div>
        </Link>
      )}
      
    </div>
  );
};
