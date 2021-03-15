import React from "react";
import { logo } from "../../icons";
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
      <div
        className="w-64 h-12 | flex justify-end | self-center rounded-3xl mr-4"
        style={{
          backgroundColor: "#fec4b0",
        }}
      >
        {/* TODO fix mr-6 to responsive */}
        <h1 className="mr-6 self-center text-white">Submit Your Recipe</h1>
      </div>
    </div>
  );
};
