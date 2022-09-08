import { useMutation } from "@apollo/client";
import { Button } from "components";
import { Loading } from "components/layout/Loading";
import { ADD_OR_REMOVE_LIKE_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { Suspense, useState } from "react";
import authService from "services/auth.service";
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
    <div>
      {isLoggedIn ? (
        <Button
          id="RecipePage-likeRecipe-logged"
          type="darkBlue"
          haveIcon={true}
          className="h-10"
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
            <div className="flex items-center gap-1">
              <i className="bx bxs-donate-heart text-2xl"></i>
              <p>{nbrLiked} soutiens</p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <i className="bx bx-donate-heart text-2xl"></i>
              <p>soutien</p>
            </div>
          )}
        </Button>
      ) : (
        <Suspense fallback={<Loading />}>
          <ModalLogGreenit
            btn={
              <Button
                id="RecipePage-likeRecipe-nologged"
                type="darkBlue"
                haveIcon={true}
                className="h-10"
              >
                <i className="bx bx-donate-heart text-2xl"></i>
                <p className="ml-1">soutien</p>
              </Button>
            }
          ></ModalLogGreenit>
        </Suspense>
      )}
    </div>
  );
};
