import { useAllIngredientsQuery, useRecipesQuery } from "../../graphql";
import { Helmet } from "react-helmet";
import { Button, Container, Footer, Loading, Navbar } from "components";
import { IngredientCard } from "./Components/IngredientCard";
import internal from "stream";
import { SlideBar } from "./Components/SlideBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MarketLandingPage = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const { category } = useParams<{ category: string }>();

  const { data: AllIngredient } = useAllIngredientsQuery({
    variables: { filter: { isForMarket: true } },
  });
  let IngredientsMarket = AllIngredient?.allIngredients?.map(
    (ingredient: any) => ({
      key: Math.random,
      name: ingredient?.name,
      price: ingredient?.price,
      producer: ingredient?.producer,
      image: ingredient?.image,
      id: ingredient?.id,
    }),
  );
  console.log(IngredientsMarket);

  {
    /*
  useState(() => {
    if (category === "Tous les ingrédients") {
      const { data: AllIngredient } = useAllIngredientsQuery({
        variables: { filter: { isForMarket: true } },
      });
      let IngredientsMarket = AllIngredient?.allIngredients?.map(
        (ingredient: any) => ({
          key: Math.random,
          name: ingredient?.name,
          price: ingredient?.price,
          producer: ingredient?.producer,
          image: ingredient?.image,
          id: ingredient?.id,
        }),
      );
      console.log(IngredientsMarket);
    } else {
      const { data: AllIngredient } = useAllIngredientsQuery({
        variables: { filter: { categoryIngredient: ["Autres"] } },
      });
      let IngredientsMarket = AllIngredient?.allIngredients?.map(
        (ingredient: any) => ({
          key: Math.random,
          name: ingredient?.name,
          price: ingredient?.price,
          producer: ingredient?.producer,
          image: ingredient?.image,
          id: ingredient?.id,
        }),
      );
      console.log(IngredientsMarket);
    }
  })*/
  }

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <title>Ingrédients pour la cosmétique maison | Greenit Market</title>
        <meta
          name="description"
          content="Découvrez une sélection d’huiles végétales, d’huiles essentielles, d’ingrédients cosmétiques et d’entretien pour réaliser vos produits du quotidien."
        />
      </Helmet>
      <div className="flex justify-center bg-yellowL h-32 lg:h-26 w-full">
        <div className="flex w-11/12 lg:w-5/6 lg:grid-cols-2 items-center">
          <div className="flex pt-5 pb-5 flex-col w-full justify-center gap-1">
            <h4>Réaliser ses produits maison n’a jamais été si simple !</h4>
            <p className="leading-5 text-sm">
              Découvrez une sélection d’huiles végétales, d’huiles essentielles,
              d’ingrédients cosmétiques et d’entretien pour réaliser vos
              produits du quotidien.
            </p>
          </div>
        </div>
      </div>
      <SlideBar keyID={""} isMarketListPage={true} />

      <Container className="my-10">
        <div className="grid grid-cols-2 mb-2 gap-6 lg:gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <>
            {IngredientsMarket?.map(
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
          </>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default MarketLandingPage;
