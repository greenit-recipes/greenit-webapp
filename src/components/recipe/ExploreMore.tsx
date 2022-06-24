import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../../App";

interface ExploreMoreProps {
  filter: string;
}

export const ExploreMore: React.FC<ExploreMoreProps> = ({ filter }) => {
  return (
    <Link
      to={`${RouteName.recipes}?${filter}`}
      className="ml-1 mr-5 h-80 w-52 bg-white rounded-2xl self-center relative |
    transform sm:hover:scale-105 ease-linear relative transition-all duration-150"
    >
      <div>
        <i className="absolute top-[40%] left-[40%] text-5xl bx bx-right-arrow-alt"></i>
        <p className="absolute top-[52%] left-[30%] text-lg font-semibold">
          Explorer plus
        </p>
      </div>
    </Link>
  );
};
