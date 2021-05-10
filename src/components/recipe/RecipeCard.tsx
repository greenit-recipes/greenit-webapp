import React from "react";
import { StarOutlined } from "@ant-design/icons";
import { Icon } from "../misc";
import photo from "./asdf.jpg";
import useIsMobile from "../../hooks/isMobile";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  enableShadow?: boolean;
  recipe?: {
    id: string;
    difficulty: string;
    name: string;
    duration: number;
    rating?: number | null | undefined;
    image?: string | null | undefined;
    category?:
      | {
          id: string;
          name: string;
        }
      | null
      | undefined;
  };
}
export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
  recipe,
}) => {
  const isMobile = useIsMobile();
  const iconHeight = isMobile ? 18 : 22;
  const iconWidth = isMobile ? 14 : 20;
  const categoryName = recipe?.category?.name;
  console.log(`https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}`);
  return (
    <Link to={`/recipes/${recipe?.id}`}>
      <div
        className={`flex flex-col | ${
          enableShadow && "shadow-lg"
        } rounded-3xl | mt-24 md:mt-0 justify-self-center`}
        style={{
          height: "28rem",
          maxWidth: `${isMobile ? 16 : 20}rem`,
          background: `url('${
            `https://fra1.digitaloceanspaces.com/greenit/greenit/${recipe?.image}` ||
            photo
          }')`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="h-10 w-16 md:w-20 | bg-white | flex | text-center mx-auto rounded-lg">
          <StarOutlined
            className="mx-auto text-2xl"
            style={{ color: "gold" }}
          />
          <h2 className="mx-auto pt-1">4.5</h2>
        </div>
        <div className="w-auto h-auto | mt-auto | bg-white shadow-lg rounded-3xl ">
          <h1 className="subpixel-antialiased flex py-3 justify-center text-lg md:text-xl">
            {recipe?.name}
          </h1>
          <div className="flex flex-row | justify-between | ml-6 mr-6">
            <Icon
              type="category"
              height={iconHeight}
              width={iconWidth}
              icon={
                categoryName?.includes("Corps")
                  ? "Body"
                  : categoryName?.includes("Maison")
                  ? "Home"
                  : categoryName?.includes("Bien-être")
                  ? "Wellbeing"
                  : categoryName?.includes("Cheveux")
                  ? "Hair"
                  : "Face"
              }
            />
            <Icon
              type="difficulty"
              height={iconHeight}
              width={iconWidth}
              icon={`${recipe?.difficulty.substr(
                0,
                1
              )}${recipe?.difficulty.substr(1).toLowerCase()}`}
            />
            <Icon
              type="duration"
              height={iconHeight}
              width={iconWidth}
              icon={
                recipe
                  ? recipe?.duration < 15
                    ? "15 min"
                    : recipe?.duration < 30
                    ? "30 min"
                    : "1 hour"
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
