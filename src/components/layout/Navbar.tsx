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
  const [effect, setEffect] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  const refreshPage = () => {
    if (location.pathname === "/recipes") {
      window.location.reload();
    }
    history.push("/recipes");
  };
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
            <SearchBar />
            <div
              className="p-2 mt-3 border-b-2 border-transparent"
              onClick={() => {
                setVisible(true);
                refreshPage();
              }}
            >
              <h1 className="text-white focus:text-green">Recettes</h1>
            </div>

            <Link className="p-2" to={RouteName.workshops}>
              <h1 className="text-white">Ateliers</h1>
            </Link>

            <Link className="p-2" to={RouteName.workshops}>
              <h1 className="text-white">Ingrédients</h1>
            </Link>
            <Link className="p-2" to={RouteName.workshops}>
              <h1 className="text-white">Se lancer</h1>
            </Link>
            <Link className="p-2" to={RouteName.workshops}>
              <h1 className="text-white">Le projet</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row h-16 w-screen | sticky top-0 bg-white z-50">
      <div className="grid justify-items-center items-center">
        <Link to="/">
          <img
            src={logo}
            className="h-10 w-10 | ml-4 self-center"
            alt="Greenit Logo"
          />
        </Link>
      </div>
      <div className="flex flex-row w-2/5 h-full items-center justify-items-start">
        <div className="w-auto" id="navmenu_big">
          <Link to="/recipes">
            <NavButton
              type="green"
              onClick={() => {
                setVisible(true);
                refreshPage();
              }}
            >
              Recettes
            </NavButton>
          </Link>
          <div id="navlist_big">
            <div className="grid grid-cols-3 w-1/3 justify-items-center ml-20">
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2">Racourcis</h2>
                <h3 className="mb-2 cursor-pointer hover:text-green">Toutes les recettes</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Partager une recette</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Premiers pas</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Avec les ingrédients de la cuisine</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Sans cuisson</h3>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2">Catégories</h2>
                <h3 className="mb-2 cursor-pointer hover:text-green">Maison</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Corps</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Visage</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Cheveux</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Bien-être</h3>
              </div>
              <div className="flex flex-col text-lg pt-4">
                <h2 className="mb-2">Type de produit</h2>
                <h3 className="mb-2 cursor-pointer hover:text-green">Savon</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Shampoings</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Baumes</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Solides</h3>
                <h3 className="mb-2 cursor-pointer hover:text-green">Crèmes</h3>
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
          <div id="navlist" className="grid justify-items-start">
            <div className="flex flex-col text-lg ml-40 pt-4">
              <h3 className="mb-2 cursor-pointer hover:text-yellow">Tous les ateliers</h3>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">Ateliers en présentiel</h3>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">Ateliers en ligne</h3>
              <h3 className="mb-2 cursor-pointer hover:text-yellow">Proposer un atelier</h3>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.workshops}>
            <NavButton type="orange" onClick={() => setVisible(true)}>
              Ingrédients
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-start">
            <div className="flex flex-col w-96 text-lg ml-72 pt-4">
              <h3 className="mb-2">Cette page arrive bientôt</h3>
            </div>
          </div>
        </div>
        <div className="w-auto" id="navmenu">
          <Link to={RouteName.workshops}>
            <NavButton type="blue" onClick={() => setVisible(true)}>
              Se lancer
            </NavButton>
          </Link>
          <div id="navlist" className="grid justify-items-center">
            <div className="flex flex-col w-96 text-lg -ml-96 pt-4">
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
          <div id="navlist" className="grid justify-items-center">
            <div className="flex flex-col text-lg -ml-96 pt-4">
              <h3 className="mb-2 cursor-pointer hover:text-grey">Pourquoi Greenit ?</h3>
              <h3 className="mb-2 cursor-pointer hover:text-grey">Contacte-nous</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="grid items-center w-3/5 justify-self-end">
        <div className="flex justify-self-end">
          <SearchBarNav />
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
