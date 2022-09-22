import React from "react";
import { Link } from "react-router-dom";

interface SlideBar {
  keyID: string;
}

export const SlideBar: React.FC<SlideBar> = ({ keyID }) => {
  return (
    <div id={keyID} className="shadow-flat h-12 overflow-x-auto w-full">
      <div className="flex flex-cols gap-2 w-max">
        {[
          {
            title: "Tous les ingrédients",
            link: "/market",
          },
          {
            title: "Tous les ingrédients",
            link: "/market",
          },
          {
            title: "Tous les ingrédients",
            link: "/market",
          },
          {
            title: "Tous les ingrédients",
            link: "/market",
          },
          {
            title: "Tous les ingrédients",
            link: "/market",
          },
        ].map((item, index) => (
          <Link to={item.link}>{item.title}</Link>
        ))}
      </div>
    </div>
  );
};
