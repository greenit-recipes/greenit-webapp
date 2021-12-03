import React, { Children } from "react";
import { Link } from "react-router-dom";

interface CTACard {
  type: "blue" | "green" | "yellow" | "orange";
  className?: string;
  link: "/register" | "/workshops" | "/profil";
}

export const CTACard: React.FC<CTACard> = ({
  type,
  className,
  children,
  link,
}) => {
  return (
    <div>
      <Link
        className="relative lg:-bottom-2"
        to={{
          pathname: `${link}`,
        }}
      >
        <div
          className={`transform  shadow-lg m-2 h-72 sm:h-72 lg:h-98 w-44 lg:w-60 bg-${
            type ? type : "blue"
          }  hover:scale-105
          ease-linear transition-all duration-150 
          rounded-3xl cursor-pointer hover:shadow-xl ${className}`}
        >
          <div className="grid justify-items-center">{children}</div>
        </div>
      </Link>
    </div>
  );
};
