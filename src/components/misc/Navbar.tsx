import React from "react";

export const Navbar: React.FC = () => {
  return (
    <div className="h-12 w-full | flex | align-items-center">
      <div className="flex justify-end | ml-auto mr-10 | self-center | text-xl text-gray-500">
        <h1 className="pr-10">Feedback</h1>
        <h1>About Us</h1>
      </div>
    </div>
  );
};
