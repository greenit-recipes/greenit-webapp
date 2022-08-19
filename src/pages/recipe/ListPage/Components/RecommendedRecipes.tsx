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
  particularities: any;
  ingredientAtHome: any;
}

export const RecommendedRecipes: React.FC<RecommendedRecipeProps> = ({
  quantity = 4,
  ingredientAtHome,
  particularities,
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
            getTagIdsByName(JSON.parse(particularities)),
          ),
        ], // [{ tagsSkin: ["00838ea5-bc78-4a11-a9fe-57d3e20aac71"], tagsHair: [], tagsPeculiarity: [] }],
        ingredientsAtHome: ingredientAtHome || [],
      },
    },
  });
  const recipes = dataPersonalization?.allRecipes?.edges || [];

  if (loadingPersonalization) {
    return <Empty />;
  }

  return (
    <>
      {annotateRecipeResult(recipes?.slice(0, quantity), ingredientAtHome)
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
