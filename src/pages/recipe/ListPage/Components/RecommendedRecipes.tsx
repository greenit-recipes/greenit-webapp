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
  parentFunction?: any;
}

export const RecommendedRecipes: React.FC<RecommendedRecipeProps> = ({
  quantity = 4,
  ingredientAtHome,
  particularities,
  currentFilters = {},
  parentFunction,
}) => {
  const [showHomeRecipe, setShowHomeRecipe] = useState(
    localStorage.getItem("hasHomeRecipe__personalization") === "true",
  );

  useEffect(() => {
    if (localStorage.getItem("hasHomeRecipe__personalization") === "true") {
      !showHomeRecipe && setShowHomeRecipe(true);
    } else {
      showHomeRecipe && setShowHomeRecipe(false);
    }
  });

  const {
    error: errorPersonalization,
    loading: loadingPersonalization,
    data: dataPersonalization,
  } = useRecipesQuery({
    fetchPolicy: "cache-first",
    variables: {
      filter: {
        particularity: [
          //@ts-ignore
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
    parentFunction ? parentFunction(true) : null;
    return (
      <div className="flex justify-center">
        <Empty />
      </div>
    );
  } else {
    parentFunction ? parentFunction(false) : null;
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
