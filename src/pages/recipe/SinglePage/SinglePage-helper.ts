import { includes } from "lodash";
import { gql } from "@apollo/client";
import { client } from "index";


const ADD_VIEW_RECIPE = gql`
mutation addViewRecipe($recipeId: String!) {
    addViewRecipe(recipeId: $recipeId) {
      success
    }
  }  
`;

const requestRefreshToken = async (recipeId: string) => {
    return await client.mutate({
      mutation: ADD_VIEW_RECIPE,
      variables: {
        recipeId,
      },
    });
  };

export const checkUserAlreadyViewReipe = (idRecipe: string) => {
  if (!idRecipe) return;
  if (localStorage.getItem("hasAlreadyViewThisRecipe")) {
    if (includes(localStorage.getItem("hasAlreadyViewThisRecipe"), idRecipe)) {
      return;
    }
    // @ts-ignore
    localStorage.setItem("hasAlreadyViewThisRecipe",JSON.stringify([...JSON.parse(localStorage.getItem("hasAlreadyViewThisRecipe")), idRecipe]));
    requestRefreshToken(idRecipe)
  } else {
    localStorage.setItem("hasAlreadyViewThisRecipe", JSON.stringify([idRecipe]));
    requestRefreshToken(idRecipe)
  }
};
