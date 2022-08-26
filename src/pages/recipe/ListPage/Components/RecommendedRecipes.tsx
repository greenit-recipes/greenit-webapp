import React, { useEffect, useState } from "react";
import { useRecipesQuery } from "../../../../graphql";
import { Empty, RecipeCard } from "components";
import {
  annotateRecipeResult,
  getTagIdsByName,
} from "components/personalization/PersonalizationHelper";
import { cleanDataPlayload } from "helpers/session-helper";
import { useLazyQuery } from "@apollo/client";
import { ME } from "../../../../services/auth.service";

interface RecommendedRecipeProps {
  quantity?: number;
  particularities: any;
  ingredientAtHome: any;
  currentFilters?: any;
}

export const RecommendedRecipes: React.FC<RecommendedRecipeProps> = ({
  quantity = 4,
  ingredientAtHome,
  particularities,
  currentFilters = {},
}) => {
  const [showHomeRecipe, setShowHomeRecipe] = useState(
    localStorage.getItem("hasHomeRecipe__personalization") === "true",
  );

  const {
    error: errorPersonalization,
    loading: loadingPersonalization,
    data: dataPersonalization,
  } = useRecipesQuery({
    fetchPolicy: "cache-first",
    variables: {
      filter: {
        particularity: [
          JSON.stringify(getTagIdsByName(JSON.parse(particularities))),
        ],
        ingredientsAtHome: ingredientAtHome || [],
        ...cleanDataPlayload(currentFilters),
      },
    },
  });

  const {
    error: errorHomeRecipe,
    loading: loadingHomeRecipe,
    data: dataHomeRecipe,
  } = useRecipesQuery({
    fetchPolicy: "cache-first",
    variables: {
      filter: {
        id: [
          "729be958-b687-4a15-88a8-eea3dc3009d3",
          "328f79ee-a1f0-430c-9eff-9f8c1550e463",
          "8485c5ae-4175-474b-9107-9aa306874c5f",
          "0abe3c2c-1883-46db-a2c6-81ee46f7475d",
        ],
        ...cleanDataPlayload(currentFilters),
      },
    },
  });

  if (
    loadingPersonalization ||
    loadingHomeRecipe ||
    !dataPersonalization ||
    !dataHomeRecipe
  ) {
    return <Empty />;
  }

  const recipes = dataPersonalization?.allRecipes?.edges || [];
  let homeRecipes: any = [];
  if (showHomeRecipe) {
    homeRecipes = dataHomeRecipe?.allRecipes?.edges;
  }
  const allRecipes = homeRecipes.concat(recipes);

  if (recipes.length === 0) {
    return <Empty />;
  }

  return (
    <>
      {annotateRecipeResult(allRecipes?.slice(0, quantity), ingredientAtHome)
        // @ts-ignore
        .sort((a, b) => {
          return a.ingredientAtHomeRatio - b.ingredientAtHomeRatio;
        })
        // @ts-ignore
        .map(recipe => (
          <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
        ))}
    </>
  );
};
