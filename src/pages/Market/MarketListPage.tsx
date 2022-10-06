import { useAllIngredientsQuery } from "../../graphql";
import { Helmet } from "react-helmet";
import { Container, Footer, Navbar } from "components";
import { IngredientCard } from "./Components/IngredientCard";
import { SlideBar } from "./Components/SlideBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EngagementBanner } from "./Components/EngagementBanner";

const MarketLandingPage = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  // this gets the url parameter to filter by category (coming from the slidebar.tsx)
  const { category_ingredient } = useParams<{ category_ingredient: string }>();

  const [categoryName, setcategoryName] = useState(category_ingredient);

  // check the url parameter and chnage it to the correct coategory name
  const updateCategoryName = (categoryName: string) => {
    switch (categoryName) {
      case "Huiles-végétales-et-beurres":
        return "Huiles végétales et beurres";
      case "Poudres-et-argiles":
        return "Poudres et argiles";
      case "Huiles-essentielles":
        return "Huiles essentielles";
      case "Ingrédients-cosmétiques":
        return "Ingrédients cosmétiques";
      case "Ingrédients-entretien":
        return "Ingrédients d'entretien";
      default:
        return "Tous-les-ingrédients";
    }
  };

  useEffect(() => {
    const updatedCategoryName = updateCategoryName(categoryName);
    if (updatedCategoryName) {
      setcategoryName(updatedCategoryName);
    }
  }, []);

  const dataAll = useAllIngredientsQuery({
    variables: { filter: { isForMarket: true } },
  });

  const dataFiltered = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: [categoryName] } },
  });

  let data =
    category_ingredient == "Tous-les-ingrédients" ? dataAll : dataFiltered;

  let ingredientsMarket = data?.data?.allIngredients?.map(
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
      <SlideBar keyID={""} />

      <Container className="mt-10 mb-40">
        <div className="grid grid-cols-2 mb-2 gap-6 lg:gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <>
            {ingredientsMarket?.map(
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
      <EngagementBanner bgBlueL={true} />
      <Footer />
    </div>
  );
};

export default MarketLandingPage;
