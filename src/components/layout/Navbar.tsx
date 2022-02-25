import { RouteName } from "App";
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
  const [visible, setVisible] = React.useState(false);

  const isLoggedIn = authService.isLoggedIn();

  if (isMobile) {
    return (
      <div className="sticky top-0 z-50 bg-white w-full">
        <div className="grid grid-cols-3 items-center h-12">
          <div
            className="w-full ml-2 items-center z-50"
            onClick={() => {
              setToggle((prevState) => !prevState);
            }}
          >
            <div className="grid gap-2">
              <div
                className={
                  toggle
                    ? "hamburger_fadeIn w-8 h-8 border-4 border-white"
                    : "hamburger_fadeOut w-8 h-4 border-t-4 border-b-4 border-black border-opacity-75"
                }
              ></div>
            </div>
          </div>
          <Link to="/" className=" z-50">
            <h3 className="text-green text-center self-center text-3xl">
              Greenit
            </h3>
          </Link>
          {isLoggedIn ? (
            <div className="w-full grid justify-items-end">
              <Link className="" to={RouteName.profil}>
                <Button type="blue" rounded="lg" className="mr-1">
                  <h2 className="text-white text-xs">Profil</h2>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="w-full grid justify-items-end">
              <Link className="" to={RouteName.register}>
                <button className="rounded-lg p-2 bg-blue mr-1">
                  <h2 className="text-white text-xs">Créer un profil</h2>
                </button>
              </Link>
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
              <h2 className="text-white">Accueil</h2>
            </Link>
            <Link id="recipe-mobile" className="p-2" to={RouteName.recipes}>
              <div
                className="border-b-2 border-transparent"
                onClick={() => {
                  setVisible(true);
                }}
              >
                <h2 className="text-white focus:text-green">Recettes</h2>
              </div>
            </Link>
            <Link id="workshops-mobile" className="p-2" to={RouteName.workshops}>
              <h2 className="text-white">Ateliers</h2>
            </Link>
            <Link id="getStarted-mobile" className="p-2" to={RouteName.starterPage}>
              <h2 className="text-white">Se lancer</h2>
            </Link>
            <Link id="project-mobile" className="p-2" to={RouteName.why}>
              <h2 className="text-white">Le projet</h2>
            </Link>
            {isLoggedIn ? (
            <Link id="connexion-mobile" className="p-2" to={RouteName.profil}>
            <h2 className="text-white">Mon profil</h2>
          </Link>
          ) : (
            <Link id="connexion-mobile" className="p-2" to={RouteName.connexion}>
              <h2 className="text-white">Se connecter</h2>
            </Link>
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
          />
        </Link>
      </div>
      <div className="flex flex-row ml-4 w-2/3 h-full items-center justify-items-start">
        <Link to={RouteName.accueil}>
          <NavButton
            type="black"
            onClick={() => {
              setVisible(true);
            }}
          >
            Accueil
          </NavButton>
        </Link>
        <div className="w-auto" id="navmenu_big">
          <Link id="recipes" to={RouteName.recipes}>
            <NavButton
              type="green"
              onClick={() => {
                setVisible(true);
              }}
            >
              Recettes
            </NavButton>
          </Link>
          <div id="navlist_big">
            <div className="grid grid-cols-3 w-2/5 justify-items-center ml-20 pt-2">
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Racourcis</h2>

              <Link id="allRecipes" to={RouteName.recipes}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Toutes les recettes
                  </h3>
                </Link>
                <Link id="shareRecipe" to={isLoggedIn ? RouteName.createRecipe : RouteName.register}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Partager une recette
                  </h3>
                </Link>
                <Link id="firstSteps" to={`${RouteName.recipes}?tags=Premiers pas`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Premiers pas
                  </h3>
                </Link>
                <Link id="withKitchenIngredients" to={`${RouteName.recipes}?tags=Avec les ingrédients de la cuisine`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Avec les ingrédients de la cuisine
                  </h3>
                </Link>
                <Link id="withoutCooking" to={`${RouteName.recipes}?tags=Sans cuisson`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Sans cuisson
                  </h3>
                </Link>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Catégories</h2>{" "}
                <Link id="house" to={`${RouteName.recipes}?category=Maison`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Maison
                  </h3>
                </Link>
                <Link id="body" to={`${RouteName.recipes}?category=Corps`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Corps
                  </h3>
                </Link>
                <Link id="face" to={`${RouteName.recipes}?category=Visage`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Visage
                  </h3>
                </Link>
                <Link id="hair" to={`${RouteName.recipes}?category=Cheveux`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Cheveux
                  </h3>
                </Link>
                <Link id="wellBeing" to={`${RouteName.recipes}?category=Bien-être`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Bien-être
                  </h3>
                </Link>
                <Link id="health" to={`${RouteName.recipes}?category=Santé`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Santé
                  </h3>
                </Link>
                <Link id="makeUp" to={`${RouteName.recipes}?category=Maquillage`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Maquillage
                  </h3>
                </Link>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Type de produit</h2>
                <Link id="soap" to={`${RouteName.recipes}?search=Savon`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Savon
                  </h3>
                </Link>
                <Link id="shampoo" to={`${RouteName.recipes}?search=Shampooing`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Shampooing
                  </h3>
                </Link>
                <Link id="balm" to={`${RouteName.recipes}?search=Baume`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Baume
                  </h3>
                </Link>
                <Link id="solid" to={`${RouteName.recipes}?search=Solide`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Solide
                  </h3>
                </Link>
                <Link id="cream" to={`${RouteName.recipes}?search=Crème`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Crème
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link id="workshops" to={RouteName.workshops}>
            <NavButton type="yellow" onClick={() => setVisible(true)}>
              Ateliers
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col text-lg ml-40 pt-4">
              <Link id="allWorkshops" to={RouteName.workshops}>
                <h3 className="mb-2 cursor-pointer hover:text-yellow">
                  Tous les ateliers
                </h3>
              </Link>
              <Link id="ftfWorkshops" to={RouteName.workshops + "?scroolTo=physiqueWorkshop"}>
                <h3 className="mb-2 cursor-pointer hover:text-yellow">
                  Ateliers en présentiel
                </h3>
              </Link>
              <Link id="onlineWorkshops" to={RouteName.workshops + "?scroolTo=onlineWorkshop"}>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">
                Ateliers en ligne
              </h3>
              </Link>
              <Link id="suggestWorkshop" to={RouteName.workshops + "?scroolTo=suggestWorkshop"}>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">
                Proposer un atelier
              </h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link id="getStarted" to={RouteName.starterPage}>
            <NavButton type="blue" onClick={() => setVisible(true)}>
              Se lancer
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col w-96 text-lg ml-99 pt-4">
            <Link id="fiveStepGuide" to={RouteName.starterPage}>
              <h3 className="mb-2 cursor-pointer hover:text-blue">
                Le guide en 5 étapes pour se lancer dans le fait-maison avec 3
                recettes faciles pour débuter, les ustensiles et ingrédients
                nécéssaires ainsi que des conseils indispensables.
              </h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link id="project" to={RouteName.why}>
            <NavButton type="grey" onClick={() => setVisible(true)}>
              Le projet
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col text-lg pt-4 ml-100">
              <Link id="whyGreenit" to={RouteName.why}>
                <h3 className="mb-2 cursor-pointer hover:text-grey">
                  Pourquoi Greenit ?
                </h3>
              </Link>
              <Link id="contactUs" to={RouteName.contact}>
                <h3 className="mb-2 cursor-pointer hover:text-grey">
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
                type="grey"
                rounded="lg"
                className="flex justify-end self-center text-xl | mr-2 cursor-pointer"
              >
                Partager une recette
              </Button>
            </Link>
          ) : (
            <Link to={RouteName.register} className="flex">
              <Button
                type="grey"
                rounded="lg"
                className="flex justify-end self-center text-xl | mr-2 cursor-pointer"
              >
                {" "}
                Partager une recette
              </Button>
            </Link>
          )}
          {isLoggedIn ? (
            <Link className="" to={RouteName.profil}>
              <Button
                type="blue"
                rounded="lg"
                className="flex justify-end self-center text-xl | mr-4 cursor-pointer"
              >
                Profil
              </Button>
            </Link>
          ) : (
            <Link className="justify-self-end" to={RouteName.register}>
              <Button
                type="green"
                rounded="lg"
                className="inline justify-end self-center | cursor-pointer mr-2"
              >
                Créer un profil
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
