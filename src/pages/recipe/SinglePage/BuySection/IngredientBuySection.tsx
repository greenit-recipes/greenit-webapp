import { IngredientCard } from "pages/Market/Components/IngredientCard";
import { useAllIngredientsQuery, useRecipesQuery } from "../../../../graphql";

interface IngredientBuySection {
  ingredientsForMarket: string;
}

export const IngredientBuySection: React.FC<IngredientBuySection> = ({
  ingredientsForMarket,
}) => {
  const { data: dataIngredientBuySection } = useAllIngredientsQuery({
    variables: { filter: { name: ingredientsForMarket } },
  });

  console.log(dataIngredientBuySection);

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
      <div className="flex flex-col">
        {IngredientBuySection?.map(
          (Object: {
            key: any;
            name: string;
            price: string;
            producer: string;
            image: any;
            id: string;
          }) => (
            <IngredientCard
              keyID={Object?.key}
              name={Object?.name}
              price={Object?.price}
              producer={Object?.producer}
              image={Object?.image}
              id={Object?.id}
            />
          ),
        )}
      </div>
    </>
  );
};
