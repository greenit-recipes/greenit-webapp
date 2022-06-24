import useIsMobile from "hooks/isMobile";
import { RecipeCard } from "components";
import { useRecipesQuery } from "../../../../graphql";
import "./SimilarRecipe.css";
import { ExploreMore } from "components/recipe/ExploreMore";

interface ISimilarRecipe {
  data: any;
}

export const SimilarRecipe: React.FC<ISimilarRecipe> = data => {
  const isMobile = useIsMobile();

  const { data: dataSimilarRecipe } = useRecipesQuery({
    fetchPolicy: "no-cache",
    // @ts-ignore
    variables: {
      first: 4,
      filter: {
        category: [data?.data?.category?.name],
        isRandomList: true,
        excludeId: data?.data?.id,
      },
    },
  });
  const recipes = dataSimilarRecipe?.allRecipes?.edges || [];

  const responsiveCarouselLanding = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1224, min: 664 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (!dataSimilarRecipe) {
    return <p></p>;
  }

  return (
    <>
      <div className="md:flex md:justify-center w-full pt-4 pl-4 overflow-x-auto pb-12">
        <div className="flex w-max">
          {recipes?.slice(0, 3).map(recipe => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
          <ExploreMore filter={`category=${data?.data?.category?.name}`} />
        </div>
      </div>
    </>
  );
};
