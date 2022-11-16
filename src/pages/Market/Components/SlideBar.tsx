import { RouteName } from "App";
import React from "react";
import { Link } from "react-router-dom";

interface SlideBar {
  keyID: string;
}

export const SlideBar: React.FC<SlideBar> = ({ keyID }) => {
  return (
    <div
      id={keyID}
      className="grid md:flex sticky top-10 md:top-14 z-30 items-center shadow-flat bg-white h-12 overflow-x-auto w-full md:justify-center"
    >
      <div className="flex flex-cols gap-7 w-max px-4">
        <Link
          to={{
            pathname: `${RouteName.accueil}/Tous-les-ingrédients`,
          }}
          className="cursor-pointer"
        >
          <h4 id={`SlideBar-categorie-all-ingredients`}>
            Tous les ingrédients
          </h4>
        </Link>
        {[
          {
            title: "Huiles végétales et beurres",
            filter: "Huiles-végétales-et-beurres",
          },
          {
            title: "Poudres et argiles",
            filter: "Poudres-et-argiles",
          },
          {
            title: "Huiles essentielles",
            filter: "Huiles-essentielles",
          },
          {
            title: "Hydrolats et eaux florales",
            filter: "Hydrolats-eaux-florales",
          },
          {
            title: "Ingrédients cosmétiques",
            filter: "Ingrédients-cosmétiques",
          },
          {
            title: "Ingrédients d'entretien",
            filter: "Ingrédients-entretien",
          },
        ].map(item => (
          <Link
            to={{
              pathname: `${RouteName.accueil}/${item.filter}`,
            }}
            className="cursor-pointer"
          >
            <h4 id={`SlideBar-categorie-${item.filter}`}>{item.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};
