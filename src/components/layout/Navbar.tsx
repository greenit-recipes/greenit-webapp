import { RouteName } from "App";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import authService from "services/auth.service";
import { Button } from "../";
import { NavButton } from "../misc/NavButton";
import useIsMobile from "../../hooks/isMobile";
import { logo } from "../../icons";
import "components/layout/Navbar.css";
import { SearchBar } from ".";
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
              <Link className="" to="/profil">
                <Button type="blue" rounded="lg" className="mr-1">
                  <h1 className="text-white text-xs">Profil</h1>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="w-full grid justify-items-end">
              <Link className="" to="/register">
                <button className="rounded-lg p-2 bg-blue mr-1">
                  <h1 className="text-white text-xs">Créer un profil</h1>
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
            <SearchBar  keyId="SearchNavMobile"/>
            <div
              className="p-2 mt-3 border-b-2 border-transparent"
              onClick={() => {
                setVisible(true);
              }}
            >
              <h1 className="text-white focus:text-green">Recettes</h1>
            </div>

            <Link to={RouteName.workshops}>
              <h1 className="text-white p-2">Ateliers</h1>
            </Link>

            <h1 className="text-white p-2">Ingrédients</h1>
            <h1 className="text-white p-2">Se lancer</h1>
            <Link to={RouteName.why}>
              <h1 className="text-white p-2">Le projet</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row h-16 w-full | sticky top-0 bg-white z-50">
      <div className="grid justify-items-center items-center">
        <Link to="/">
          <img
            src={logo}
            className="h-10 w-10 | ml-4 self-center"
            alt="Greenit Logo"
          />
        </Link>
      </div>
      <div className="flex flex-row ml-4 w-2/3 h-full items-center justify-items-start">
        <div className="w-auto" id="navmenu_big">
          <Link to="/recipes">
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

                <Link to="/recipes">
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Toutes les recettes
                  </h3>
                </Link>
                <Link to={isLoggedIn ? "/créer-une-recette" : "/register"}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Partager une recette
                  </h3>
                </Link>
                <Link to={`/recipes?tags=Premiers pas`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Premiers pas
                  </h3>
                </Link>
                <Link to={`/recipes?tags=Ingrédients de la cuisine`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Avec les ingrédients de la cuisine
                  </h3>
                </Link>
                <Link to={`/recipes?tags=Sans cuisson`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Sans cuisson
                  </h3>
                </Link>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Catégories</h2>{" "}
                <Link to={`/recipes?category=Maison`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Maison
                  </h3>
                </Link>
                <Link to={`/recipes?category=Corps`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Corps
                  </h3>
                </Link>
                <Link to={`/recipes?category=Visage`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Visage
                  </h3>
                </Link>
                <Link to={`/recipes?category=Cheveux`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Cheveux
                  </h3>
                </Link>
                <Link to={`/recipes?category=Bien-être`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Bien-être
                  </h3>
                </Link>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2 cursor-default">Type de produit</h2>
                <Link to={`/recipes?search=Savon`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Savon
                  </h3>
                </Link>
                <Link to={`/recipes?search=Shampoing`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Shampoing
                  </h3>
                </Link>
                <Link to={`/recipes?search=Baume`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Baume
                  </h3>
                </Link>
                <Link to={`/recipes?search=Solide`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Solide
                  </h3>
                </Link>
                <Link to={`/recipes?search=Crème`}>
                  <h3 className="mb-2 cursor-pointer hover:text-green">
                    Crème
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.workshops}>
            <NavButton type="yellow" onClick={() => setVisible(true)}>
              Ateliers
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col text-lg ml-40 pt-4">
              <h3 className="mb-2 cursor-pointer hover:text-yellow">
                Tous les ateliers
              </h3>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">
                Ateliers en présentiel
              </h3>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">
                Ateliers en ligne
              </h3>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">
                Proposer un atelier
              </h3>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <NavButton type="orange" onClick={() => setVisible(true)}>
            Ingrédients
          </NavButton>
          <div id="navlist" className="grid justify-items-start">
            <div className="flex flex-col text-lg ml-72 pt-4">
              <h3 className="mb-2 cursor-default">Cette page arrive bientôt</h3>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <NavButton type="blue" onClick={() => setVisible(true)}>
            Se lancer
          </NavButton>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col w-96 text-lg ml-99 pt-4">
              <h3 className="mb-2 cursor-pointer hover:text-blue">
                Le guide en 5 étapes pour se lancer dans le fait-maison avec 3
                recettes faciles pour débuter, les ustensiles et ingredients
                nécéssaires ainsi que des conseils indispensables.
              </h3>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.why}>
            <NavButton type="grey" onClick={() => setVisible(true)}>
              Le projet
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start pt-2">
            <div className="flex flex-col text-lg pt-4 ml-100">
              <Link to="/why">
                <h3 className="mb-2 cursor-pointer hover:text-grey">
                  Pourquoi Greenit ?
                </h3>
              </Link>
              <Link to="/contact">
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
            <Link to="/créer-une-recette" className="flex">
              <Button
                type="grey"
                rounded="lg"
                className="flex justify-end self-center text-xl | mr-2 cursor-pointer"
              >
                Partager une recette
              </Button>
            </Link>
          ) : (
            <Link to="/register" className="flex">
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
            <Link className="" to="/profil">
              <Button
                type="blue"
                rounded="lg"
                className="flex justify-end self-center text-xl | mr-4 cursor-pointer"
              >
                Profil
              </Button>
            </Link>
          ) : (
            <Link className="justify-self-end" to="/register">
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
