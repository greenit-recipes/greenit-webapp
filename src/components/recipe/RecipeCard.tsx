import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../misc";
import useIsMobile from "../../hooks/isMobile";
import { RecipeDifficulty, RecipeFragment } from "../../graphql";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe: RecipeFragment | null | undefined;
  inCarousel?: boolean
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
  inCarousel
}) => {
  const isMobile = useIsMobile();
  const iconHeight = isMobile ? 18 : 20;
  const iconWidth = isMobile ? 16 : 18;

  return (
    <Link to={`/recipes/${recipe?.urlId}`} className={!inCarousel ? "relative z-10": ""}>
      <img
        className={`flex flex-col | ${
          enableShadow && "shadow-lg"
        } rounded-3xl | justify-self-center`}
        style={{
          height: "28rem",
          width: "20rem",
        }}
        src={`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`}
      >
      </img>
      <div className="w-full h-auto | mt-auto | bg-white shadow-lg rounded-3xl absolute bottom-0">
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
    </Link>
  );
};
