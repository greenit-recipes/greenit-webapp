import Carousel from "react-multi-carousel";
import useIsMobile from "hooks/isMobile";
import { RecipeCard } from "components";
import { useRecipesQuery } from "../../../../graphql";
import "./SimilarRecipe.css";

interface ISimilarRecipe {
  data: any;
}

export const SimilarRecipe: React.FC<ISimilarRecipe> = (data) => {
  const isMobile = useIsMobile();

  const { data: dataSimilarRecipe } = useRecipesQuery({
    fetchPolicy: "no-cache",
    // @ts-ignore
    variables: {
      first: 5,
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
      {isMobile ? (
        <div className="w-full py-4 overflow-x-auto">
          <div className="w-max flex">
            {
              // @ts-ignore
              recipes?.map((recipe) => (
                <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
              ))
            }
          </div>
        </div>
      ) : (
        <Carousel
          swipeable={true}
          showDots={true}
          responsive={responsiveCarouselLanding}
          infinite={true}
          ssr={true}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass={
            isMobile
              ? "carousel-similar-recipe-mobile"
              : "carousel-similar-recipe"
          }
          customTransition="transform 300ms ease-in-out"
          dotListClass={
            isMobile ? "custom-dot-list-style-mobile" : "custom-dot-list-style"
          }
          itemClass={isMobile ? "carousel-item-mobile" : "carousel-item"}
        >
          {
            // @ts-ignore
            recipes?.map((recipe) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} isCarrousel={true}/>
            ))
          }
        </Carousel>
      )}
    </>
  );
};
