import React, { useState } from "react";
import { hamburgerIcon, logo } from "../../icons";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [toggle, setToggle] = useState(false);
  if (isMobile) {
    return (
      <div className="sticky top-0 z-20 bg-white w-screen">
        <div
          onClick={() => {
            setToggle((prevState) => !prevState);
          }}
          className="flex flex-row items-center justify-between"
        >
          <img src={hamburgerIcon} className="h-12 w-12" />
          <img src={logo} className="h-20 w-20" alt="Greenit Logo" />
          <div className="invisible">Toggle</div>
        </div>
        <div
          className={
            toggle
              ? "navBar_fadeIn flex flex-col ml-5"
              : "navBar_fadeOut flex flex-col ml-5"
          }
        >
          <div className="flex flex-col | cursor-pointer space-y-4 text-xl text-gray-500 mb-5">
            <h1 className="mt-5">Recipes</h1>
            <h1>Why Greenit?</h1>
            <h1>Talk To Us</h1>
            <h1>Submit a Recipe</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-20 w-full | flex | items-center | text-gray-500 text-2xl sticky top-0 bg-white z-10 backdrop-opacity-100">
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
