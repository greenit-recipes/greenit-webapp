import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";
import { hamburgerIcon, logo } from "../../icons";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [toggle, setToggle] = useState(false);

  const isLoggedIn = authService.isLoggedIn();

  if (isMobile) {
    return (
      <div className="sticky top-0 z-20 bg-white w-screen text-gray-500">
        <div
          onClick={() => {
            setToggle((prevState) => !prevState);
          }}
          className="flex flex-row items-center justify-between"
        >
          <img src={hamburgerIcon} className="h-12 w-12" />
          <Link to="/" className="flex flex-col items-center">
            <img src={logo} className="h-14 w-14" alt="Greenit Logo" />
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
              <h1 className="mt-5">Recettes</h1>
            </Link>
            <Link to="/why">
              <h1>Nos engagements</h1>
            </Link>
            <Link to="/contact">
              <h1>Contactez-nous</h1>
            </Link>
            <Link to="/profil">
              <h1>Profil</h1>
            </Link>
            <Link to="/workshops">
              <h1>Ateliers</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-20 w-full | flex | items-center | text-2xl sticky top-0 bg-white z-10 backdrop-opacity-100">
      <div className="w-56 cursor-pointer">
        <Link to="/" className="flex flex-row items-center">
          <img src={logo} className="h-14 w-14 | ml-10" alt="Greenit Logo" />
          <h4 className="text_logo text-4xl ml-1">Greenit</h4>
        </Link>
      </div>
      <div className="flex | ml-auto mr-auto | self-center cursor-pointer">
        <Link to="/recipes">
          <h1 className="pr-10">Recettes</h1>
        </Link>
        <Link to="/why">
          <h1 className="pr-10">Nos engagements</h1>
        </Link>
        <Link to="/contact">
          <h1 className="pr-10">Contactez-nous</h1>
        </Link>
        <Link to="/workshops">
          <h1>Ateliers</h1>
        </Link>
      </div>

      <Button
        type="orange"
        rounded="xl"
        className="py-2 px-4 flex justify-end self-center | mr-4 cursor-pointer"
      >
        {isLoggedIn ? (
          <Link to="/profil">
            <h1>Profil</h1>
          </Link>
        ) : (
          <Link to="/connexion">
            <h1>Se connecter</h1>
          </Link>
        )}
      </Button>

      {!isLoggedIn &&
        <Button
        type="orange"
        rounded="xl"
        className="py-2 px-4 flex justify-end self-center | mr-4 cursor-pointer"
      >
          <Link to="/register">
            <h1>Créer un compte</h1>
          </Link>
      </Button>
      }
    </div>
  );
};
