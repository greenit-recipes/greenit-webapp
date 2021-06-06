import React, { useState } from "react";
import { hamburgerIcon, logo } from "../../icons";
import { Button } from "../";
import useIsMobile from "../../hooks/isMobile";
import { Link } from "react-router-dom";

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
          <Link to="/">
            <img src={logo} className="h-20 w-20" alt="Greenit Logo" />
          </Link>
          <div className="invisible">_____</div>
        </div>
        <div
          className={
            toggle
              ? "navBar_fadeIn flex flex-col ml-5"
              : "navBar_fadeOut flex flex-col ml-5"
          }
        >
          <div className="flex flex-col | cursor-pointer space-y-4 text-xl text-gray-500 mb-5">
            <Link to="/recipes">
              <h1 className="mt-5">Recettes</h1>
            </Link>
            <Link to="#">
              <h1>Nos engagements</h1>
            </Link>
            <Link to="/contact">
              <h1>Contactez-nous</h1>
            </Link>
            <Link to="#">
              <h1>Partagez vos recettes</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-20 w-full | flex | items-center | text-gray-500 text-2xl sticky top-0 bg-white z-10 backdrop-opacity-100">
      <div className="w-56 cursor-pointer">
        <Link to="/">
          <img src={logo} className="h-20 w-20 | ml-10" alt="Greenit Logo" />
        </Link>
      </div>
      <div className="flex | ml-auto mr-auto | self-center cursor-pointer">
        <Link to="/recipes">
          <h1 className="pr-10">Recettes</h1>
        </Link>
        <Link to="#">
          <h1 className="pr-10">Nos engagements</h1>
        </Link>
        <Link to="/contact">
        <h1>Contactez-nous</h1>
        </Link>
      </div>

      <Button
        type="orange"
        rounded="3xl"
        className="w-64 h-12 | flex justify-end self-center | mr-4 cursor-pointer"
      >
        <Link to="#">
          <h1>Partagez vos recettes</h1>
        </Link>
      </Button>
    </div>
  );
};
