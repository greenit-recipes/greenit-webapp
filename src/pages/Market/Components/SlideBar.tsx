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
      <div className="flex flex-cols gap-4 w-max md:w-4/5 px-4">
        {[
          {
            title: "Autres",
            filter: "ingredients",
          },
          {
            title: "Tous les ingrédients",
            filter: "ingredients",
          },
          {
            title: "Tous les ingrédients",
            filter: "ingredients",
          },
          {
            title: "Tous les ingrédients",
            filter: "ingredients",
          },
          {
            title: "Tous les ingrédients",
            filter: "ingredients",
          },
        ].map((item, key) => (
          <Link
            to={{
              pathname: `/${item.filter}`,
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
