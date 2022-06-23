import { getImagePath } from "helpers/image.helper";
import { momentGreenitUs } from "helpers/time.helper";
import { map } from "lodash";
import { Helmet } from "react-helmet";

interface IHelmetRecipe {
  recipe: any;
}

export const HelmetRecipe: React.FC<IHelmetRecipe> = ({ recipe }) => {
  return (
    <Helmet>
      <title>{recipe?.titleSeo}</title>
      <meta name="description" content={recipe?.metaDescriptionSeo} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Recipe",
          name: recipe?.name,
          image: [getImagePath(recipe?.image)],
          author: {
            "@type": "Person",
            name: recipe?.author?.username,
          },
          datePublished: momentGreenitUs(recipe?.createdAt),
          description: recipe?.description
            ?.replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/\n/g, " ")
            .replace(/\r/g, ""),
          totalTime: "PT" + recipe?.duration + "M",
          recipeCuisine: "Diy",
          recipeCategory: "Diy",
          keywords: "Recette " + recipe?.name + " diy",
          recipeYield: "1",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "18",
          },
          recipeIngredient: map(recipe?.ingredients, x => {
            return x.amount + " " + x.name;
          }),
          recipeInstructions: map(recipe?.instructions, x => {
            return { "@type": "HowToStep", text: x.content };
          }),
        })}
      </script>
    </Helmet>
  );
};
