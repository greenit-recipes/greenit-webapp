import { RouteName } from "App";
import "components/layout/Navbar.css";
import React, { Suspense, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import authService from "services/auth.service";
import { SearchBar } from ".";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";
import { logo } from "../../icons";
import { NavButton } from "../misc/NavButton";
import { hasBoxBeginnerUrl } from "../../helpers/beginnerbox.helper";
import { Loading } from "components/layout/Loading";
import debounce from "lodash/debounce";
import { useQuery } from "@apollo/client";
import { SEARCH_AUTO_COMPLETE_RECIPE } from "../../pages/AutocompleteRequest";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(
    location.pathname !== RouteName.accueil &&
      location.pathname !== RouteName.recipes,
  );
  const [toggle, setToggle] = useState(false);
  const [hasUrl, setHasUrl] = useState(
    !!(
      hasBoxBeginnerUrl() &&
      (localStorage.getItem("isBeginnerBox") === "true" ||
        localStorage.setItem("isBeginnerBox", "true"))
    ),
  );

  const isLoggedIn = authService.isLoggedIn();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const setSearchTermDebounced = debounce(setSearchTerm, 250);

  // Ne par run au premier lancement
  const { data: autoCompleteData, loading: autoCompleteLoading } = useQuery(
    SEARCH_AUTO_COMPLETE_RECIPE,
    {
      fetchPolicy: "network-only",
      variables: { search: searchTerm },
      skip: !searchTerm,
    },
  );

  const recipesAutoComplete = autoCompleteData?.searchAutoCompleteRecipes || {
    recipes: [],
    ingredients: [],
    totalRecipes: 0,
  };

  const resetFilter = () =>
    window.sessionStorage.setItem("filterListPage", JSON.stringify({}));

  if (isMobile) {
    return (
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="grid items-center h-12 grid-cols-3">
          <div
            className="z-50 items-center w-full ml-2"
            onClick={() => {
              setToggle(prevState => !prevState);
            }}
          >
            <div className="grid gap-2">
              <div
                className={
                  toggle
                    ? "hamburger_fadeIn w-10 h-10 border-4"
                    : "hamburger_fadeOut w-8 h-4 border-t-4 border-b-4 border-black border-opacity-75"
                }
              ></div>
            </div>
          </div>
          <Link to="/" className="z-50 ">
            <h5
              id="home"
              className="self-center text-xl md:text-3xl font-bold text-center text-green"
            >
              Greenit
            </h5>
          </Link>
          {isLoggedIn ? (
            <div className="grid w-full justify-items-end">
              <Link to={RouteName.profil}>
                <Button
                  id="Access_Profil"
                  type="blue"
                  rounded="lg"
                  className="mr-1"
                >
                  <h2 id="Access_Profil" className="text-xs text-white">
                    Profil
                  </h2>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid w-full justify-items-end">
              <Suspense fallback={<Loading />}>
                <ModalLogGreenit
                  btn={
                    <Button
                      id="Create_Profil"
                      type="blue"
                      rounded="lg"
                      className="mr-1"
                    >
                      Créer un profil
                    </Button>
                  }
                  show={hasUrl}
                ></ModalLogGreenit>
              </Suspense>
            </div>
          )}
        </div>

        <div
          className={
            toggle
              ? "navBar_fadeIn h-screen bg-darkBlue"
              : "navBar_fadeOut h-screen "
          }
        >
          <div className="flex flex-col">
            <SearchBar keyId="SearchNavMobile" />
            <Link className="p-2 mt-3" to={RouteName.accueil}>
              <h2 id="home" className="text-white">
                Accueil
              </h2>
            </Link>
            <Link
              className="p-2"
              to={RouteName.recipes}
              onClick={() => resetFilter()}
            >
              <div className="border-b-2 border-transparent">
                <h2 id="recipes" className="text-white focus:text-green">
                  Recettes
                </h2>
              </div>
            </Link>
            <Link className="p-2" to={RouteName.startDiyGreenitFullXp}>
              <h2 id="nav-box-mobile" className="text-white">
                Kit fait-maison
              </h2>
            </Link>
            <Link className="p-2" to={RouteName.workshops}>
              <h2 id="workshops" className="text-white">
                Se former
              </h2>
            </Link>
            <Link className="p-2" to={RouteName.starterPage}>
              <h2 id="getStarted" className="text-white">
                Se lancer
              </h2>
            </Link>
            <Link className="p-2" to={RouteName.why}>
              <h2 id="project" className="text-white">
                Le projet
              </h2>
            </Link>
            <hr className="mt-5 mb-2 border-white border" />
            <Link className="p-2" to={RouteName.createRecipe}>
              <h2 id="sharedRecipeNavMobile" className="text-white">
                Partager une recette
              </h2>
            </Link>
            {isLoggedIn ? (
              <Link id="Access_Profil" className="p-2" to={RouteName.profil}>
                <h2 id="Access_Profil" className="text-white">
                  Mon profil
                </h2>
              </Link>
            ) : (
              <Suspense fallback={<Loading />}>
                <ModalLogGreenit
                  isModalLogin={true}
                  show={hasUrl}
                  btn={
                    <div className="p-2">
                      <h2 className="text-white">Se connecter</h2>{" "}
                    </div>
                  }
                ></ModalLogGreenit>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-16 w-full | sticky top-0 bg-white z-50">
      <div className="grid items-center justify-items-center">
        <Link to={RouteName.accueil}>
          <img
            src={logo}
            className="h-10 w-10 | ml-4 self-center"
            alt="Greenit Logo"
            loading="lazy"
            id="home"
          />
        </Link>
      </div>
      <div
        className={`flex flex-row items-center w-${
          showSearchBar ? "[45%]" : "3/5"
        } h-full ml-4 justify-items-start`}
      >
        <Link to={RouteName.accueil}>
          <NavButton id="home" type="black">
            Accueil
          </NavButton>
        </Link>
        <div className="w-auto" id="navmenu_big">
          <Link to={RouteName.recipes} onClick={() => resetFilter()}>
            <NavButton id="recipes" type="green">
              Recettes
            </NavButton>
          </Link>
          <div id="navlist_big">
            <div className="grid w-2/5 grid-cols-3 pt-2 ml-20 justify-items-center">
              <div className="flex flex-col pt-4 text-lg">
                <h4 className="mb-2 cursor-default">Raccourcis</h4>

                <Link
                  id="allRecipes"
                  to={RouteName.recipes}
                  onClick={() => resetFilter()}
                >
                  <div
                    id="allRecipes"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Toutes les recettes
                  </div>
                </Link>
                {isLoggedIn ? (
                  <Link to={RouteName.createRecipe} className="flex">
                    <div
                      id="shareRecipe"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Partager une recette
                    </div>
                  </Link>
                ) : (
                  <Link to={RouteName.createRecipe} className="flex">
                    <div
                      id="shareRecipe"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Partager une recette
                    </div>
                  </Link>
                )}

                <Link to={`${RouteName.recipes}?tags=Premiers pas`}>
                  <div
                    id="firstSteps"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Premiers pas
                  </div>
                </Link>
                <Link
                  to={`${RouteName.recipes}?tags=Avec les ingrédients de la cuisine`}
                >
                  <div
                    id="withKitchenIngredients"
                    className="mb-2 text-left cursor-pointer hover:text-green"
                  >
                    Avec les ingrédients de la cuisine
                  </div>
                </Link>
                <Link to={`${RouteName.recipes}?tags=Sans cuisson`}>
                  <div
                    id="withoutCooking"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Sans cuisson
                  </div>
                </Link>
              </div>
              <div className="flex flex-col pt-4 text-lg">
                <h4 className="mb-2 cursor-default">Catégories</h4>{" "}
                <Link id="house" to={`${RouteName.recipes}?category=Maison`}>
                  <div
                    id="house"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Maison
                  </div>
                </Link>
                <Link id="body" to={`${RouteName.recipes}?category=Corps`}>
                  <div
                    id="body"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Corps
                  </div>
                </Link>
                <Link id="face" to={`${RouteName.recipes}?category=Visage`}>
                  <button id="face">
                    <div
                      id="face"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Visage
                    </div>
                  </button>
                </Link>
                <Link to={`${RouteName.recipes}?category=Cheveux`}>
                  <div
                    id="hair"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Cheveux
                  </div>
                </Link>
                <Link
                  id="wellBeing"
                  to={`${RouteName.recipes}?category=Bien-être`}
                >
                  <div
                    id="wellBeing"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Bien-être
                  </div>
                </Link>
                <Link id="health" to={`${RouteName.recipes}?category=Santé`}>
                  <div
                    id="health"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Santé
                  </div>
                </Link>
                <Link
                  id="makeUp"
                  to={`${RouteName.recipes}?category=Maquillage`}
                >
                  <div
                    id="makeUp"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Maquillage
                  </div>
                </Link>
              </div>
              <div className="flex flex-col pt-4 text-lg">
                <h4 className="mb-2 cursor-default">Type de produit</h4>
                <Link to={`${RouteName.recipes}?search=Savon`}>
                  <div
                    id="soap"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Savon
                  </div>
                </Link>
                <Link to={`${RouteName.recipes}?search=Shampooing`}>
                  <div
                    id="shampoo"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Shampooing
                  </div>
                </Link>
                <Link to={`${RouteName.recipes}?search=Baume`}>
                  <div
                    id="balm"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Baume
                  </div>
                </Link>
                <Link to={`${RouteName.recipes}?search=Solide`}>
                  <div
                    id="solid"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Solide
                  </div>
                </Link>
                <Link to={`${RouteName.recipes}?search=Crème`}>
                  <div
                    id="cream"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Crème
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link to={RouteName.startDiyGreenitFullXp}>
          <NavButton id="box-nav" type="black">
            Kit fait-maison
          </NavButton>
        </Link>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.workshops}>
            <NavButton id="workshops" type="yellow">
              Se former
            </NavButton>
          </Link>
          <div id="navlist" className="grid pt-2 justify-items-start">
            <div className="flex flex-col pt-4 ml-40 text-lg">
              <Link to={RouteName.workshops}>
                <div
                  id="allWorkshops"
                  className="mb-2 cursor-pointer hover:text-yellow"
                >
                  Tous les ateliers
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.starterPage}>
            <NavButton id="getStarted" type="blue">
              Se lancer
            </NavButton>
          </Link>
          <div id="navlist" className="grid pt-2 justify-items-start">
            <div className="flex flex-col pt-4 text-lg w-96 ml-99">
              <Link to={RouteName.starterPage}>
                <div
                  id="fiveStepGuide"
                  className="mb-2 text-left cursor-pointer hover:text-blue"
                >
                  Le guide en 5 étapes pour se lancer dans le fait-maison avec 3
                  recettes faciles pour débuter, les ustensiles et ingrédients
                  nécéssaires ainsi que des conseils indispensables.
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.why}>
            <NavButton id="project" type="darkBlue">
              Le projet
            </NavButton>
          </Link>
          <div id="navlist" className="grid pt-2 justify-items-start">
            <div className="flex flex-col pt-4 text-lg ml-100">
              <Link to={RouteName.why}>
                <div
                  id="whyGreenit"
                  className="mb-2 cursor-pointer hover:text-darkBlue"
                >
                  Pourquoi Greenit ?
                </div>
              </Link>
              <Link to={RouteName.contact}>
                <div
                  id="contactUs"
                  className="mb-2 cursor-pointer hover:text-darkBlue"
                >
                  Contacte-nous
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*Todo : Update width dynamically with custom breakpoints on smaller screens*/}
      {showSearchBar && (
        <div className="flex flex-row w-1/4 h-full items-center">
          <SearchBar
            keyId="searchBarNav"
            size="small"
            suggestionIsActive={true}
            setValue={setSearchTermDebounced}
            isLoading={autoCompleteLoading}
            // @ts-ignore
            suggestions={recipesAutoComplete}
          />
        </div>
      )}
      <div
        className={`grid items-center w-${
          showSearchBar ? "1/4" : "3/5"
        } justify-self-end`}
      >
        <div className="flex space-between items-center justify-self-end">
          {isLoggedIn ? (
            <Link to={RouteName.createRecipe} className="flex">
              <div className="transition-all duration-150 ease-linear rounded-full cursor-pointer">
                <div className="flex">
                  <Button
                    id="Share_a_recipe"
                    type="darkBlue"
                    rounded="lg"
                    className="inline justify-end self-center | mr-2 cursor-pointer"
                  >
                    Partager une recette
                  </Button>
                </div>
              </div>
            </Link>
          ) : (
            <Link to={RouteName.createRecipe} className="flex">
              <div className="transition-all duration-150 ease-linear rounded-full cursor-pointer">
                <div className="flex">
                  <Button
                    id="Share_a_recipe"
                    type="darkBlue"
                    rounded="lg"
                    className="inline justify-end self-center | mr-2 cursor-pointer"
                  >
                    Partager une recette
                  </Button>
                </div>
              </div>
            </Link>
          )}
          {isLoggedIn ? (
            <Link to={RouteName.profil}>
              <div className="transition-all duration-150 ease-linear rounded-full cursor-pointer">
                <div className="flex">
                  <Button
                    id="Access_Profil"
                    type="blue"
                    rounded="lg"
                    className="inline justify-end self-center | mr-4 cursor-pointer"
                  >
                    Profil
                  </Button>
                </div>
              </div>
            </Link>
          ) : (
            <Suspense fallback={<Loading />}>
              <ModalLogGreenit
                show={hasUrl}
                btn={
                  <div className="flex">
                    <Button
                      id="Create_Profil"
                      type="blue"
                      rounded="lg"
                      className="inline justify-end self-center | cursor-pointer mr-2"
                    >
                      Accéder au profil
                    </Button>
                  </div>
                }
              ></ModalLogGreenit>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};
