import { gql } from "@apollo/client";

export const SEARCH_AUTO_COMPLETE_RECIPE = gql`
  query searchAutoCompleteRecipes($search: String) {
    searchAutoCompleteRecipes(search: $search) {
      recipes {
        name
        urlId
      }
      ingredients {
        name
      }
      otherSearch
    }
  }
`;
