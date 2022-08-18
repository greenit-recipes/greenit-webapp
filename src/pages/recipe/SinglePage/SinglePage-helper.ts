import { includes } from "lodash";
import { gql } from "@apollo/client";
import { client } from "index";

export const ADD_OR_REMOVE_INGREDIENT_AT_HOME = gql`
  mutation createOrDeleteIngredientAtHomeUser(
    $ingredientAtHome: IngredientIdsInput!
  ) {
    createOrDeleteIngredientAtHomeUser(ingredientAtHome: $ingredientAtHome) {
      success
    }
  }
`;

export const ADD_OR_REMOVE_INGREDIENT_SHOPPING_LIST = gql`
  mutation createOrDeleteIngredientShoppingList(
    $ingredientShoppingList: IngredientIdsInput!
  ) {
    createOrDeleteIngredientShoppingList(
      ingredientShoppingList: $ingredientShoppingList
    ) {
      success
    }
  }
`;

const ADD_VIEW_RECIPE = gql`
  mutation addViewRecipe($recipeId: String!) {
    addViewRecipe(recipeId: $recipeId) {
      success
    }
  }
`;

const requestRefreshToken = async (recipeId: string) => {
  return client.mutate({
    mutation: ADD_VIEW_RECIPE,
    variables: {
      recipeId,
    },
  });
};

export const checkUserAlreadyViewRecipe = (idRecipe: string) => {
  if (!idRecipe) return;
  if (localStorage.getItem("recipeView")) {
    if (includes(localStorage.getItem("recipeView"), idRecipe)) {
      return;
    }
    // @ts-ignore
    localStorage.setItem(
      "recipeView",
      JSON.stringify([
        /* @ts-ignore */
        ...JSON.parse(localStorage.getItem("recipeView")),
        idRecipe,
      ]),
    );
    requestRefreshToken(idRecipe);
  } else {
    localStorage.setItem("recipeView", JSON.stringify([idRecipe]));
    requestRefreshToken(idRecipe);
  }
};
