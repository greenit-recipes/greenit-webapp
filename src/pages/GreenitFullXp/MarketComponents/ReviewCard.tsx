import React from "react";

interface ReviewCard {
  personName: string;
  review: string;
  rating: string;
  image: string;
}

export const ReviewCard: React.FC<ReviewCard> = ({
  personName,
  review,
  rating,
  image,
}) => {
  return (
    <div className="relative w-44 h-32 lg:h-36 bg-white rounded-md shadow-flat p-2">
      <div className="absolute bottom-0 right-0">
        <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
          <span className="font-normal">{rating}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mb-1">
        <img
          className="rounded-full h-6 w-6"
          src={image}
          alt="img-ingredient"
          loading="lazy"
        />
        <h4>{personName}</h4>
      </div>

      <p className="text-sm leading-4 text-center lg:text-start">{review}</p>
    </div>
  );
};
