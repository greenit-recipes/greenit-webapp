import { RouteName } from "App";
import React from "react";
import { Link } from "react-router-dom";

interface SlideBar {
  keyID: string;
  isMarketListPage?: boolean;
}

export const SlideBar: React.FC<SlideBar> = ({ keyID, isMarketListPage }) => {
  return (
    <div
      id={keyID}
      className="grid md:flex sticky top-10 md:top-14 z-30 items-center shadow-flat bg-white h-12 overflow-x-auto w-full md:justify-center"
    >
      <div className="flex flex-cols gap-4 w-max md:w-4/5 px-4">
        {[
          {
            title: "Tous les ingrédients",
            filter: "Tous les ingrédients",
          },
          {
            title: "Huiles végétales",
            filter: "Huiles végétales",
          },
          {
            title: "Poudres et argiles",
            filter: "Poudres et argiles",
          },
          {
            title: "Huiles essentielles",
            filter: "Huiles essentielles",
          },
          {
            title: "Cadeaux et boxes",
            filter: "Cadeaux et boxes",
          },
        ].map((item, key) => (
          <Link
            to={{
              pathname: `${RouteName.listpagemarket}/${item.filter}`,
            }}
            className="cursor-pointer"
          >
            <h4>{item.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};
