import { useAllIngredientsQuery, useRecipesQuery } from "../../graphql";
import { Helmet } from "react-helmet";
import { Container, Footer, Loading, Navbar } from "components";
import { IngredientCard } from "./Components/IngredientCard";

const MarketLandingPage = () => {
  const { data: dataMarket } = useAllIngredientsQuery({
    variables: { filter: { isForMarket: true } },
  });

  const IngredientsMarket = dataMarket?.allIngredients?.map(
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
      <Container>
        <div className="grid grid-cols-2 mb-2 gap-6 lg:gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <>
            {IngredientsMarket?.slice(0, 10).map(
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
                  keyID={"keyID"}
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
