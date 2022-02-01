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
    <div>
      <Link
        className="relative lg:-bottom-2"
        to={{
          pathname: `${link}`,
        }}
      >
        <div
          className={`transform shadow-lg h-72 md:h-84 w-40 md:w-52 bg-${
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
