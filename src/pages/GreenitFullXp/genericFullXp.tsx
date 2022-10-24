import { Footer, Loading, Navbar } from "components";
import { previousPath } from "helpers/route-helper";
import { findIndex } from "lodash";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useIsMobile from "../../hooks/isMobile";
import { useHistory } from "react-router-dom";
import { getMenuStep } from "../../helpers/beginnerbox.helper";
import BoxSinglePage from "./BoxSinglePage/BoxSinglePage";
import MenuFullXp from "./MenuFullXp/MenuFullXp";

const ConfirmationFullXp = React.lazy(
  () => import("pages/GreenitFullXp/ConfirmationFullXp/ConfirmationFullXp"),
);

const GenericFullXp = () => {
  //Initialize default state of the menu
  const confirmationMenu = menuFullXp[2].name;
  const startMenu =
    getMenuStep() === confirmationMenu ? confirmationMenu : menuFullXp[0].name;

  //Delete previous cookie from payment on confirmation
  if (startMenu === confirmationMenu) {
    localStorage.removeItem("currentMenuGreenitFullXp");
  }

  const currentMenuStorage = localStorage.getItem("currentMenuGreenitFullXp");
  if (!currentMenuStorage || currentMenuStorage === "undefined") {
    localStorage.setItem("currentMenuGreenitFullXp", startMenu);
  }
  const menuStorage =
    currentMenuStorage !== "undefined" ? currentMenuStorage : null;

  const [menu, setMenu] = useState(menuStorage || startMenu);

  const setMenuWithCoockie = (menu: string) => {
    setMenu(menu);
    // menu !== "undefined" || localStorage.setItem("currentMenuGreenitFullXp", menu);
    localStorage.setItem("currentMenuGreenitFullXp", menu);
  };

  const isMobile = useIsMobile();
  const history = useHistory();
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="mb-24">
      <Helmet>
        <title>Coffret DIY débutants - Réalisez vos produits maison</title>
        <meta
          name="description"
          content="Coffret pour les débutants en fait-maison. Une box spécialement conçue pour les premiers pas en DIY. Réalisez tous vos produits hygiènes, cosmétiques et ménagers. Greenit vous livre des ingrédients et vous réalisez !"
        />
      </Helmet>
      <Navbar />
      <div className="flex flex-row relative">
        <div
          className="absolute z-20 cursor-pointer ml-2 md:ml-14"
          id={`${menu}-fleche-retour`}
          onClick={() => {
            if (menu !== menuFullXp[2].name) {
              const currentIndexNavigation = findIndex(menuFullXp, {
                name: menu,
              });
              //Todo : Investigate the behavior of this logical expression
              if (menuFullXp[0].name === menu || !currentIndexNavigation)
                previousPath();
              setMenuWithCoockie(menuFullXp[currentIndexNavigation - 1]?.name);
            } else {
              //Redirect to landing page after confirmation
              history.push("/");
            }
          }}
        >
          <i className="bx bx-left-arrow-alt text-4xl"></i>
        </div>
      </div>
      <div className="flex flex-col justify-items-center items-center">
        <MenuFullXp setNavigation={setMenuWithCoockie} />
      </div>

      {(() => {
        switch (menu) {
          case menuFullXp[0].name:
            return (
              <Suspense fallback={<Loading />}>
                <BoxSinglePage />
              </Suspense>
            );
          case menuFullXp[1].name:
            return <Suspense fallback={<Loading />}></Suspense>;
          case menuFullXp[2].name:
            return (
              <Suspense fallback={<Loading />}>
                <ConfirmationFullXp />
              </Suspense>
            );
          default:
            return <Suspense fallback={<Loading />}></Suspense>;
        }
      })()}
      <Footer />
    </div>
  );
};

export default GenericFullXp;
