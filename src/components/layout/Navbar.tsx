import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";
import { hamburgerIcon, logo } from "../../icons";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [toggle, setToggle] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const isLoggedIn = authService.isLoggedIn();

  if (isMobile) {
    return (
      <div className="sticky top-0 z-50 bg-white w-screen">
        <div
          onClick={() => {
            setToggle((prevState) => !prevState);
          }}
          className="flex flex-row items-center justify-between"
        >
          <img src={hamburgerIcon} className="h-12 w-12" />
          <Link to="/" className="flex flex-col items-center">
            <img src={logo} className="h-12 w-12" alt="Greenit Logo" />
          </Link>
          <div className="invisible">_____</div>
        </div>
        <div
          className={
            toggle
              ? "navBar_fadeIn flex flex-col ml-5"
              : "navBar_fadeOut flex flex-col ml-5"
          }
        >
          <div className="flex flex-col | cursor-pointer space-y-4 text-xl text-gray-500 mb-5">
            <Link to="/recipes">
              <h1>Recettes</h1>
            </Link>
            <Link to="/workshops">
              <h1>Ateliers</h1>
            </Link>
            <Link to="/profil">
              <h1>Profil</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-rows-1 grid-cols-3 h-16 w-full | flex | items-center | text-2xl sticky top-0 bg-white z-50 backdrop-opacity-100">
      <div className="w-56 cursor-pointer">
        <Link to="/" className="flex flex-row items-center">
          <img
            src={logo}
            className="h-12 w-12 | ml-4 self-center"
            alt="Greenit Logo"
          />
          <h3 className="text-4xl text-green ml-1 self-center">Greenit</h3>
        </Link>
      </div>
      <div className="flex | justify-self-center cursor-pointer">
        <Link to="/recipes">
          <button
            className={
              "mr-4 w-32 cursor-pointer border-b-4 | hover:border-blue" +
              (!visible ? "outline-none border-blue" : "")
            }
            onClick={() => setVisible(false)}
          >
            <h1 className="mb-1">Recettes</h1>
          </button>
        </Link>
        <Link to="/workshops">
          <button
            className={
              "w-32 cursor-pointer border-b-4 | hover:border-blue |" +
              (visible ? "outline-none border-blue" : "")
            }
            onClick={() => setVisible(true)}
          >
            <h1 className="mb-1">Ateliers</h1>
          </button>
        </Link>
      </div>
      <div className="grid w-full">
        <div className="flex justify-self-end">
          {isLoggedIn ? (
            <Link className="" to="/profil">
              <Button
                type="blue"
                rounded="lg"
                className="flex justify-end self-center | mr-4 cursor-pointer"
              >
                <h1 className="text-white hover:text-blue text-xl">Profil</h1>
              </Button>
            </Link>
          ) : (
            <Link className="justify-self-end" to="/connexion">
              <Button
                type="orange"
                rounded="lg"
                className="inline justify-end self-center | cursor-pointer mr-2"
              >
                <h1 className="text-white hover:text-orange text-xl">
                  Se connecter
                </h1>
              </Button>
            </Link>
          )}

          <Link className="justify-self-end" to="/register">
            {!isLoggedIn && (
              <Button
                type="orange"
                rounded="lg"
                className="inline justify-end self-center | cursor-pointer mr-3"
              >
                <h1 className="text-white hover:text-orange text-xl">
                  Créer son profil
                </h1>
              </Button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
