import { RouteName } from "App";
import { Button } from "components";
import { nathalier, visage } from "icons";
import React from "react";
import { Link } from "react-router-dom";

interface ReviewCard {
  PersonName: string;
  Review: string;
  Rating: string;
}

export const ReviewCard: React.FC<ReviewCard> = ({
  PersonName,
  Review,
  Rating,
}) => {
  return (
    <div className="relative w-44 h-32 lg:h-36 bg-white rounded-md shadow-flat p-2">
      <div className="absolute bottom-0 right-0">
        <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
          <span className="font-normal">{Rating}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mb-1">
        <img
          className="rounded-full h-6 w-6"
          src={nathalier}
          alt="img-ingredient"
          loading="lazy"
        />
        <h4>{PersonName}</h4>
      </div>

      <p className="text-sm leading-4 text-center lg:text-start">{Review}</p>
    </div>
  );
};
