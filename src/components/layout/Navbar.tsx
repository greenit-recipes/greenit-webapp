import React from "react";
import { logo } from "../../icons";
import { Button } from "../";

export const Navbar: React.FC = () => {
  return (
    <div className="h-20 w-full | flex | align-items-center | text-gray-500 text-2xl sticky top-0 bg-white z-10 backdrop-opacity-100">
      <div className="w-56 cursor-pointer">
        <img src={logo} className="h-20 w-20 | ml-10" alt="Greenit Logo" />
      </div>
      <div className="flex | ml-auto mr-auto | self-center cursor-pointer">
        <h1 className="pr-10">Recipes</h1>
        <h1 className="pr-10">Why Greenit?</h1>
        <h1>Talk To Us</h1>
      </div>

      <Button
        type="orange"
        rounded="3xl"
        className="w-64 h-12 | flex justify-end self-center | mr-4 cursor-pointer"
      >
        <h1>Submit Your Recipe</h1>
      </Button>
    </div>
  );
};
