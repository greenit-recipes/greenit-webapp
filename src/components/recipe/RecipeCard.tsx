import React from "react";
import { StarOutlined } from "@ant-design/icons";
import { Icon } from "../misc";
import photo from "./asdf.jpg";
import useIsMobile from "../../hooks/isMobile";

interface RecipeCardProps {
  enableShadow?: boolean;
}
export const RecipeCard: React.FC<RecipeCardProps> = ({
  enableShadow = true,
}) => {
  const isMobile = useIsMobile();
  const iconHeight = isMobile ? 18 : 22;
  const iconWidth = isMobile ? 14 : 20;
  return (
    <div
      className={`flex flex-col | ${
        enableShadow && "shadow-lg"
      } rounded-3xl | mt-24 md:mt-0 justify-self-center`}
      style={{
        height: "28rem",
        maxWidth: `${isMobile ? 16 : 20}rem`,
        background: `url('${photo}')`,
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="h-10 w-16 md:w-20 | bg-white | flex | text-center mx-auto rounded-lg">
        <StarOutlined className="mx-auto text-2xl" style={{ color: "gold" }} />
        <h2 className="mx-auto pt-1">4.5</h2>
      </div>
      <div className="w-auto h-auto | mt-auto | bg-white shadow-lg rounded-3xl ">
        <h1 className="subpixel-antialiased flex py-3 justify-center text-lg md:text-xl">
          {
            [
              "Coconut Body Butter",
              "Almond Body Scrub",
              "Homemade Hydroalcoholic gel",
              "Apricot Hair Mask",
              "Bee Wrap",
              "All-surfaces Cleaning",
              "Shea Butter Shampoo",
              "Make Up Remover Balm",
              "After-Shave Olive Cream",
              "Vanilla Candle",
            ][Math.floor(Math.random() * 9)]
          }
        </h1>
        <div className="flex flex-row | justify-between | ml-6 mr-6">
          <Icon type="category" height={iconHeight} width={iconWidth} />
          <Icon type="difficulty" height={iconHeight} width={iconWidth} />
          <Icon type="duration" height={iconHeight} width={iconWidth} />
        </div>
      </div>
    </div>
  );
};
