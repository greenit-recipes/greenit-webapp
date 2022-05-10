import { RouteName } from "App";
import { retourIcon } from "icons";
import HeadBand from "pages/GreenitFullXp/headband";
import MenuFullXp from "pages/GreenitFullXp/MenuFullXp/MenuFullXp";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React, { Suspense, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { findIndex } from "lodash";
import { Loading } from "components";
import { previousPath } from "helpers/route-helper";

const RecipeFullXp = React.lazy(() => import("./RecipeFullXp/RecipeFullXp"));
const IngredientUsentilFullXp = React.lazy(
  () =>
    import(
      "pages/GreenitFullXp/IngredientUstensilFullXp/IngredientUsentilFullXp"
    )
);

const DeliveryGreenitFullXp = React.lazy(
  () => import("pages/GreenitFullXp/Delivery/Delivery")
);

const GenericFullXp = () => {
  console.log(localStorage.getItem("currentMenuGreenitFullXp"));
  const [menu, setMenu] = useState(
    localStorage.getItem("currentMenuGreenitFullXp") || menuFullXp[0].name
  );
  const [isloginOpen, setIsloginOpen] = useState(false);

  const setMenuWithCoockie = (menu: string) => {
    setMenu(menu);
    localStorage.setItem("currentMenuGreenitFullXp", menu);
  };

  const history = useHistory();

  return (
    <div className="mb-24">
      <Helmet>
        <title></title>
        <meta name="" content="" />
      </Helmet>
      <div
        className="absolute left-0 z-20 grid w-8 h-8 ml-3 rounded-full cursor-pointer top-18 lg:w-14 lg:h-14 lg:p-2 lg:top-24 lg:ml-8 lg:bg-white lg:shadow-md"
        onClick={() => {
          const currentIndexNavigation = findIndex(menuFullXp, { name: menu });
          if (menuFullXp[0].name === menu) previousPath()
          setMenuWithCoockie(menuFullXp[currentIndexNavigation - 1]?.name);
        }}
      >
        <img alt="Retour icon" loading="lazy" src={retourIcon} />
      </div>
      <MenuFullXp setNavigation={setMenuWithCoockie} />
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
                <DeliveryGreenitFullXp setNavigation={setMenuWithCoockie} />
              </Suspense>
            );
          case menuFullXp[3].name:
            return <p>Paiement</p>;
          default:
            return <p>Recettes</p>;
        }
      })()}
      <HeadBand
        setNavigation={setMenuWithCoockie}
        currentPositionMenu={findIndex(menuFullXp, { name: menu })}
      />
    </div>
  );
};

export default GenericFullXp;
