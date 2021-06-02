import React from "react";
import { Link } from "react-router-dom";

import { Icon } from "../misc";
import photo from "./asdf.jpg";
import useIsMobile from "../../hooks/isMobile";
import { RecipeDifficulty, RecipeFragment } from "../../graphql";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe: RecipeFragment | null | undefined;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
}) => {
  const isMobile = useIsMobile();
  const iconHeight = isMobile ? 18 : 20;
  const iconWidth = isMobile ? 16 : 18;

  return (
    <Link to={`/recipes/${recipe?.urlId}`}>
      <div
        className={`flex flex-col | ${
          enableShadow && "shadow-lg"
        } rounded-3xl | justify-self-center`}
        style={{
          height: "28rem",
          width: "20rem",
          background:
            recipe?.image?.length !== 0
              ? `url('${`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`}')`
              : photo,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/*
            <div className="h-10 w-16 md:w-20 | bg-white | flex | text-center mx-auto rounded-lg">
              <StarOutlined
                className="mx-auto text-2xl"
                style={{ color: "gold" }}
              />
              <h2 className="mx-auto pt-1">4.5</h2>
            </div>
          */}
        <div className="w-auto h-auto | mt-auto | bg-white shadow-lg rounded-3xl ">
          <h1 className="subpixel-antialiased| ml-10 mr-5 | flex py-3 justify-center text-lg md:text-xl">
            {recipe?.name}
          </h1>
          <div className="flex flex-row | justify-between | ml-6 mr-6">
            <Icon
              height={iconHeight}
              width={iconWidth}
              icon={recipe?.category?.name}
            />
            <Icon
              height={iconHeight}
              width={iconWidth}
              icon={
                recipe?.difficulty === RecipeDifficulty.Beginner
                  ? "Facile"
                  : recipe?.difficulty === RecipeDifficulty.Intermediate
                  ? "Intermediaire"
                  : "Expert"
              }
            />
            <Icon
              height={iconHeight}
              width={iconWidth}
              icon={
                recipe
                  ? recipe?.duration < 15
                    ? "15 min"
                    : recipe?.duration < 30
                    ? "30 min"
                    : "1 heure"
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
