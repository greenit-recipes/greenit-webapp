import React from "react";
import { useRecipesQuery } from "../../../../graphql";
import { Empty, RecipeCard } from "components";
import {
  annotateRecipeResult,
  getIngredientAtHomeCount,
  getTagIdsByName,
} from "components/personalization/PersonalizationHelper";

interface RecommendedRecipeProps {
  quantity?: number;
}

export const RecommendedRecipes: React.FC<RecommendedRecipeProps> = ({
  quantity = 4,
}) => {
  const {
    error: errorPersonalization,
    loading: loadingPersonalization,
    data: dataPersonalization,
  } = useRecipesQuery({
    fetchPolicy: "cache-first",
    variables: {
      filter: {
        particularity: [
          JSON.stringify(
            // @ts-ignore
            getTagIdsByName(JSON.parse(window.me.particularitySearch)),
          ),
        ], // [{ tagsSkin: ["00838ea5-bc78-4a11-a9fe-57d3e20aac71"], tagsHair: [], tagsPeculiarity: [] }],
        // @ts-ignore
        ingredientsAtHome: window.me.ingredientAtHomeUser || [],
      },
    },
  });
  const recipes = dataPersonalization?.allRecipes?.edges || [];

  if (loadingPersonalization) {
    return <Empty />;
  }

  return (
    <>
      {annotateRecipeResult(
        recipes?.slice(0, quantity),
        // @ts-ignore
        window.me.ingredientAtHomeUser,
      )
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
