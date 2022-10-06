import { useAllIngredientsQuery } from "./../../../graphql";
import React from "react";
import { IngredientCard } from "../Components/IngredientCard";

interface IngredientAssociateSection {
  categoryIngredient: any;
  name: any;
}

export const IngredientAssociateSection: React.FC<
  IngredientAssociateSection
> = ({ categoryIngredient, name }) => {
  const { data: dataAssociate } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: [categoryIngredient] } },
  });

  const associateIngredients = dataAssociate?.allIngredients?.map(
    (ingredient: any) => ({
      key: Math.random,
      name: ingredient?.name,
      price: ingredient?.price,
      producer: ingredient?.producer,
      image: ingredient?.image,
      id: ingredient?.id,
    }),
  );

  // the function below excludes the main ingredient from the section similar ingredients
  const filterIngredient = (ingredient: any) => {
    if (ingredient.name !== name) {
      return true;
    } else {
      return false;
    }
  };

  // below is to return a correct parameter not the ctaegory name with spaces
  const categoryParameter = categoryIngredient;
  const updateCategoryParameter = (categoryParameter: string) => {
    switch (categoryParameter) {
      case "Huiles végétales et beurres":
        return "Huiles-végétales-et-beurres";
      case "Poudres et argiles":
        return "Poudres-et-argiles";
      case "Huiles essentielles":
        return "Huiles-essentielles";
      case "Ingrédients cosmétiques":
        return "Ingrédients-cosmétiques";
      case "Ingrédients d'entretien":
        return "Ingrédients-entretien";
      default:
        return "Tous-les-ingrédients";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-8 lg:gap-5 w-max p-6">
        {associateIngredients
          ?.filter(filterIngredient)
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
                name={Object.name}
                price={Object.price}
                producer={Object.producer}
                image={Object.image}
                id={Object.id}
              />
            ),
          )}

        <IngredientCard
          filter={updateCategoryParameter(categoryParameter)}
          isCTA={true}
          name={""}
          price={""}
          producer={""}
          image={undefined}
        ></IngredientCard>
      </div>
    </div>
  );
};
