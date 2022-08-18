import { gql } from "@apollo/client";

export const SEARCH_AUTO_COMPLETE_RECIPE = gql`
  query searchAutoCompleteRecipes(
    $search: String
    $isOnlyIngredients: Boolean
  ) {
    searchAutoCompleteRecipes(
      search: $search
      isOnlyIngredients: $isOnlyIngredients
    ) {
      recipes {
        name
        urlId
      }
      ingredients {
        id
        name
        image
      }
      totalRecipes
    }
  }
`;
