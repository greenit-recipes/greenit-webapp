import { Loading } from "components";
import { previousPath } from "helpers/route-helper";
import { retourIcon } from "icons";
import { findIndex } from "lodash";
//Todo : Integrate the component with UI later
import CheckoutFullXp from "pages/GreenitFullXp/CheckoutFullXp/CheckoutFullXp";
import HeadBand from "pages/GreenitFullXp/headband";
import MenuFullXp from "pages/GreenitFullXp/MenuFullXp/MenuFullXp";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React, { Suspense, useState } from "react";
import { Helmet } from "react-helmet";
import useIsMobile from "../../hooks/isMobile";


const RecipeFullXp = React.lazy(() => import("./RecipeFullXp/RecipeFullXp"));
const IngredientUsentilFullXp = React.lazy(
  () =>
    import(
      "pages/GreenitFullXp/IngredientUstensilFullXp/IngredientUsentilFullXp"
    )
);

const ConfirmationFullXp = React.lazy(
  () => import("pages/GreenitFullXp/ConfirmationFullXp/ConfirmationFullXp")
);

const GenericFullXp = () => {
  const currentMenuStorage = localStorage.getItem("currentMenuGreenitFullXp");
  const menuStorage =
    currentMenuStorage !== "undefined"
      ? currentMenuStorage
      : null;
  const [menu, setMenu] = useState(menuStorage || menuFullXp[0].name);

  const setMenuWithCoockie = (menu: string) => {
    setMenu(menu);
    localStorage.setItem("currentMenuGreenitFullXp", menu);
  };

  const isMobile = useIsMobile();

  return (
    <div className="mb-24">
      <Helmet>
        <title>Coffret DIY débutants - Réalisez vos produits maison</title>
        <meta
          name="description"
          content="Coffret pour les débutants en fait-maison. Une box spécialement conçue pour les premiers pas en DIY. Réalisez tous vos produits hygiènes, cosmétiques et ménagers. Greenit vous livre des ingrédients et vous réalisez !"
        />
      </Helmet>
      <div className="flex flex-row items-center mt-6 relative">
        {menu !== menuFullXp[3].name && (
          <div
            className="absolute z-20 grid w-8 h-8 rounded-full cursor-pointer md:w-10 md:h-10 lg:p-2 md:ml-16 md:bg-white lg:shadow-md"
            onClick={() => {
              const currentIndexNavigation = findIndex(menuFullXp, {
                name: menu,
              });
              if (menuFullXp[0].name === menu || !!!currentIndexNavigation)
                previousPath();
              setMenuWithCoockie(menuFullXp[currentIndexNavigation - 1]?.name);
            }}
          >
            <img alt="Retour icon" loading="lazy" src={retourIcon} />
          </div>
        )}

        {!isMobile && (
          <div className="flex grow justify-center mt-10 w-full">
            <MenuFullXp setNavigation={setMenuWithCoockie} />
          </div>
        )}
      </div>
      {(() => {
        switch (menu) {
          case menuFullXp[0].name:
            return (
              <Suspense fallback={<Loading />}>
                <RecipeFullXp />
              </Suspense>
            );
          case menuFullXp[1].name:
            return (
              <Suspense fallback={<Loading />}>
                <IngredientUsentilFullXp />
              </Suspense>
            );
          case menuFullXp[2].name:
            return (
              <Suspense fallback={<Loading />}>
                <CheckoutFullXp />
              </Suspense>
            );
          case menuFullXp[3].name:
            return (
              <Suspense fallback={<Loading />}>
                <ConfirmationFullXp />
              </Suspense>
            );
          default:
            return (
              <Suspense fallback={<Loading />}>
                <RecipeFullXp />
              </Suspense>
            );
        }
      })()}
      {menu !== menuFullXp[3].name && (
        <div className="fixed bottom-0 h-10 mb-16 sm:mb-0">
          <HeadBand
            setNavigation={setMenuWithCoockie}
            currentPositionMenu={findIndex(menuFullXp, { name: menu })}
          />
        </div>
      )}
    </div>
  );
};

export default GenericFullXp;
