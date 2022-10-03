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
  const { data: IngredientsOils } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: ["Huiles végétales"] } },
  });
  const { data: IngredientsPowder } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: ["Poudres et argiles"] } },
  });
  const { data: IngredientsHE } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: ["Huiles essentielles"] } },
  });
  const { data: IngredientsOther } = useAllIngredientsQuery({
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

  useState(() => {
    if (category === "Tous les ingrédients") {
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
      return IngredientsMarket && console.log(IngredientsMarket);
    } else if (category === "Huiles végétales") {
      let IngredientsMarket = IngredientsOils?.allIngredients?.map(
        (ingredient: any) => ({
          key: Math.random,
          name: ingredient?.name,
          price: ingredient?.price,
          producer: ingredient?.producer,
          image: ingredient?.image,
          id: ingredient?.id,
        }),
      );
      return IngredientsMarket && console.log(IngredientsMarket);
    } else if (category === "Poudres et argiles") {
      var IngredientsMarket = IngredientsPowder?.allIngredients?.map(
        (ingredient: any) => ({
          key: Math.random,
          name: ingredient?.name,
          price: ingredient?.price,
          producer: ingredient?.producer,
          image: ingredient?.image,
          id: ingredient?.id,
        }),
      );
      return IngredientsMarket;
    } else if (category === "Huiles essentielles") {
      let IngredientsMarket = IngredientsHE?.allIngredients?.map(
        (ingredient: any) => ({
          key: Math.random,
          name: ingredient?.name,
          price: ingredient?.price,
          producer: ingredient?.producer,
          image: ingredient?.image,
          id: ingredient?.id,
        }),
      );
      return IngredientsMarket;
    } else if (category === "Cadeaux et boxes") {
      let IngredientsMarket = IngredientsOther?.allIngredients?.map(
        (ingredient: any) => ({
          key: Math.random,
          name: ingredient?.name,
          price: ingredient?.price,
          producer: ingredient?.producer,
          image: ingredient?.image,
          id: ingredient?.id,
        }),
      );
      return IngredientsMarket;
    } else {
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
      return IngredientsMarket;
    }
  });

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <title>
          Toutes vos recettes DIY pour une consommation fait-maison | Greenit
        </title>
        <meta
          name="description"
          content="Votre espace de partage de recette DIY, des astuces écologiques pour la maison, des ateliers pour débuter dans le fait-maison et des pages sur les bienfaits des ingrédients."
        />
      </Helmet>
      <div className="flex justify-center bg-yellowL h-28 lg:h-26 w-full">
        <div className="grid w-10/12 lg:w-9/12 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center gap-1">
            <h4>Démarre ton adhésion Greenit pour profiter des prix minis !</h4>
            <p className="leading-5 text-sm">
              Bénéficie de tous les produits à prix cassés !
            </p>
          </div>
          {/*
          <Button type={"yellow"} className="h-10 self-start lg:self-center lg:justify-self-end">En savoir plus sur l’adhésion</Button>*/}
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
