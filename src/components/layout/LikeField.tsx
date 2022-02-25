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
  isRecipeCard?: boolean;
  parentFunction?: any;
}

export const LikeField: React.FC<ILikeField> = ({
  className,
  isRecipeCard = true,
  recipe,
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
          ? `absolute h-8 lg:h-9 w-14 lg:w-16 top-1 left-26 lg:left-36 | grid justify-items-center | bg-white rounded-xl ${className}`
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
              className="flex self-center w-7 h-7 lg:w-8 lg:h-8 mb-1"
              alt="likes"
              loading="lazy"
            />
          ) : (
            <img
              src={clapIconOff}
              className="flex self-center w-7 h-7 lg:w-8 lg:h-8 mb-1"
              alt="likes"
              loading="lazy"
            />
          )}
          <h2 className="flex self-center text-base lg:text-lg ml-1">{nbrLiked}</h2>
        </button>
      ) : (
        <Link to={RouteName.register} className="flex self-center w-7 h-7 lg:w-8 lg:h-8 mr-3">
          <img
            src={clapIconOff}
            className="flex self-center w-7 h-7 lg:w-8 lg:h-8"
            alt="likes"
            loading="lazy"
          />
          <h2 className="flex self-center text-lg lg:text-lg ml-1">{nbrLiked}</h2>
        </Link>
      )}
      
    </div>
  );
};
