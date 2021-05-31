import React from "react";
import { logo } from "../../icons";

export const Loading: React.FC = () => {

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <img src={logo} className="h-24 w-24 lg:h-48 lg:w-48"/>
      <h1 className="text-xl lg:text-3xl mt-10">Loading...</h1>
    </div>
  );
};
