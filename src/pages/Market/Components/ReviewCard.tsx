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
    <div className="w-48 h-32 bg-white rounded-md shadow-flat p-2">
      <div className="flex flex-row items-center gap-2 mb-1">
        <img
          className="rounded-full h-8 w-8"
          src={nathalier}
          alt="img-ingredient"
          loading="lazy"
        />
        <h4>{PersonName}</h4>
      </div>
      <p className="text-sm leading-4">{Review}</p>
      <div className="relative">
        <div className="absolute top-1 -right-2">
          <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
            <span className="font-normal">{Rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
