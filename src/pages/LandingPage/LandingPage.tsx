import { useQuery } from "@apollo/client";
import { RouteName } from "App";
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
import { ExploreMore } from "components/recipe/ExploreMore";
import useIsMobile from "hooks/isMobile";
import {
  Badge100Desktop,
  Badge100Mobile,
  BadgeControleDesktop,
  BadgeControleMobile,
  BadgeMarqueDesktop,
  BadgeMarqueMobile,
  BadgeSavonDesktop,
  BadgeSavonMobile,
  boxOpen,
  Desktop_faceillu,
  Desktop_hairillu,
  escapeTheCity,
  issy,
  LPImage4Desktop,
  Mobile_faceillu,
  Mobile_hairillu,
  sixHTN,
  TopImageDesktopLeft,
  TopImageDesktopRight,
  TopImageMobile,
} from "icons";
import debounce from "lodash/debounce";
import { SEARCH_AUTO_COMPLETE_RECIPE } from "pages/AutocompleteRequest";
import { recipesBegginerFullXp } from "pages/GreenitFullXp/FullXpHelper";
import { Community } from "pages/LandingPage/Components/Community";
import "pages/LandingPage/LandingPage.css";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import "pages/recipe/SinglePage/SinglePage.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "react-multi-carousel/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
import { GET_FEATURE_BY_NAME } from "services/feature.service";
import { landingPageCategories } from "utils";
import ModalPersonalization from "../../components/personalization/ModalPersonalization";
import { useRecipesQuery } from "../../graphql";
import { CategoryCircle } from "./Components/CategoryCircle";
import { Newsletter } from "./Components/Newsletter";

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

  const { data: dataIngredientCuisine } = useRecipesQuery({
    variables: {
      first: 8,
      filter: { tags: ["Avec les ingrédients de la cuisine"] },
    },
  });

  const { data: dataById } = useRecipesQuery({
    variables: { filter: { id: ["8485c5ae-4175-474b-9107-9aa306874c5f"] } },
  });

  const { data: dataHome } = useRecipesQuery({
    variables: { first: 8, filter: { category: ["Maison"] } },
  });

  const { data: dataHair } = useRecipesQuery({
    variables: { first: 8, filter: { category: ["Cheveux"] } },
  });

  const { data: dataSearchMasque } = useRecipesQuery({
    variables: { first: 8, filter: { search: "Masque" } },
  });

  const { data: dataNbrLikes } = useRecipesQuery({
    variables: { first: 8, filter: { isOrderByNumberLike: true } },
  });

  const [showModalComingSoon, setShowModalComingSoon] = useState(false);

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
    !dataHome ||
    !dataHair ||
    !dataSearchMasque ||
    !dataIngredientCuisine ||
    !dataById ||
    !dataNbrLikes ||
    !dataOutOfStock ||
    !dataFullXP
  ) {
    return <Loading />;
  }

  const recipes = dataIsDiplayHome.allRecipes?.edges || [];
  const recipesBegginer = dataBegginer.allRecipes?.edges || [];
  const dataHomes = dataHome.allRecipes?.edges || [];
  const dataHairs = dataHair.allRecipes?.edges || [];
  const dataSearchMasques = dataSearchMasque.allRecipes?.edges || [];
  const dataIngredientCuisines = dataIngredientCuisine.allRecipes?.edges || [];
  const dataByIds = dataById.allRecipes?.edges || [];
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
          className="flex flex-col items-center | md:px-4
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
                className="sm:opacity-10 lg:opacity-100 absolute top-20 -left-10"
                src={TopImageDesktopLeft}
                alt="Communauté Greenit partie 1"
                loading="lazy"
              />
              <img
                className="sm:opacity-10 lg:opacity-100 absolute top-10 right-0"
                alt="Communauté Greenit partie 2"
                src={TopImageDesktopRight}
                loading="lazy"
              />
            </>
          )}

          <div className={`relative mt-16 md:mt-6 mb-6 text-center`}>
            <h1 className="text-2xl md:text-3xl">
              {!isMobile ? (
                <>
                  <span className="text-green trait-img-desktop">Greenit</span>,
                  la communauté du fait-maison pour <br /> une consommation
                  durable !
                </>
              ) : (
                <>
                  <span className="text-green trait-img-mobile">Greenit</span>
                  , la communauté <br /> qui rend accessible le fait-maison
                </>
              )}
            </h1>
          </div>

          <div className="flex flex-row gap-2 w-9/12 sm:w-auto md:my-8 mx-12">
            <div className="w-full md:w-3/5">
              <SearchBar
                keyId="landing-page-searchBar"
                suggestionIsActive={true}
                setValue={setSearchTermDebounced}
                isLoading={autoCompleteLoading}
                // @ts-ignore
                suggestions={recipesAutoComplete}
              />
            </div>
            <ModalPersonalization
              btn={
                <Button
                  className="hidden md:flex z-10 h-12"
                  haveIcon={true}
                  type="green"
                  onClick={() => setShowModal(true)}
                  id="landing-nextTosearchbar-mes-particularites"
                >
                  <i className="bx bxs-category-alt text-2xl mt-0.5 mr-2"></i>
                  Définir mes particularités
                </Button>
              }
            />
          </div>
          <div className="text-center my-5">
            <h4 className="font-semibold text-xl">
              Notre sélection de la semaine
            </h4>
          </div>
          {isMobile ? (
            <div className="grid grid-cols-2 mb-2 sm:grid-cols-3">
              {recipes?.slice(0, 6).map((recipe, index: number) => (
                <RecipeCard
                  recipe={recipe?.node}
                  key={recipe?.node?.id}
                  id={recipe?.node?.id}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 justify-items-center gap-y-8 gap-x-2">
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
        className="flex flex-col justify-center items-center | md:px-4
         | mt-20 md:mt-12 mb-12 text-center md:w-10/12 | relative"
      >
        {isMobile ? (
          <>
            <img
              className="h-36 absolute top-10 left-0"
              alt="100% fait maison"
              src={Mobile_faceillu}
              loading="lazy"
            />
            <img
              className="h-40 absolute -top-16 right-0"
              alt="100% fait maison"
              src={Mobile_hairillu}
              loading="lazy"
            />
          </>
        ) : (
          <>
            <img
              className="w-60 h-60 absolute top-10 right-0"
              alt="100% fait maison"
              src={Desktop_hairillu}
              loading="lazy"
            />
            <img
              className="w-60 h-60 absolute top-16 left-0"
              alt="100% fait maison"
              src={Desktop_faceillu}
              loading="lazy"
            />
          </>
        )}

        <div className="">
          <h2 className="text-3xl | font-diy">Nouvelle fonctionnalité !</h2>
          <h2 className="text-2xl md:text-2xl mb-6">Sélection personnalisée</h2>
        </div>
        <ModalPersonalization
          btn={
            <Button
              className="mr-3 mb-10"
              haveIcon={true}
              type="green"
              id="landing-mes-particularites"
            >
              <i className="bx bxs-category-alt text-2xl mt-0.5 mr-2"></i>
              Définir mes particularités
            </Button>
          }
        ></ModalPersonalization>
        <h4 className="mb-4 mt-1 mx-5 md:font-normal">
          Indique tes particularités pour trouver des {!isMobile && <br />}{" "}
          recettes personnalisées à tes besoins
        </h4>
        <h2 className="text-3xl | font-diy msm:mb-6">
          type de peau + type de cheveux + {!isMobile && <br />} particularités
        </h2>
      </Container>
      <Container
        className="flex flex-col justify-center items-center md:items-start | md:px-4
         | text-center md:text-left w-full | bg-yellowL"
      >
        <div className="md:w-10/12 mt-12 mb-12 md:ml-24">
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
                      src={recipe.miniatureImage}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
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
                  id="landing-page-box-button-je-commande"
                  type="green"
                  onClick={() => history.push(RouteName.startDiyGreenitFullXp)}
                >
                  Je commande
                </Button>
                <Button
                  id="landing-box-button-en-savoir-plus"
                  type="darkBlue"
                  onClick={() => history.push(RouteName.startDiyGreenitFullXp)} // Mettre la bonne route
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 text-center bg-blueL w-full relative | pb-5"
      >
        {!isMobile && (
          <img
            className="h-56 absolute -top-28 right-0"
            alt="Mon savon ? Je le fais moi-même"
            src={LPImage4Desktop}
            loading="lazy"
          />
        )}
        <div className="flex flex-col md:flex-row md:self-start md:space-x-4 md:ml-14">
          <h2 className="text-xl md:text-2xl font-semibold">
            Les recettes 100% débutants
          </h2>
          <h2 className="font-diy text-2xl">idéal pour se lancer !</h2>
        </div>
      </Container>
      <div className="md:flex md:justify-center w-full pt-4 pl-4 overflow-x-auto pb-12 bg-blueL">
        <div className="flex w-max">
          {recipesBegginer?.slice(0, totalRecipeCards).map(recipe => (
            <div className="flex mr-2">
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            </div>
          ))}
          <ExploreMore
            filter="tags=Premiers pas"
            id="landing-debutant-debutant"
          />
        </div>
      </div>
      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 text-center bg-blueL w-full | pb-5"
      >
        <div className="flex flex-col md:flex-row md:self-start md:space-x-4 md:ml-24">
          <h2 className="text-xl md:text-2xl font-semibold">
            Tout pour la maison
          </h2>
          <h2 className="font-diy text-2xl">recettes pour un ménage écolo !</h2>
        </div>
      </Container>
      <div className="md:flex md:justify-center w-full pt-4 pl-4 overflow-x-auto pb-24 bg-blueL">
        <div className="flex w-max">
          {dataHomes?.slice(0, totalRecipeCards).map(recipe => (
            <div className="flex mr-2">
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            </div>
          ))}
          <ExploreMore filter="category=Maison" id="landing-maison-explorer" />
        </div>
      </div>
      <Container
        className="relative w-full flex flex-col items-center | md:px-4
        | mt-16 mb-12 text-center"
      >
        <img
          className="h-40 absolute right-6 -top-32"
          alt="Mon savon ? Je le fais moi-même"
          src={isMobile ? BadgeSavonMobile : BadgeSavonDesktop}
          loading="lazy"
        />
        <h2 className="text-xl md:text-2xl msm:mt-14">
          Les catégories les plus inspirantes
        </h2>
        <div className="grid pt-9 grid-cols-2 gap-x-11 gap-y-11 md:flex ">
          {landingPageCategories.map(item => (
            <CategoryCircle
              isLandingPage={true}
              name={item.title}
              icon={item.icon}
              key={item.title}
              id={item.title}
            />
          ))}
        </div>
      </Container>
      <div className="w-full bg-yellowL">
        <div className="md:flex md:items-center md:justify-start md:space-x-0 md:mt-10 md:ml-10 md:mr-20">
          <Container
            className="md:w-1/3 flex flex-col items-center | md:px-4
         | pt-9 text-center md:text-left bg-yellowL w-full"
          >
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold">
                Les recettes avec {!isMobile && <br />} les ingrédients chez
                vous
              </h2>
              <h2 className="font-diy text-2xl md:text-3xl">
                Bicarbonate, savon de marseille, curcumin …
              </h2>
            </div>
          </Container>
          <div className="w-full md:w-3/5 pt-4 pl-4 overflow-x-auto pb-12 bg-yellowL">
            <div className="md:flex md:justify-center">
              <div className="flex w-max">
                {dataIngredientCuisines
                  ?.slice(0, isMobile ? totalRecipeCards : 3)
                  .map(recipe => (
                    <div className="flex mr-2">
                      <RecipeCard
                        recipe={recipe?.node}
                        key={recipe?.node?.id}
                      />
                    </div>
                  ))}
                {/*Todo: Fill category later*/}
                {isMobile && (
                  <ExploreMore
                    filter="category=Avec les ingrédients de la cuisine"
                    id="landing-maison-ingr-cuisine"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="md:flex md:items-center md:justify-start md:space-x-0 md:ml-20 md:mr-10">
            <div className="w-full md:w-3/5 pt-4 pl-4 overflow-x-auto pb-12 bg-yellowL">
              <div className="md:flex md:justify-center">
                <div className="flex w-max">
                  {dataIngredientCuisines
                    ?.slice(3, isMobile ? totalRecipeCards : 6)
                    .map(recipe => (
                      <div className="flex mr-2">
                        <RecipeCard
                          recipe={recipe?.node}
                          key={recipe?.node?.id}
                        />
                      </div>
                    ))}
                  {/*Todo: Fill category later*/}
                  {isMobile && (
                    <ExploreMore
                      filter="category=Avec les ingrédients de la cuisine"
                      id="landing-maison-ingr-cuisine"
                    />
                  )}
                </div>
              </div>
            </div>
            <Container
              className="md:w-1/3 flex flex-col items-center | md:px-4
         | pt-9 text-center md:text-left bg-yellowL w-full"
            >
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Envie de profiter des bienfaits de l’avocat, de l’huile
                  d’olive ou des graines de lin ?
                </h2>
                <h2 className="font-diy text-3xl">
                  Banane, oeuf, amidon de maïs…
                </h2>
              </div>
            </Container>
          </div>
        )}
      </div>
      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 text-center w-full"
      >
        <h2 className="text-2xl font-semibold mx-10 mb-5">
          Derrière Greenit {isMobile && <br />} des passionnés, des curieux,{" "}
          {isMobile && <br />} des donateurs, des débutants. . .
        </h2>
      </Container>
      {/*Todo: Refactor later*/}
      <Community isMobile={isMobile} />
      <div className="relative">
        <img
          className="w-44 h-20 md:w-72 absolute top-[-12%] right-[35%] md:top-[-7%] md:right-[40%]"
          alt="Ma marque préférée"
          src={isMobile ? BadgeMarqueMobile : BadgeMarqueDesktop}
          loading="lazy"
        />
        <Newsletter />
      </div>
      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 pb-12 md:mt-4 text-center md:w-full"
      >
        <div className="flex flex-col md:self-start md:space-x-4 md:ml-14">
          <h2 className="text-xl md:text-2xl font-semibold">
            Le DIY c’est reprendre le contôle {isMobile && <br></br>} sur sa
            consommation
          </h2>
          <h2 className="font-diy text-2xl text-left no-margin">
            Le diy pour ta santé, ton bien-être et un mode de vie viable
          </h2>
        </div>
        <div className="md:flex md:items-center md:space-x-24">
          <div
            className={`${isMobile && "flex items-center justify-center"} mt-5`}
          >
            <RecipeCard
              recipe={dataByIds[0]?.node}
              key={dataByIds[0]?.node?.id}
            />
          </div>
          <div className="flex mt-6">
            <CircleGreenit
              sizeCircle="w-24 h-24"
              colorCircle="bg-blue"
              icon={
                <i className="bx bxs-vial -rotate-12 absolute w-8 h-8 icon-position-circle bx-md"></i>
              }
              symbol=""
              number={"6"}
              text="Substances épargnées"
            />
            <CircleGreenit
              sizeCircle="w-24 h-24"
              colorCircle="bg-yellow"
              icon={
                <i className="bx bx-euro absolute w-8 h-8 icon-position-circle bx-md"></i>
              }
              customClassName="ml-16"
              symbol="€"
              number={"2"}
              text="Argent économisé"
            />
            <CircleGreenit
              sizeCircle="w-24 h-24"
              colorCircle="bg-green"
              icon={
                <i className="bx bx-leaf absolute w-8 h-8 icon-position-circle bx-md"></i>
              }
              customClassName="ml-16"
              symbol="g"
              number={"70"}
              text="Plastiques évités"
            />
          </div>
          <p className="mt-6 md:text-left">
            Passer au fait-maison c’est des économies ! <br></br> Ça te fait du
            bien et ça fait du bien à la planète.
          </p>
        </div>
      </Container>
      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 pb-12 md:mt-4 text-center bg-yellowL w-full"
      >
        <div className="md:flex md:items-start md:space-x-20">
          <div className="md:text-left md:mt-5">
            <h2 className="text-xl md:text-2xl  font-semibold">
              Le guide pour se lancer dans le fait-maison
            </h2>
            <h2 className="font-diy text-2xl">
              co-écrit avec des experts de la communauté Greenit !
            </h2>
            {!isMobile && (
              <Link to={RouteName.starterPage}>
                <Button
                  className="mt-5"
                  type="darkBlue"
                  id="landing-page-voir-le-guide"
                >
                  Voir le guide
                </Button>
              </Link>
            )}
          </div>
          <div className="flex flex-row gap-2 my-6 justify-evenly lg:gap-6">
            {[
              {
                icon: "bx-donate-heart",
                title: "3 conseils pour débuter",
                id: "landing-3-conseils-pour-débuter",
              },
              {
                icon: "bx-knife",
                title: "Les ingrédients et les ustentiles",
                id: "landing-ingredients-et-ustentiles",
              },
              {
                icon: "bx-bowl-hot",
                title: "2 recettes simples",
                id: "landing-2-recette-simples",
              },
            ].map(item => (
              <Link to={RouteName.starterPage} key={item.id} id={item.id}>
                <div className="w-32 h-32 md:w-36 md:h-36 grid bg-white rounded-xl shadow-lg p-1 md:p-4 | cursor-pointer transform sm:hover:scale-105 ease-linear transition-all duration-150 m-auto | hover:border-2">
                  <i className={`bx ${item.icon} bx-md mt-4`}></i>
                  <p>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {isMobile && (
          <Link to={RouteName.starterPage}>
            <Button className="" type="darkBlue" id="landing-voir-le-guide">
              Voir le guide
            </Button>
          </Link>
        )}
      </Container>
      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 text-center bg-blueL w-full | pb-5"
      >
        <div className="flex flex-col md:flex-row md:self-start md:space-x-4 md:ml-14">
          <h2 className="text-xl md:text-2xl font-semibold">
            Les recettes de shampooings et soins
          </h2>
          <h2 className="font-diy text-2xl">pour des cheveux soyeux</h2>
        </div>
      </Container>
      <div className="md:flex md:justify-center w-full pt-4 pl-4 overflow-x-auto pb-12 bg-blueL">
        <div className="flex w-max">
          {dataHairs?.slice(0, totalRecipeCards).map(recipe => (
            <div className="flex mr-2">
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            </div>
          ))}
          <ExploreMore
            filter="category=Cheveux"
            id="landing-shampoings-explorer"
          />
        </div>
      </div>

      <Container
        className="flex flex-col items-center | md:px-4
         | pt-9 text-center bg-blueL w-full | pb-5"
      >
        <div className="flex flex-col md:flex-row md:self-start md:space-x-4 md:ml-14">
          <h2 className="text-xl md:text-2xl font-semibold">
            Les recettes de masques
          </h2>
          <h2 className="font-diy text-2xl">adaptées à vos problématiques</h2>
        </div>
      </Container>
      <div className="md:flex md:justify-center w-full pt-4 pl-4 overflow-x-auto pb-24 bg-blueL">
        <div className="flex w-max">
          {dataSearchMasques?.slice(0, totalRecipeCards).map(recipe => (
            <div className="flex mr-2">
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            </div>
          ))}
          <ExploreMore filter="search=Masque" id="landing-masques-explorer" />
        </div>
      </div>
      <Container
        className="relative w-full h-full px-6 my-6 mt-40 md:mt-20 md:w-3/5"
        itemsCenter
      >
        <img
          className="h-52 absolute -top-64 md:-top-40 right-0 md:-right-72"
          alt="Mon savon ? Je le fais moi-même"
          src={isMobile ? BadgeControleMobile : BadgeControleDesktop}
          loading="lazy"
        />

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
