import { useAllIngredientsQuery } from "./../../../graphql";
import React from "react";
import { IngredientCard } from "../Components/IngredientCard";

interface IngredientAssociateSection {
  categoryIngredient: string;
}

export const IngredientAssociateSection: React.FC<
  IngredientAssociateSection
> = ({ categoryIngredient }) => {
  const { data: dataAssociate } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: [categoryIngredient] } },
  });

  console.log(dataAssociate);

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

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-8 lg:gap-5 w-max p-6">
        {AssociateIngredients?.slice(0, 5).map(
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
