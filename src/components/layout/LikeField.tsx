import { useMutation } from "@apollo/client";
import { Loading } from "components/layout/Loading";
import { ADD_OR_REMOVE_LIKE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { Suspense, useState } from "react";
import authService from "services/auth.service";
import { clapIconOff, clapIconOn } from "../../icons";
const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

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
          ? `absolute h-6 lg:h-8 w-12 lg:w-14 z-0 ${
              isCarrousel ? "like-greenit top-1" : "top-1 right-2"
            } | grid justify-items-center | bg-white rounded-xl ${className}`
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
          <h2 className="flex self-center text-base lg:text-lg mr-1">
            {nbrLiked}
          </h2>
          {isLiked ? (
            <i className="bx bxs-donate-heart flex self-center text-lg"></i>
          ) : (
            <i className="bx bx-donate-heart flex self-center text-lg"></i>
          )}
        </button>
      ) : (
        <Suspense fallback={<Loading />}>
          <ModalLogGreenit
            btn={
              <div className="flex self-center w-6 h-6 lg:w-8 lg:h-8">
                <i className="bx bx-donate-heart flex self-center text-lg mr-1"></i>
                <h2 className="flex self-center text-lg lg:text-lg">
                  {nbrLiked}
                </h2>
              </div>
            }
          ></ModalLogGreenit>
        </Suspense>
      )}
    </div>
  );
};
