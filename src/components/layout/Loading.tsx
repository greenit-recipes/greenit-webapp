import React from "react";
import { logo } from "../../icons";

export const Loading: React.FC<{isForLoadingPage?: boolean}> = ({ isForLoadingPage = true }) => {
  return (
    <>
      {isForLoadingPage ? (
        <div className="flex flex-col items-center h-screen justify-center">
          <img src={logo} alt="greenit logo" className="h-20 w-20 lg:h-48 lg:w-48" />
          <h1 className="text-xl lg:text-3xl mt-4">Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="greenit logo" className="h-14 w-14 lg:h-18 lg:w-18" />
          <h1 className="text-xl lg:text-3xl mt-4">Loading...</h1>
        </div>
      )}
    </>
  );
};
