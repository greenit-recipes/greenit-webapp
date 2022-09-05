import React from "react";
import { Link } from "react-router-dom";

interface ICTACard {
  type: "blue" | "green" | "yellow" | "orange";
  className?: string;
  link: string;
}

export const CTACard: React.FC<ICTACard> = ({
  type,
  className,
  children,
  link,
}) => {
  return (
    <Link
      className="grid justify-center w-full col-span-1"
      to={{
        pathname: `${link}`,
      }}
    >
      <div
        className={`transform shadow-flat h-80 md:h-84 w-48 md:w-52 bg-${
          type ? type : "blue"
        }  hover:scale-105
          ease-linear duration-150
          rounded-xl cursor-pointer ${className}`}
      >
        {children}
      </div>
    </Link>
  );
};
