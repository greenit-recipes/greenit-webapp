import { useQuery } from "@apollo/client";
import { RouteName } from "App";
import debounce from "lodash/debounce";
import { SEARCH_AUTO_COMPLETE_RECIPE } from "pages/AutocompleteRequest";
import { recipesBegginerFullXp } from "pages/GreenitFullXp/FullXpHelper";
import "pages/LandingPage/LandingPage.css";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
import { landingPageCategories } from "utils";
import {
  Button,
  Container,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
  SearchBar,
} from "components";
import { Press } from "components/layout/TheyTalkAboutUs";
import { useRecipesQuery } from "../../graphql";
import useIsMobile from "hooks/isMobile";
import {
  Badge100Desktop,
  Badge100Mobile,
  BadgeMarqueMobile,
  BadgeMarqueDesktop,
  BadgeSavonMobile,
  BadgeSavonDesktop,
  BadgeControleMobile,
  TopImageMobile,
  TopImageDesktopLeft,
  TopImageDesktopRight,
  LPImage4Desktop,
  boxOpen,
  escapeTheCity,
  issy,
  sixHTN,
} from "icons";
import "pages/recipe/SinglePage/SinglePage.css";
import { GET_FEATURE_BY_NAME } from "services/feature.service";
import { CategoryCircle } from "./Components/CategoryCircle";
import { Newsletter } from "./Components/Newsletter";

const responsiveCarouselLanding = {
  desktop: {
    breakpoint: { max: 3000, min: 1224 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1224, min: 664 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 664, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const communityMembers = [
  {
    image:
      "https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fgeo.2F2021.2F03.2F15.2Fb7e513c6-4445-4cd9-876c-ec012b5b0936.2Ejpeg/1200x630/cr/wqkgR2V0dHkgSW1hZ2VzIC8gR0VP/mouette-et-goeland-comment-les-differencier.jpg",
    name: "Jackouille",
    describe: "Lorem Ipsum is simply",
  },
  {
    image:
      "https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fgeo.2F2021.2F03.2F15.2Fb7e513c6-4445-4cd9-876c-ec012b5b0936.2Ejpeg/1200x630/cr/wqkgR2V0dHkgSW1hZ2VzIC8gR0VP/mouette-et-goeland-comment-les-differencier.jpg",
    name: "Bernard",
    describe: "Lorem Ipsum is simply dummy",
  },
  {
    image:
      "https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fgeo.2F2021.2F03.2F15.2Fb7e513c6-4445-4cd9-876c-ec012b5b0936.2Ejpeg/1200x630/cr/wqkgR2V0dHkgSW1hZ2VzIC8gR0VP/mouette-et-goeland-comment-les-differencier.jpg",
    name: "Zack",
    describe: "Lorem Ipsum is simply dummy",
  },
];

interface ExploreMoreProps {
  filter: string;
}

const ExploreMore: React.FC<ExploreMoreProps> = ({ filter }) => {
  return (
    <Link to={`${RouteName.recipes}?${filter}`}>
      <div className="ml-1 mr-5 h-96 w-52 bg-white rounded-2xl self-center relative">
        <i className="absolute top-[40%] left-[40%] text-5xl bx bx-right-arrow-alt"></i>
        <p className="absolute top-[52%] left-[30%] text-lg font-semibold">
          Explorer plus
        </p>
      </div>
    </Link>
  );
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  const history = useHistory();
  const totalRecipeCards = isMobile ? 5 : 4;
  /* Feature Flag Start*/
  //Create an easier API for feature flags
  const { loading: loadingOutOfStock, data: dataOutOfStock } = useQuery(
    GET_FEATURE_BY_NAME,
    {
      variables: {
        name: "is_out_of_stock",
      },
      errorPolicy: "all",
      nextFetchPolicy: "cache-first",
    },
  );

  //Create a graphql query for each page to group features
  const { loading: loadingFullXP, data: dataFullXP } = useQuery(
    GET_FEATURE_BY_NAME,
    {
      variables: {
        name: "is_greenit_full_xp",
      },
      errorPolicy: "all",
      nextFetchPolicy: "cache-first",
    },
  );
  const loadingFeature = loadingFullXP || loadingOutOfStock;
  /* Feature Flag End */

  const {
    error,
    loading,
    data: dataIsDiplayHome,
    refetch,
  } = useRecipesQuery({
    variables: { first: 8, filter: { isDisplayHome: true } },
  });

  const { data: dataBegginer } = useRecipesQuery({
    variables: { first: 8, filter: { tags: ["Premiers pas"] } },
  });

  const { data: dataNbrLikes } = useRecipesQuery({
    variables: { first: 8, filter: { isOrderByNumberLike: true } },
  });

  const [showModalComingSoon, setShowModalComingSoon] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const setSearchTermDebounced = debounce(setSearchTerm, 250);

  // Ne par run au premier lancement
  const { data: autoCompleteData, loading: autoCompleteLoading } = useQuery(
    SEARCH_AUTO_COMPLETE_RECIPE,
    {
      fetchPolicy: "network-only",
      variables: { search: searchTerm },
      skip: searchTerm ? false : true,
    },
  );

  if (
    loading ||
    loadingFeature ||
    !dataIsDiplayHome ||
    !dataBegginer ||
    !dataNbrLikes ||
    !dataOutOfStock ||
    !dataFullXP
  ) {
    return <Loading />;
  }

  const recipes = dataIsDiplayHome.allRecipes?.edges || [];
  const recipesBegginer = dataBegginer.allRecipes?.edges || [];
  const recipesOrderByLikes = dataNbrLikes.allRecipes?.edges || [];
  const recipesAutoComplete = autoCompleteData?.searchAutoCompleteRecipes || {
    recipes: [],
    ingredients: [],
    totalRecipes: 0,
  };

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
      {/* dataFullXP?.featureFlag?.isActive && (
        <>
          <GreenitFullXpHeadband
            isOutOfStock={dataOutOfStock?.featureFlag?.isActive}
            showModal={setShowModalComingSoon}
          />
          <Modal
            isCenter={true}
            onClose={() => setShowModalComingSoon(false)}
            show={showModalComingSoon}
          >
            <GreenitFullXpModal
              isOutOfStock={dataOutOfStock?.featureFlag?.isActive}
            />
          </Modal>
        </>
      ) */}
      <div className="realtive bg-greenL w-full">
        <Container
          className="flex flex-col items-center | px-4
         | mt-9 mb-28"
        >
          {isMobile ? (
            <img
              className="absolute top-0"
              alt="Communauté Greenit"
              src={TopImageMobile}
              loading="lazy"
            />
          ) : (
            <>
              <img
                className="absolute top-20 -left-10"
                src={TopImageDesktopLeft}
                alt="Communauté Greenit partie 1"
                loading="lazy"
              />
              <img
                className="absolute top-10 -right-20"
                alt="Communauté Greenit partie 2"
                src={TopImageDesktopRight}
                loading="lazy"
              />
            </>
          )}

          <div className={`relative msm:mt-24 mb-6 text-center`}>
            <h1 className="text-2xl md:text-3xl">
              {isMobile ? (
                <>
                  <span className="text-green trait-img">Greenit</span>, la
                  communauté centrale <br></br> pour les recettes{" "}
                  <span className="double-trait-img">faits maison</span>
                </>
              ) : (
                <>
                  <span className="text-green trait-img">Greenit</span>, la
                  communauté du fait-maison<br></br> pour une consommation{" "}
                  <span className="double-trait-img">durable</span>
                </>
              )}
            </h1>
          </div>
          <div className="w-9/12 mb-2 mx-12 lg:w-1/5">
            <SearchBar
              keyId="searchBarLandingPage"
              suggestionIsActive={true}
              setValue={setSearchTermDebounced}
              isLoading={autoCompleteLoading}
              // @ts-ignore
              suggestions={recipesAutoComplete}
            />
          </div>
          <div className="text-center my-5">
            <h4 className="font-semibold text-xl">
              Notre sélection de la semaine
            </h4>
          </div>
          {isMobile ? (
            <div className="grid grid-cols-2 mt-4 mb-2 sm:grid-cols-3">
              {recipes?.slice(0, 6).map((recipe, index: number) => (
                <RecipeCard
                  recipe={recipe?.node}
                  key={recipe?.node?.id}
                  id={recipe?.node?.id}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 justify-items-center mt-10 gap-y-10 gap-x-4">
              {recipes?.map(recipe => (
                <RecipeCard
                  recipe={recipe?.node}
                  key={recipe?.node?.id}
                  id={recipe?.node?.id}
                />
              ))}
            </div>
          )}

          <Link to={RouteName.recipes} className="lg:mt-10">
            <Button type="darkBlue" id="landing-découvrir-plus">
              Découvrir plus
            </Button>
          </Link>
          <div>
            <img
              className="w-40 h-40 absolute left-10"
              alt="100% fait maison"
              src={isMobile ? Badge100Mobile : Badge100Desktop}
              loading="lazy"
            />
          </div>
        </Container>
      </div>
      <Container
        className="flex flex-col justify-center items-center md:items-start | px-4
         | mt-12 mb-12 text-center md:text-left md:w-10/12"
      >
        <div className="md:flex md:justify-start md:space-x-4">
          <h2 className="text-xl md:text-2xl">
            Le kit fait-maison idéal pour débuter
          </h2>
          <h2 className="text-xl md:text-2xl | mb-6 font-diy text-2xl">
            mes premiers pas
          </h2>
        </div>
        <div className="md:flex md:items-center">
          <div className="flex justify-center mb-3">
            <img
              src={boxOpen}
              className="w-56 h-56 md:w-64 md:h-64 md:mr-24"
              alt={`Box greenit`}
            />
          </div>
          <div>
            <div className="flex msm:justify-between md:space-x-24 mt-4">
              {recipesBegginerFullXp?.map(recipe => (
                <div className="ml-9">
                  <img
                    src={recipe.image}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                    alt={recipe.name}
                  />
                  <p>{recipe.name}</p>
                </div>
              ))}
            </div>
            <h4 className="mt-9 mb-4 font-medium text-lg">
              L’essentiel pour réaliser 3 recettes validées{" "}
              {isMobile && <br></br>} par la communauté !
            </h4>
            <p>Garantie pas de gâchis et avec des contenants en verre !</p>
            <p className="mb-6">
              Résultat, c’est 11 substances toxiques épargnées, 154 g de
              {isMobile && <br></br>} plastique évités et 32 % d’économie
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                className="mr-3"
                id="landing-box-je-commande"
                type="green"
                onClick={() => history.push(RouteName.startDiyGreenitFullXp)}
              >
                Je commande
              </Button>
              <Button
                id="landing-box-en-savoir-plus"
                type="darkBlue"
                onClick={() => history.push(RouteName.startDiyGreenitFullXp)} // Mettre la bonne route
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center bg-blueL w-full relative"
      >
        {!isMobile && (
          <img
            className="h-64 absolute -top-24 -right-12"
            alt="Mon savon ? Je le fais moi-même"
            src={LPImage4Desktop}
            loading="lazy"
          />
        )}
        <h2 className="text-xl font-semibold">Les recettes 100% débutants</h2>
        <h2 className="font-diy text-2xl">idéal pour se lancer !</h2>
      </Container>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-12 bg-blueL">
        <div className="flex w-max overflow-x-auto">
          {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
          <ExploreMore filter="tags=Premiers pas" />
        </div>
      </div>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center bg-blueL w-full"
      >
        <h2 className="text-xl font-semibold">Tout pour la maison</h2>
        <h2 className="font-diy text-2xl">recettes pour un ménage écolo !</h2>
      </Container>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-24 bg-blueL">
        <div className="flex w-max overflow-x-auto">
          {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
          <ExploreMore filter="category=Maison" />
        </div>
        <div>
          <img
            className="h-40 absolute right-6"
            alt="Mon savon ? Je le fais moi-même"
            src={BadgeSavonMobile}
            loading="lazy"
          />
        </div>
      </div>

      <Container
        className="flex flex-col items-center | px-4
        | mt-16 mb-12 text-center"
      >
        <h2 className="text-xl">Les catégories les plus inspirantes</h2>
        <div className="grid pt-9 grid-cols-2 gap-x-11 gap-y-11">
          {landingPageCategories.map(item => (
            <CategoryCircle
              isLandingPage={true}
              name={item.title}
              icon={item.icon}
              key={item.title}
            />
          ))}
        </div>
      </Container>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center bg-yellowL w-full"
      >
        <h2 className="text-xl font-semibold">
          Les recettes avec les ingrédients chez vous
        </h2>
        <h2 className="font-diy text-2xl">
          Bicarbonate, savon de marseille, curcumin …
        </h2>
      </Container>
      <div className="w-full pt-4 pl-4 pb-12 bg-yellowL">
        <div className="overflow-x-auto">
          <div className="flex w-max">
            {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
            {/*Todo: Fill category later*/}
            <ExploreMore filter="category=Missing" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <h4 className="font-semibold text-xl mx-12">
            Envie de profiter des bienfaits de l’avocat, de l’huile d’olive ou
            des graines de lin ?
          </h4>
          <h2 className="font-diy text-2xl">Banane, oeuf, amidon de maïs…</h2>
        </div>
      </div>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center w-full"
      >
        <h2 className="text-2xl font-semibold mx-10 mb-5">
          Derrière Greenit {isMobile && <br />} des passionées, des curieux,{" "}
          {isMobile && <br />} des donateurs, des débutants. . .
        </h2>
      </Container>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-12 text-center relative">
        <div className="flex justify-center">
          {communityMembers?.map(person => (
            <div className="flex flex-col items-center ml-4 justify-center">
              <img
                src={person.image}
                className="w-24 h-24 rounded-full object-cover"
                alt={person.name}
              />
              <h4>{person.name}</h4>
              <h4 className="font-diy text-2xl">{person.describe}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-12 text-center relative">
        <div className="flex justify-center">
          {communityMembers?.map(person => (
            <div className="flex flex-col items-center ml-4 justify-center">
              <img
                src={person.image}
                className="w-24 h-24 rounded-full object-cover"
                alt={person.name}
              />
              <h4>{person.name}</h4>
              <h4 className="font-diy text-2xl">{person.describe}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <img
          className="w-44 h-20 absolute top-[-12%] right-[35%]"
          alt="Ma marque préférée"
          src={BadgeMarqueMobile}
          loading="lazy"
        />
        <Newsletter />
      </div>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 pb-12 md:mt-4 text-center"
      >
        <div>
          <h2 className="text-xl font-semibold">
            Le DIY c’est reprendre le contôle <br></br>sur sa consommation
          </h2>
          <h2 className="mt-2 font-diy text-2xl">
            Le diy pour ta santé, ton bien-être et un mode de vie viable
          </h2>
        </div>
        <div className="mt-5">
          <RecipeCard
            recipe={recipesOrderByLikes[1]?.node}
            key={recipesOrderByLikes[0]?.node?.id}
          />
        </div>
        <div className="flex mt-6">
          <CircleGreenit
            sizeCircle="w-24 h-24 lg:w-28 lg:h-28"
            colorCircle="bg-blue"
            icon={
              <i className="bx bxs-vial -rotate-12 absolute w-8 h-8 icon-position-circle bx-md"></i>
            }
            symbol=""
            number={"0"}
            text="Substances épargnées"
          />
          <CircleGreenit
            sizeCircle="w-24 h-24 lg:w-28 lg:h-28"
            colorCircle="bg-yellow"
            icon={
              <i className="bx bx-euro absolute w-8 h-8 icon-position-circle bx-md"></i>
            }
            customClassName="ml-16"
            symbol="€"
            number={"0"}
            text="Argent économisé"
          />
          <CircleGreenit
            sizeCircle="w-24 h-24 lg:w-28 lg:h-28"
            colorCircle="bg-green"
            icon={
              <i className="bx bx-leaf absolute w-8 h-8 icon-position-circle bx-md"></i>
            }
            customClassName="ml-16"
            symbol="g"
            number={"0"}
            text="Plastiques évités"
          />
        </div>
        <p className="mt-6">
          Passer au fait-maison c’est des économies ! <br></br> Ça te fait du
          bien et ça fait du bien à la planète.
        </p>
      </Container>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 pb-12 md:mt-4 text-center bg-yellowL w-full"
      >
        <div>
          <h2 className="text-xl font-semibold">
            Le guide pour se lancer dans le fait-maison
          </h2>
          <h2 className="font-diy text-2xl">
            co-écrit avec des experts de la communauté Greenit !
          </h2>
        </div>

        <div className="flex flex-row gap-2 my-6 justify-evenly lg:gap-6">
          {[
            {
              icon: "bx-donate-heart",
              title: "3 conseils pour débuter",
              id: "landing-3-conseils-pour-débuter",
            },
            {
              icon: "bx-bowl-hot",
              title: "Les ingrédients et les ustentiles",
              id: "landing-ingredients-et-ustentiles",
            },
            {
              icon: "bx-knife",
              title: "2 recettes simples",
              id: "landing-2-recette-simples",
            },
          ].map(item => (
            <Link to={RouteName.starterPage} key={item.id} id={item.id}>
              <div className="w-32 h-32 grid bg-white rounded-xl shadow-lg p-2 | cursor-pointer transform sm:hover:scale-105 ease-linear transition-all duration-150 m-auto">
                <i className={`bx ${item.icon} bx-md mt-4`}></i>
                <p>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to={RouteName.starterPage}>
          <Button className="" type="darkBlue" id="landing-voir-le-guide">
            Voir le guide
          </Button>
        </Link>
      </Container>
      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center bg-blueL w-full"
      >
        <h2 className="text-xl font-semibold">
          Les recettes de shampooings et soins
        </h2>
        <h2 className="font-diy text-2xl">pour des cheveux soyeux</h2>
      </Container>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-12 bg-blueL">
        <div className="flex w-max">
          {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
          <ExploreMore filter="category=Cheveux" />
        </div>
      </div>

      <Container
        className="flex flex-col items-center | px-4
         | pt-9 text-center bg-blueL w-full"
      >
        <h2 className="text-xl font-semibold">Les recettes de masques</h2>
        <h2 className="font-diy text-2xl">adaptées à vos problématiques</h2>
      </Container>
      <div className="w-full pt-4 pl-4 overflow-x-auto pb-12 bg-blueL">
        <div className="flex w-max">
          {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
          <ExploreMore filter="search=Masque" />
        </div>
        <div>
          <img
            className="h-52 absolute -right-10"
            alt="Mon savon ? Je le fais moi-même"
            src={BadgeControleMobile}
            loading="lazy"
          />
        </div>
      </div>
      <Container
        className="w-full h-full px-6 my-6 mt-40 md:mt-20 md:w-3/5"
        itemsCenter
      >
        <h2 className="text-xl md:text-2xl | lg:mb-10 text-center">
          On parle de nous !
        </h2>
        <div className="flex flex-col justify-between mb-20 lg:flex-row">
          <Press
            title='"Ces 3 amis ont crée un site qui propose des dizaines de recettes zéro déchet à faire soi-même"'
            image={sixHTN}
            subtitle="18h39.fr, un média de Castorama"
          ></Press>
          <Press
            inverted={true}
            title='"Avec la Greenit Community, just do it yourself !"'
            image={escapeTheCity}
            subtitle="EscapeTheCity, média engagé low-tech"
          ></Press>
          <Press
            title='"Greenit" : une plateforme collaborative pour le fait-maison'
            image={issy}
            subtitle="Ville d'Issy-Les-Moulineaux"
          ></Press>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;
