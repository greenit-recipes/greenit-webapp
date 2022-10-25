import { RouteName } from "App";
import "components/layout/Navbar.css";
import React, { Suspense, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import Modal from "./Modal/Modal";
import { ModalMarketTest } from "./Modal/modalMarketTest";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(
    location.pathname !== RouteName.accueil &&
      location.pathname !== RouteName.recipes &&
      location.pathname !== RouteName.market,
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

  const [showModalMarket, setShowModalMarket] = useState(false);
  // @ts-ignore

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
              id="navbar-Greenit"
              className="self-center text-xl md:text-3xl font-bold text-center text-green"
            >
              Greenit
            </h5>
          </Link>
          {isLoggedIn ? (
            <div
              id="navBar-profil-loggedIn"
              className="grid w-full justify-items-end"
            >
              <Link to={RouteName.profil}>
                <div
                  id="navBar-profil-loggedIn"
                  className="px-2 cursor-pointer"
                >
                  <i
                    className="bx bxs-user text-blue text-3xl hover:transition-all hover:scale-105 hover:duration-150 hover:ease-linear"
                    id="navBar-profil-loggedIn"
                  ></i>
                </div>
              </Link>
            </div>
          ) : (
            <div className="grid w-full justify-items-end">
              <Suspense fallback={<Loading />}>
                <ModalLogGreenit
                  btn={
                    <Button
                      id="navbar-create-profil"
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
            <SearchBar keyId="menu-searchBar-mobile" />
            <Link className="p-2 mt-3" to={RouteName.accueil}>
              <h2 id="navbar-home" className="text-white">
                Accueil
              </h2>
            </Link>
            <Link className="p-2" to={RouteName.market}>
              <h2 id="navbar-market" className="text-white">
                Market{" "}
                <span className="text-xs font-light" id="navbar-market">
                  {" "}
                  : ingrédients à petits prix
                </span>
              </h2>
            </Link>
            <Link
              className="p-2"
              to={RouteName.recipes}
              onClick={() => resetFilter()}
            >
              <div className="border-b-2 border-transparent">
                <h2
                  id="navbar-recipes-mobile"
                  className="text-white focus:text-green"
                >
                  Recettes
                </h2>
              </div>
            </Link>

            <div className="border-b-2 border-transparent p-2">
              <h2
                id="navbar-box-mobile"
                className="text-white focus:text-green"
                onClick={() => history.push(RouteName.greenitFullXp)}
              >
                Notre kit débutant
              </h2>
            </div>
            <Link className="p-2" to={RouteName.starterPage}>
              <h2 id="navbar-getStarted-mobile" className="text-white">
                Se lancer
              </h2>
            </Link>
            <Link className="p-2" to={RouteName.why}>
              <h2 id="navbar-project-mobile" className="text-white">
                Le projet
              </h2>
            </Link>
            <hr className="mt-5 mb-2 border-white border" />
            <Link
              className="p-2"
              id="navbar-sharedRecipe-mobile"
              to={RouteName.createRecipe}
            >
              <h2 id="navbar-sharedRecipe-mobile" className="text-white">
                Partager une recette
              </h2>
            </Link>
            {isLoggedIn ? (
              <Link
                id="navbar-access-profil-logged"
                className="p-2"
                to={RouteName.profil}
              >
                <h2
                  id="navbar-access-profil-logged-mobile"
                  className="text-white"
                >
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
            id="navbar-logohome"
          />
        </Link>
      </div>
      <div
        className={`flex flex-row items-center w-${
          showSearchBar ? "[45%]" : "3/5"
        } h-full ml-4 justify-items-start`}
      >
        <Link to={RouteName.accueil}>
          <NavButton id="navbar-home" type="black">
            Accueil
          </NavButton>
        </Link>
        <Link to={RouteName.market}>
          <NavButton id="navbar-market" type="black">
            Market{" "}
            <span className="text-sm font-light ml-1" id="navbar-market">
              {" "}
              : ingrédients à petits prix
            </span>
          </NavButton>
        </Link>
        <div className="w-auto" id="navmenu_big">
          <Link to={RouteName.recipes} onClick={() => resetFilter()}>
            <NavButton id="navbar-recipes" type="green">
              Recettes
            </NavButton>
          </Link>
          <div id="navlist_big">
            <div className="grid w-2/5 grid-cols-3 pt-2 ml-20 justify-items-center">
              <div className="flex flex-col pt-4 text-lg">
                <h4 className="mb-2 cursor-default font-bold">Raccourcis</h4>

                <Link
                  id="navbar-allRecipes"
                  to={RouteName.recipes}
                  onClick={() => resetFilter()}
                >
                  <h4
                    id="navbar-allRecipes"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Toutes les recettes
                  </h4>
                </Link>
                {isLoggedIn ? (
                  <Link
                    id="navbar-shareRecipe-logged"
                    to={RouteName.createRecipe}
                    className="flex sm:hidden lg:visible"
                  >
                    <h4
                      id="navbar-shareRecipe-logged"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Partager une recette
                    </h4>
                  </Link>
                ) : (
                  <Link
                    id="navbar-shareRecipe"
                    to={RouteName.createRecipe}
                    className="flex sm:hidden lg:visible"
                  >
                    <h4
                      id="navbar-shareRecipe"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Partager une recette
                    </h4>
                  </Link>
                )}

                <Link
                  id="navbar-premiesrPas"
                  to={`${RouteName.recipes}?tags=Premiers pas`}
                >
                  <h4
                    id="navbar-premiesrPas"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Premiers pas
                  </h4>
                </Link>
                <Link
                  id="navbar-ingredients-cuisine"
                  to={`${RouteName.recipes}?tags=Avec les ingrédients de la cuisine`}
                >
                  <h4
                    id="navbar-ingredients-cuisine"
                    className="mb-2 text-left cursor-pointer hover:text-green"
                  >
                    Avec les ingrédients de la cuisine
                  </h4>
                </Link>
                <Link
                  id="navbar-sans-cuisson"
                  to={`${RouteName.recipes}?tags=Sans cuisson`}
                >
                  <h4
                    id="navbar-sans-cuisson"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Sans cuisson
                  </h4>
                </Link>
              </div>
              <div className="flex flex-col pt-4 text-lg">
                <h4 className="mb-2 cursor-default font-bold">Catégories</h4>{" "}
                <Link
                  id="navbar-maison"
                  to={`${RouteName.recipes}?category=Maison`}
                >
                  <h4
                    id="navbar-maison"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Maison
                  </h4>
                </Link>
                <Link
                  id="navbar-corps"
                  to={`${RouteName.recipes}?category=Corps`}
                >
                  <h4
                    id="navbar-corps"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Corps
                  </h4>
                </Link>
                <Link
                  id="navbar-visage"
                  to={`${RouteName.recipes}?category=Visage`}
                >
                  <button id="navbar-visage">
                    <h4
                      id="navbar-visage"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Visage
                    </h4>
                  </button>
                </Link>
                <Link
                  id="navbar-cheveux"
                  to={`${RouteName.recipes}?category=Cheveux`}
                >
                  <h4
                    id="navbar-cheveux"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Cheveux
                  </h4>
                </Link>
                <Link
                  id="navbar-bienetre"
                  to={`${RouteName.recipes}?category=Bien-être`}
                >
                  <h4
                    id="navbar-bienetre"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Bien-être
                  </h4>
                </Link>
                <Link
                  id="navbar-sante"
                  to={`${RouteName.recipes}?category=Santé`}
                >
                  <h4
                    id="navbar-sante"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Santé
                  </h4>
                </Link>
                <Link
                  id="navbar-makeUp"
                  to={`${RouteName.recipes}?category=Maquillage`}
                >
                  <h4
                    id="navbar-makeUp"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Maquillage
                  </h4>
                </Link>
              </div>
              <div className="flex flex-col pt-4 text-lg">
                <h4 className="mb-2 cursor-default font-bold">
                  Type de produit
                </h4>
                <Link to={`${RouteName.recipes}?search=Savon`}>
                  <h4
                    id="navbar-savon"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Savon
                  </h4>
                </Link>
                <Link to={`${RouteName.recipes}?search=Shampooing`}>
                  <h4
                    id="navbar-shampoing"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Shampooing
                  </h4>
                </Link>
                <Link to={`${RouteName.recipes}?search=Baume`}>
                  <h4
                    id="navbar-baume"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Baume
                  </h4>
                </Link>
                <Link to={`${RouteName.recipes}?search=Solide`}>
                  <h4
                    id="navbar-solide"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Solide
                  </h4>
                </Link>
                <Link to={`${RouteName.recipes}?search=Crème`}>
                  <h4
                    id="navbar-creme"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Crème
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.starterPage}>
            <NavButton id="navbar-pageDebutant" type="blue">
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
          <Link to={RouteName.why} className="sm:hidden lg:block">
            <NavButton id="navbar-project" type="darkBlue">
              Le projet
            </NavButton>
          </Link>
          <div id="navlist" className="grid pt-2 justify-items-start">
            <div className="flex flex-col pt-4 text-lg ml-100">
              <Link to={RouteName.why}>
                <div
                  id="navbar-whyGreenit"
                  className="mb-2 cursor-pointer hover:text-darkBlue"
                >
                  Pourquoi Greenit ?
                </div>
              </Link>
              <Link to={RouteName.contact}>
                <div
                  id="navbar-contactUs"
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
      <div
        className={`grid items-center ${
          showSearchBar ? "grow" : "sm: w-1/3 md:w-3/5"
        } justify-self-end `}
      >
        <div className="flex space-between items-center justify-self-end">
          {showSearchBar && (
            <div className="mr-4 hidden lg:flex">
              <SearchBar
                keyId="navbar-searchBar"
                size="small"
                suggestionIsActive={true}
                setValue={setSearchTermDebounced}
                isLoading={autoCompleteLoading}
                // @ts-ignore
                suggestions={recipesAutoComplete}
              />
            </div>
          )}
          {isLoggedIn ? (
            <Link to={RouteName.createRecipe} className="flex">
              <div className="transition-all duration-150 ease-linear rounded-full cursor-pointer">
                <div className="flex sm:hidden lg:block">
                  <Button
                    id="navbar-shareRecipe-logged"
                    type="darkBlue"
                    rounded="lg"
                    className="inline justify-end self-center | mr-2 cursor-pointer | h-10"
                  >
                    Partager une recette
                  </Button>
                </div>
              </div>
            </Link>
          ) : (
            <>
              <div
                className="cursor-pointer pr-4"
                onClick={() => setShowModalMarket(true)}
              >
                <i
                  className="bx bx-cart text-yellow text-4xl hover:transition-all hover:scale-105 hover:duration-150 hover:ease-linear"
                  id="navBar-cart-notLogged"
                ></i>
              </div>
              <Modal
                isCenter={true}
                onClose={() => setShowModalMarket(false)}
                show={showModalMarket}
              >
                <div className="flex flex-col items-center p-4 text-center md:w-[800px]">
                  <ModalMarketTest />
                </div>
              </Modal>
              <Link to={RouteName.createRecipe} className="flex">
                <div className="transition-all duration-150 ease-linear rounded-full cursor-pointer">
                  <div className="flex sm:hidden lg:block">
                    <Button
                      id="navbar-shareRecipe"
                      type="darkBlue"
                      rounded="lg"
                      className="inline justify-end self-center | mr-2 cursor-pointer | h-10"
                    >
                      Partager une recette
                    </Button>
                  </div>
                </div>
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <>
              <div
                className="cursor-pointer px-2"
                onClick={() => setShowModalMarket(true)}
              >
                <i
                  className="bx bxs-cart text-yellow text-4xl hover:transition-all hover:scale-105 hover:duration-150 hover:ease-linear"
                  id="navBar-cart-LoggedIn"
                ></i>
              </div>
              <Modal
                isCenter={true}
                onClose={() => setShowModalMarket(false)}
                show={showModalMarket}
              >
                <div className="flex flex-col items-center p-4 text-center md:w-[800px]">
                  <ModalMarketTest />
                </div>
              </Modal>
              <Link to={RouteName.profil}>
                <div
                  id="navBar-profil-LoggedIn"
                  className="pl-2 pr-4 cursor-pointer"
                >
                  <i
                    className="bx bxs-user text-blue text-4xl hover:transition-all hover:scale-105 hover:duration-150 hover:ease-linear"
                    id="navBar-profil-LoggedIn"
                  ></i>
                </div>
              </Link>
            </>
          ) : (
            <Suspense fallback={<Loading />}>
              <ModalLogGreenit
                show={hasUrl}
                btn={
                  <div className="flex">
                    <Button
                      id="navbar-access-profil"
                      type="blue"
                      rounded="lg"
                      className="inline justify-end self-center | cursor-pointer mr-2 | h-10"
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
