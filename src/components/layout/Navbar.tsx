import { RouteName } from "App";
import { Modal } from "components/layout/Modal/Modal";
import "components/layout/Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";
import { SearchBar } from ".";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";
import { logo } from "../../icons";
import { NavButton } from "../misc/NavButton";
import { SearchBarNav } from "./SearchBarNav";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [toggle, setToggle] = useState(false);

  const isLoggedIn = authService.isLoggedIn();

  if (isMobile) {
    return (
      <div className="sticky top-0 z-50 bg-white w-full">
        <div className="grid grid-cols-3 items-center h-12">
          <div className="w-full ml-2 items-center z-50">
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
          <Link to="/" className=" z-50">
            <h5
              id="home"
              className="text-green text-center self-center text-3xl font-medium"
            >
              Greenit
            </h5>
          </Link>
          {isLoggedIn ? (
            <div className="w-full grid justify-items-end">
              <Link to={RouteName.profil}>
                <Button
                  id="Access_Profil"
                  type="blue"
                  rounded="lg"
                  className="mr-1"
                >
                  <h2 id="Access_Profil" className="text-white text-xs">
                    Profil
                  </h2>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="w-full grid justify-items-end">
              <Modal
                btn={
                  <>
                    <button
                      id="Create_Profil"
                      className="rounded-lg p-2 bg-blue mr-1"
                    >
                      <h2 id="Create_Profil" className="text-white text-xs">
                        Créer un profil
                      </h2>
                    </button>
                  </>
                }
              ></Modal>
            </div>
          )}
        </div>

        <div
          className={
            toggle ? "navBar_fadeIn h-screen" : "navBar_fadeOut h-screen"
          }
        >
          <div className="flex flex-col">
            <SearchBar keyId="SearchNavMobile" />
            <Link className="p-2 mt-3" to={RouteName.accueil}>
              <h2 id="home" className="text-white">
                Accueil
              </h2>
            </Link>
            <Link className="p-2" to={RouteName.recipes}>
              <div className="border-b-2 border-transparent">
                <h2 id="recipes" className="text-white focus:text-green">
                  Recettes
                </h2>
              </div>
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
            <hr className="mt-6"/>
            {isLoggedIn ? (
              <Link id="Access_Profil" className="p-2" to={RouteName.profil}>
                <h2 id="Access_Profil" className="text-white">
                  Mon profil
                </h2>
              </Link>
            ) : (
              <Modal
                isModalLogin={true}
                btn={
                  <div className="p-2">
                    <h2 className="text-white">Se connecter</h2>{" "}
                  </div>
                }
              ></Modal>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row h-16 w-full | sticky top-0 bg-white z-50">
      <div className="grid justify-items-center items-center">
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
      <div className="flex flex-row ml-4 w-2/3 h-full items-center justify-items-start">
        <Link to={RouteName.accueil}>
          <NavButton id="home" type="black">
            Accueil
          </NavButton>
        </Link>
        <div className="w-auto" id="navmenu_big">
          <Link to={RouteName.recipes}>
            <NavButton id="recipes" type="green">
              Recettes
            </NavButton>
          </Link>
          <div id="navlist_big">
            <div className="grid grid-cols-3 w-2/5 justify-items-center ml-20 pt-2">
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Raccourcis</h2>

                <Link id="allRecipes" to={RouteName.recipes}>
                  <h3
                    id="allRecipes"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Toutes les recettes
                  </h3>
                </Link>
                {isLoggedIn ? (
                  <Link to={RouteName.createRecipe} className="flex">
                    <h3
                      id="shareRecipe"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Partager une recette
                    </h3>
                  </Link>
                ) : (
                  <Modal
                    btn={
                      <>
                        <h3
                          id="shareRecipe"
                          className="mb-2 cursor-pointer hover:text-green"
                        >
                          Partager une recette
                        </h3>{" "}
                      </>
                    }
                  ></Modal>
                )}

                <Link to={`${RouteName.recipes}?tags=Premiers pas`}>
                  <h3
                    id="firstSteps"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Premiers pas
                  </h3>
                </Link>
                <Link
                  to={`${RouteName.recipes}?tags=Avec les ingrédients de la cuisine`}
                >
                  <h3
                    id="withKitchenIngredients"
                    className="mb-2 cursor-pointer text-left hover:text-green"
                  >
                    Avec les ingrédients de la cuisine
                  </h3>
                </Link>
                <Link to={`${RouteName.recipes}?tags=Sans cuisson`}>
                  <h3
                    id="withoutCooking"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Sans cuisson
                  </h3>
                </Link>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Catégories</h2>{" "}
                <Link id="house" to={`${RouteName.recipes}?category=Maison`}>
                  <h3
                    id="house"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Maison
                  </h3>
                </Link>
                <Link id="body" to={`${RouteName.recipes}?category=Corps`}>
                  <h3
                    id="body"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Corps
                  </h3>
                </Link>
                <Link id="face" to={`${RouteName.recipes}?category=Visage`}>
                  <button id="face">
                    <h3
                      id="face"
                      className="mb-2 cursor-pointer hover:text-green"
                    >
                      Visage
                    </h3>
                  </button>
                </Link>
                <Link to={`${RouteName.recipes}?category=Cheveux`}>
                  <h3
                    id="hair"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Cheveux
                  </h3>
                </Link>
                <Link
                  id="wellBeing"
                  to={`${RouteName.recipes}?category=Bien-être`}
                >
                  <h3
                    id="wellBeing"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Bien-être
                  </h3>
                </Link>
                <Link id="health" to={`${RouteName.recipes}?category=Santé`}>
                  <h3
                    id="health"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Santé
                  </h3>
                </Link>
                <Link
                  id="makeUp"
                  to={`${RouteName.recipes}?category=Maquillage`}
                >
                  <h3
                    id="makeUp"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Maquillage
                  </h3>
                </Link>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Type de produit</h2>
                <Link to={`${RouteName.recipes}?search=Savon`}>
                  <h3
                    id="soap"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Savon
                  </h3>
                </Link>
                <Link to={`${RouteName.recipes}?search=Shampooing`}>
                  <h3
                    id="shampoo"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Shampooing
                  </h3>
                </Link>
                <Link to={`${RouteName.recipes}?search=Baume`}>
                  <h3
                    id="balm"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Baume
                  </h3>
                </Link>
                <Link to={`${RouteName.recipes}?search=Solide`}>
                  <h3
                    id="solid"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Solide
                  </h3>
                </Link>
                <Link to={`${RouteName.recipes}?search=Crème`}>
                  <h3
                    id="cream"
                    className="mb-2 cursor-pointer hover:text-green"
                  >
                    Crème
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.workshops}>
            <NavButton id="workshops" type="yellow">
              Ateliers
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col text-lg ml-40 pt-4">
              <Link to={RouteName.workshops}>
                <h3
                  id="allWorkshops"
                  className="mb-2 cursor-pointer hover:text-yellow"
                >
                  Tous les ateliers
                </h3>
              </Link>
              <Link to={RouteName.workshops + "?scroolTo=physiqueWorkshop"}>
                <h3
                  id="ftfWorkshops"
                  className="mb-2 cursor-pointer hover:text-yellow"
                >
                  Ateliers en présentiel
                </h3>
              </Link>
              <Link to={RouteName.workshops + "?scroolTo=onlineWorkshop"}>
                <h3
                  id="onlineWorkshops"
                  className="mb-2 cursor-pointer hover:text-yellow"
                >
                  Ateliers en ligne
                </h3>
              </Link>
              <Link to={RouteName.workshops + "?scroolTo=suggestWorkshop"}>
                <h3
                  id="suggestWorkshop"
                  className="mb-2 cursor-pointer hover:text-yellow"
                >
                  Proposer un atelier
                </h3>
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
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col w-96 text-lg ml-99 pt-4">
              <Link to={RouteName.starterPage}>
                <h3
                  id="fiveStepGuide"
                  className="mb-2 cursor-pointer text-left hover:text-blue"
                >
                  Le guide en 5 étapes pour se lancer dans le fait-maison avec 3
                  recettes faciles pour débuter, les ustensiles et ingrédients
                  nécéssaires ainsi que des conseils indispensables.
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.why}>
            <NavButton id="project" type="grey">
              Le projet
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col text-lg pt-4 ml-100">
              <Link to={RouteName.why}>
                <h3
                  id="whyGreenit"
                  className="mb-2 cursor-pointer hover:text-grey"
                >
                  Pourquoi Greenit ?
                </h3>
              </Link>
              <Link to={RouteName.contact}>
                <h3
                  id="contactUs"
                  className="mb-2 cursor-pointer hover:text-grey"
                >
                  Contacte-nous
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid items-center w-3/5 justify-self-end">
        <div className="flex justify-self-end">
          <SearchBarNav keyId="SearchNav" />
          {isLoggedIn ? (
            <Link to={RouteName.createRecipe} className="flex">
              <Button
                id="Share_a_recipe"
                type="grey"
                rounded="lg"
                className="flex justify-end self-center | mr-2 cursor-pointer"
              >
                Partager une recette
              </Button>
            </Link>
          ) : (
<<<<<<< HEAD
            <Link to={RouteName.register} className="flex">
              <Button
                id="Share_a_recipe"
                type="grey"
                rounded="lg"
                className="flex justify-end self-center | mr-2 cursor-pointer"
              >
                {" "}
                Partager une recette
              </Button>
            </Link>
=======
            <Modal
              btn={
                <>
                  <Button
                    id="Share_a_recipe"
                    type="grey"
                    rounded="lg"
                    className="flex justify-end self-center text-xl | mr-2 cursor-pointer"
                  >
                    {" "}
                    Partager une recette
                  </Button>
                </>
              }
            ></Modal>
>>>>>>> 1192b09 (add new modal for login register, and delete previous route)
          )}
          {isLoggedIn ? (
            <Link to={RouteName.profil} className="flex">
              <Button
                id="Access_Profil"
                type="blue"
                rounded="lg"
                className="flex justify-end self-center | mr-4 cursor-pointer"
              >
                Profil
              </Button>
            </Link>
          ) : (
<<<<<<< HEAD
            <Link to={RouteName.register} className="flex">
              <Button
                id="Create_Profil"
                type="green"
                rounded="lg"
                className="flex justify-end self-center | cursor-pointer mr-2"
              >
                Créer un profil
              </Button>
            </Link>
=======
            <Modal
              btn={
                <>
                  <Button
                    id="Create_Profil"
                    type="green"
                    rounded="lg"
                    className="inline justify-end self-center | cursor-pointer mr-2"
                  >
                    Créer un profil
                  </Button>
                </>
              }
            ></Modal>
>>>>>>> 1192b09 (add new modal for login register, and delete previous route)
          )}
        </div>
      </div>
    </div>
  );
};
