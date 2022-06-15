import { Container, RecipeCard } from "components";
import React from "react";

interface ICarrouselLanding {
  recipeData: any;
  title: string;
  subtitle: string;
}

export const CarrouselLanding: React.FC<ICarrouselLanding> = ({
  recipeData,
  title,
  subtitle,
}) => {
  return (
    <div>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center bg-blueL w-full"
      >
        <h2>{title}</h2>
        <h2 className="font-diy text-2xl">{subtitle}</h2>
      </Container>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-12 bg-blueL">
        <div className="flex w-max">
          {recipeData?.map((recipe: any) => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
