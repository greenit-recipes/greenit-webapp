import React from "react";
import { StarOutlined } from "@ant-design/icons";
import { Icon } from "../misc";
import photo from "./asdf.jpg";

export const RecipeCard: React.FC = () => {
  return (
    <div
      className="w-5/6 | flex flex-col | shadow-lg rounded-3xl | mt-24 md:mt-0 justify-self-center"
      style={{
        height: "28rem",
        background: `url('${photo}')`,
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="h-10 w-20 | bg-white shadow | flex | text-center mx-auto rounded-lg">
        <StarOutlined className="mx-auto text-2xl" style={{ color: "gold" }} />
        <h2 className="mx-auto pt-1">4.5</h2>
      </div>
      <div className="w-auto h-auto | mt-auto | bg-white shadow-lg rounded-3xl ">
        <h1 className="subpixel-antialiased flex py-3 justify-center text-2xl">
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
        <div className="flex flex-row | justify-between | ml-4 mr-4">
        <Icon type="category" height={22} width={20}/>
        <Icon type="difficulty" height={22} width={20}/>
        <Icon type="duration" height={22} width={20} />
        </div>
      </div>
    </div>
  );
};
