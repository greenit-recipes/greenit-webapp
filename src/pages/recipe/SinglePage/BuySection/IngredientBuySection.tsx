import { useAllIngredientsQuery, useRecipesQuery } from "../../../../graphql";
import { IngredientWidget } from "./IngredientWidget";

interface IngredientBuySection {
  ingredientsForMarket: string;
}

export const IngredientBuySection: React.FC<IngredientBuySection> = ({
  ingredientsForMarket,
}) => {
  const { data: dataIngredientBuySection } = useAllIngredientsQuery({
    variables: { filter: { name: ingredientsForMarket } },
  });

  const IngredientBuySection = dataIngredientBuySection?.allIngredients?.map(
    (ingredient: any) => ({
      key: Math.random,
      name: ingredient?.name,
      price: ingredient?.price,
      producer: ingredient?.producer,
      image: ingredient?.image,
      id: ingredient?.id,
    }),
  );

  return (
    <>
      {IngredientBuySection?.map(
        (Object: {
          key: any;
          name: string;
          price: string;
          producer: string;
          image: any;
          id: string;
        }) => (
          <IngredientWidget
            key={Object?.key}
            name={Object?.name}
            price={Object?.price}
            producer={Object?.producer}
            image={Object?.image}
            id={Object?.id}
          />
        ),
      )}
    </>
  );
};
