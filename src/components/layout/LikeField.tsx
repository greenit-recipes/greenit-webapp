import { useMutation } from "@apollo/client";
import { ModalLogGreenit }  from "components/layout/ModalLogGreenit/ModalLogGreenit";
import { ADD_OR_REMOVE_LIKE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import { useState } from "react";
import authService from "services/auth.service";
import { clapIconOff, clapIconOn } from "../../icons";

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
          <h2 className="flex self-center text-base lg:text-lg">
            {nbrLiked}
          </h2>
        </button>
      ) : (
        <ModalLogGreenit
          btn={
            <div className="flex self-center w-6 h-6 lg:w-8 lg:h-8 mr-3">
              <img
                src={clapIconOff}
                className="flex self-center w-6 h-6 lg:w-8 lg:h-8"
                alt="likes"
                loading="lazy"
              />
              <h2 className="flex self-center text-lg lg:text-lg">
                {nbrLiked}
              </h2>
            </div>
          }
        ></ModalLogGreenit>
      )}
    </div>
  );
};
