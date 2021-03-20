import React from "react";
import { logo } from "../../icons";
import { Button } from "../";

export const Navbar: React.FC = () => {
  return (
    <div className="h-20  w-screen | flex | align-items-center | text-gray-500 text-2xl">
      <div className="w-56">
        <img src={logo} className="h-20 w-20 | ml-10" alt="Greenit Logo" />
      </div>
      <div className="flex | ml-auto mr-auto | self-center">
        <h1 className="pr-10">Why Greenit?</h1>
        <h1>Talk To Us</h1>
      </div>

      <Button
        type="orange"
        rounded="3xl"
        className="w-64 h-12 | flex justify-end self-center | mr-4"
      >
        <h1>Submit Your Recipe</h1>
      </Button>
    </div>
  );
};
