import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "App";

interface ExploreMoreProps {
  filter?: string;
  id?: string;
}

export const ExploreMore: React.FC<ExploreMoreProps> = ({ filter, id }) => {
  return (
    <Link
      id={id}
      to={`${RouteName.recipes}${filter && "?" + filter}`}
      className="ml-2 mr-5 h-72 w-48 bg-white rounded-lg self-top |
    transform sm:hover:scale-105 ease-linear relative transition-all duration-150"
    >
      <div id={id} className="grid w-full h-full justify-center content-center">
        <div className="flex flex-col h-20 justify-center">
          <i className="text-5xl bx bx-right-arrow-alt text-center mr-2"></i>
          <p className="text-lg font-medium text-center">Explorer plus</p>
        </div>
      </div>
    </Link>
  );
};
