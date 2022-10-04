import App from "App";
import {
  useAllIngredientsQuery,
  useIngredientQuery,
  useRecipesQuery,
} from "../../graphql";
import { Helmet } from "react-helmet";
import {
  Button,
  Container,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
  SearchBar,
} from "components";
import { SlideBar } from "./Components/SlideBar";
import { IngredientCard } from "./Components/IngredientCard";
import useIsMobile from "hooks/isMobile";
import {
  TopImageMarketMobile,
  TopImageMarketDesktopLeft,
  TopImageMarketDesktopRight,
} from "icons";
import { ExploreMore } from "components/recipe/ExploreMore";
import { SectionTitle } from "./Components/SectionTitle";
import { ReviewCard } from "./Components/ReviewCard";
import { useEffect } from "react";

const MarketLandingPage = () => {
  const isMobile = useIsMobile();
  const totalRecipeCards = isMobile ? 5 : 4;

  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const { data: dataBegginer } = useRecipesQuery({
    variables: { first: 8, filter: { tags: ["Premiers pas"] } },
  });

  const { data: dataHome } = useRecipesQuery({
    variables: { first: 8, filter: { category: ["Maison"] } },
  });

  const { data: dataMarket } = useAllIngredientsQuery({
    variables: { filter: { isForMarket: true } },
  });

  const { data: dataVegetalOil } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: ["Autres"] } },
  });

  const { data: dataEssentialOils } = useAllIngredientsQuery({
    variables: { filter: { categoryIngredient: ["Huiles essentielles"] } },
  });

  if (!dataBegginer || !dataHome) {
    return <Loading />;
  }
  const recipesBegginer = dataBegginer.allRecipes?.edges || [];
  const dataHomes = dataHome.allRecipes?.edges || [];

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

  const IngredientsVegetalOil = dataVegetalOil?.allIngredients?.map(
    (ingredient: any) => ({
      key: Math.random,
      name: ingredient?.name,
      price: ingredient?.price,
      producer: ingredient?.producer,
      image: ingredient?.image,
      id: ingredient?.id,
    }),
  );

  const IngredientsEssentialOils = dataEssentialOils?.allIngredients?.map(
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
        <title>
          Toutes vos recettes DIY pour une consommation fait-maison | Greenit
        </title>
        <meta
          name="description"
          content="Votre espace de partage de recette DIY, des astuces écologiques pour la maison, des ateliers pour débuter dans le fait-maison et des pages sur les bienfaits des ingrédients."
        />
      </Helmet>

      <Container className="flex flex-col items-center w-full | pb-10 md:pb-20 pt-4 | bg-yellowL">
        {isMobile ? (
          <img
            className="absolute -top-2 scale-100"
            alt="Communauté Greenit"
            src={TopImageMarketMobile}
            loading="lazy"
          />
        ) : (
          <>
            <img
              className="sm:opacity-10 lg:opacity-100 absolute top-2 -left-14 w-80"
              src={TopImageMarketDesktopLeft}
              alt="Communauté Greenit partie 1"
              loading="lazy"
            />
            <img
              className="sm:opacity-10 lg:opacity-100 absolute top-1 -right-0 w-80"
              alt="Communauté Greenit partie 2"
              src={TopImageMarketDesktopRight}
              loading="lazy"
            />
          </>
        )}

        <div className={`relative mt-20 md:mt-6 mb-6 text-center`}>
          <h1 className="text-3xl">
            {!isMobile ? (
              <>
                <span className="text-yellow trait-yellow-desktop">
                  Greenit market
                </span>
                , le meilleur des cosmétiques <br /> maison à petit prix !
              </>
            ) : (
              <>
                <span className="text-yellow trait-yellow-mobile font-medium">
                  Greenit market,
                </span>
                <br />
                <span className="font-medium">
                  le meilleur des cosmétiques <br /> maison à petit prix !
                </span>
              </>
            )}
          </h1>
        </div>
      </Container>
      <div className="flex flex-col | items-center self-center bg-white w-full z-10">
        <SlideBar keyID={"Landingpage-slideBar"} isMarketListPage={false} />
        <SectionTitle
          title={"Les produits phares"}
          subtitle={"les incontournables"}
        />
        <Container className="flex flex-wrap w-full justify-center lg:justify-start lg:w-3/4">
          <div className="grid grid-cols-2 mb-2 gap-6 lg:gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {!isMobile ? (
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
            ) : (
              <>
                {IngredientsMarket?.slice(0, 8).map(
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
              </>
            )}
          </div>
        </Container>
        <div className="h-full w-full bg-blueL my-10 flex flex-col items-center self-center">
          <SectionTitle
            title={"Les huiles végétales"}
            subtitle={"l'indispensable de vos soins beauté"}
          />
          <Container className="flex w-full lg:justify-center overflow-x-auto pb-4">
            <div className="flex gap-5 w-max ml-4 md:ml-0">
              {IngredientsVegetalOil?.slice(0, 4).map(
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
            </div>
            <IngredientCard
              isCTA={true}
              id={"MarketPage-IngredientCards"}
              filter={"Huiles végétales"}
            />
          </Container>

          <SectionTitle
            title={"Les huiles essentielles"}
            subtitle={"vive l'aromathérapie"}
          />
          <Container className="flex w-full lg:justify-center overflow-x-auto pb-4">
            <div className="flex gap-5 w-max ml-4 md:ml-0">
              {IngredientsEssentialOils?.slice(0, 4).map(
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
            </div>
            <IngredientCard
              isCTA={true}
              id={"MarketPage-IngredientCards"}
              filter={"Huiles essentielles"}
            />
          </Container>
        </div>
        <SectionTitle
          title={"Les recettes 100% débutants"}
          subtitle={"idéal pour se lancer !"}
          isMarginNeeded={false}
        />
        <Container className="flex w-full lg:justify-center overflow-x-auto">
          <div className="flex w-max ml-4 md:ml-0 p-4">
            {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
              <div className="flex mr-2">
                <RecipeCard recipe={recipe?.node} key={Math.random()} />
              </div>
            ))}
            <ExploreMore
              filter="tags=Premiers pas"
              id="landing-debutant-debutant"
            />
          </div>
        </Container>
        <SectionTitle
          title={"Tout pour la maison"}
          subtitle={"recettes pour un ménage écolo !"}
          isMarginNeeded={false}
        />
        <Container className="flex w-full lg:justify-center overflow-x-auto">
          <div className="flex w-max ml-4 md:ml-0 p-4">
            {dataHomes?.slice(0, totalRecipeCards).map(recipe => (
              <div className="flex mr-2">
                <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
              </div>
            ))}
            <ExploreMore
              filter="category=Maison"
              id="landing-maison-explorer"
            />
          </div>
        </Container>
        <Button
          id="LandingMarket-Decouvrir-Recettes"
          type="darkBlue"
          className="my-4"
        >
          Découvrir les recettes
        </Button>
        <div className="h-full w-full bg-greenL mt-10 flex flex-col items-center self-center pb-10">
          <SectionTitle
            title={"La communauté Greenit"}
            subtitle={"nos avis sur Google"}
          />
          <Container className="flex flex-wrap gap-4 w-full justify-center lg:w-3/4">
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"5/5"}
            />
          </Container>
        </div>
        <div className="h-full w-full bg-white flex flex-col items-center self-center pb-10">
          <Container className="flex flex-wrap gap-4 w-full justify-center lg:w-11/12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 | w-full px-4 my-4 lg:my-10 | lg:gap-3 ">
              {[
                {
                  icon: "bx bx-home-smile",
                  title: "Entreprise française",
                  text: "Greenit est une entreprise française. Nous travaillons avec des marques et des producteurs français !",
                },
                {
                  icon: "bx bx-phone-call",
                  title: "À votre écoute",
                  text: "Nous sommes à votre disposition pour quelconques questions. Nous nous engageons à vous répondre en moins de 48 h.",
                },
                {
                  icon: "bx bx-heart-circle",
                  title: "4.8/5 ★★★★★",
                  text: "Nos clients sont satisfaits ! Notre secret : nous mettons l’humain avant tout !",
                },
                {
                  icon: "bx bx-leaf",
                  title: "Ingrédients séléctionnés",
                  text: "Nous proposons des ingrédients de qualité avec un impact écologique le plus faible possible.",
                },
                {
                  icon: "bx bxs-group",
                  title: (
                    <span>
                      La 1ere communauté <br /> du fait-maison
                    </span>
                  ),
                  text: "Greenit c’est +300 passionnés, cosmétologues, aromathérapeutes et qui développent la production maison.",
                },
                {
                  className: "sm:hidden",
                  icon: "bx bx-check-shield",
                  title: "Paiement sécurisé",
                  text: "Le paiement est 100 % sécurisé, nous utilisons la plateforme de paiement agrée Stripe.",
                },
              ].map((item, index) => (
                <div
                  className={`flex flex-col text-center p-2 gap-2 ${item.className}`}
                  key={Math.random()}
                >
                  <i className={` ${item.icon} text-5xl`} />
                  <p className="font-diy leading-6 text-2xl lg:text-3xl">
                    {item.title}
                  </p>
                  <p className="leading-5 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketLandingPage;
