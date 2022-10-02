import { useAllIngredientsQuery } from "./../../../graphql";
import React, { useEffect } from "react";
import { IngredientCard } from "../Components/IngredientCard";

interface IngredientAssociateSection {
  categoryIngredient: string;
  name: string;
}

export const IngredientAssociateSection: React.FC<
  IngredientAssociateSection
> = ({ categoryIngredient, name }) => {
  console.log(categoryIngredient);

  const { data: dataAssociate } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: [categoryIngredient] } },
  });

  useEffect(() => {
    console.log("HERE!");
    console.log(dataAssociate);
  }, [dataAssociate]);

  const AssociateIngredients = dataAssociate?.allIngredients?.map(
    (ingredient: any) => ({
      key: Math.random,
      name: ingredient?.name,
      price: ingredient?.price,
      producer: ingredient?.producer,
      image: ingredient?.image,
      id: ingredient?.id,
    }),
  );

  const filterIngredient = (ingredient: any) => {
    if (ingredient.name !== name) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-8 lg:gap-5 w-max p-6">
        {AssociateIngredients?.filter(filterIngredient)
          .slice(0, 5)
          .map(
            (Object: {
              name: string;
              price: string;
              producer: string;
              image: any;
              id: string;
            }) => (
              <IngredientCard
                key={Math.random()}
                name={Object?.name}
                price={Object?.price}
                producer={Object?.producer}
                image={Object?.image}
                id={Object?.id}
              />
            ),
          )}

        <IngredientCard id="IngredientCard" isCTA={true}></IngredientCard>
      </div>
    </div>
  );
};
