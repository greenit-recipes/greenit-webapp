import { RouteName } from "App";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";
import { hamburgerIcon, logo } from "../../icons";
import { useTranslation } from "react-i18next";

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const isMobile = useIsMobile();
  const [toggle, setToggle] = useState(false);
  const [effect, setEffect] = useState(false);
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
          <img
            src={hamburgerIcon}
            className={`h-12 w-12 ${effect && "animate-rotate"}`}
            onClick={() => {
              setEffect((prevState) => !prevState);
            }}
          />
          <Link to="/" className="flex flex-col items-center">
            <img src={logo} className="h-12 w-12" alt="Greenit Logo"></img>
          </Link>
          {isLoggedIn ? (
            <Link className="" to="/profil">
              <Button
                type="blue"
                rounded="lg"
                className="flex justify-end | mr-4 cursor-pointer"
              >
                <h1 className="text-white hover:text-blue text-sm">{t("navbar.profil")}</h1>
              </Button>
            </Link>
          ) : (
            <div className="invisible">_____</div>
          )}
        </div>
        <div
          className={
            toggle
              ? "navBar_fadeIn flex flex-col ml-5"
              : "navBar_fadeOut flex flex-col ml-5"
          }
        >
          <div className="flex flex-col | cursor-pointer space-y-4 text-xl text-gray-500 m-5 w-1/2">
            <Link className="p-2 border-b-2 border-blue" to="/recipes">
              <h1>{t("navbar.recipes")}</h1>
            </Link>
            <Link
              className="p-2 border-b-2 border-blue"
              to={RouteName.workshops}
            >
              <h1>{t("navbar.workshop")}</h1>
            </Link>
            {isLoggedIn ? (
              <Link className="p-2 border-b-2 border-blue" to="/profil">
                <h1>{t("navbar.profil")}</h1>
              </Link>
            ) : (
              <Link className="p-2 border-b-2 border-blue" to="/connexion">
                <h1>{t("navbar.connect")}</h1>
              </Link>
            )}

            {!isLoggedIn && (
              <Link className="p-2 border-b-2 border-blue" to="/register">
                <h1>{t("navbar.createProfil")}</h1>
              </Link>
            )}
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
          <h3 className="text-4xl text-green ml-1 self-center">{t("navbar.greenit")}</h3>
        </Link>
      </div>
      <div className="flex | justify-self-center cursor-pointer">
        <Link to="/recipes">
          <button
            className={
              "mr-4 w-32 cursor-pointer border-b-4 | hover:border-blue" +
              (visible ? "outline-none border-blue" : "")
            }
            onClick={() => setVisible(true)}
          >
            <h1 className="mb-1 text-xl">{t("navbar.recipes")}</h1>
          </button>
        </Link>
        <Link to={RouteName.workshops}>
          <button
            className={
              "w-32 cursor-pointer border-b-4 | hover:border-blue |" +
              (visible ? "outline-none border-blue" : "")
            }
            onClick={() => setVisible(true)}
          >
            <h1 className="mb-1 text-xl">{t("navbar.workshop")}</h1>
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
                className="flex justify-end self-center text-xl | mr-4 cursor-pointer"
              >
                {t("navbar.profil")}
              </Button>
            </Link>
          ) : (
            <Link className="justify-self-end" to="/connexion">
              <Button
                type="orange"
                rounded="lg"
                className="inline justify-end self-center | cursor-pointer mr-2"
              >
                  {t("navbar.connect")}
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
                  {t("navbar.createProfil")}
              </Button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
