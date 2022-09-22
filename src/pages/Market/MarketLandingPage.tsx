import { useQuery } from "@apollo/client";
import { RouteName } from "App";
import {
  Button,
  Container,
  Footer,
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
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ExploreMore } from "components/recipe/ExploreMore";
import { SectionTitle } from "./Components/SectionTitle";

const MarketLandingPage = () => {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      // à voir
      document.body.classList.add("no-scroll");

      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, []);

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

      <Container className="flex flex-col items-center w-full | pb-10 pt-10 md:pt-20 | bg-yellowL">
        {isMobile ? (
          <img
            className="absolute top-0 scale-110"
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
              className="sm:opacity-10 lg:opacity-100 absolute top-1 -right-14 w-80"
              alt="Communauté Greenit partie 2"
              src={TopImageMarketDesktopRight}
              loading="lazy"
            />
          </>
        )}

        <div className={`relative mt-20 md:mt-6 mb-6 text-center`}>
          <h1 className="text-2xl md:text-3xl">
            {!isMobile ? (
              <>
                <span className="text-yellow trait-yellow-desktop">
                  Greenit marché
                </span>
                , le meilleur des <br />
                cosmétiques naturels à petit prix !
              </>
            ) : (
              <>
                <span className="text-yellow trait-yellow-mobile font-medium">
                  Greenit marché
                </span>
                <span className="font-medium">
                  , le meilleur des cosmétiques naturels à petit prix !
                </span>
              </>
            )}
          </h1>
        </div>
        <div className="w-2/3 md:w-1/3">
          <SearchBar keyId="MarketLanding-SearchBar" size="large" />
        </div>
      </Container>
      <SlideBar keyID={"Landingpage-slideBar"} />

      <SectionTitle
        title={"Les produits phares"}
        subtitle={"les incontournables"}
      />
      <Container className="flex flex-wrap gap-5 w-full justify-center lg:w-3/4">
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
        <IngredientCard keyID={"MarketPage-IngredientCards"} />
      </Container>

      <SectionTitle
        title={"Les huiles végétales"}
        subtitle={"l'indispensable de vos soins beauté"}
      />
      <Container className="flex w-full lg:justify-center overflow-x-auto pb-4">
        <div className="flex gap-5 w-max ml-4 md:ml-0">
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard isCTA={true} keyID={"MarketPage-IngredientCards"} />
        </div>
      </Container>

      <SectionTitle
        title={"Les huiles essentielles"}
        subtitle={"idéal pour se lancer !"}
      />
      <Container className="flex w-full lg:justify-center overflow-x-auto pb-4">
        <div className="flex gap-5 w-max ml-4 md:ml-0">
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard keyID={"MarketPage-IngredientCards"} />
          <IngredientCard isCTA={true} keyID={"MarketPage-IngredientCards"} />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default MarketLandingPage;
