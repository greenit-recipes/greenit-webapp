import { useMutation } from "@apollo/client";
import { useState } from "react";
import { clapIcon } from "../../icons";
import { ADD_OR_REMOVE_LIKE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import authService from "services/auth.service";
import { Link } from "react-router-dom";

interface LikeField {
  className?: string;
  recipe: any;
  isRecipeCard?: boolean;
  parentFunction?: any;
}

export const LikeField: React.FC<LikeField> = ({
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
      className={isRecipeCard ? `flex absolute top-2 left-1/2 lg:left-36 w-2/5 lg:w-20 h-10 bg-white rounded-xl p-4 ${className}` : `flex top-2 left-1/2 lg:left-36 w-2/5 lg:w-20 h-10 bg-white rounded-xl p-4 ${className}`}
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
              src={clapIcon}
              className="self-center w-6 h-6 lg:w-8 lg:h-8 mb-1"
              alt="likes"
            />
          ) : (
            <p>Change l'image quand pas like</p>
          )}
        </button>
      ) : (
        <Link to="/connexion">
          <img
            src={clapIcon}
            className="self-center w-6 h-6 lg:w-8 lg:h-8 mb-1"
            alt="likes"
          />
        </Link>
      )}
      <div className="self-center text-sm lg:text-xl ml-1">{nbrLiked}</div>
    </div>
  );
};
