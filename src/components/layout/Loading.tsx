import React from 'react';
import { logoBig, logo } from '../../icons';

export const Loading: React.FC<{ isForLoadingPage?: boolean }> = ({
  isForLoadingPage = true,
}) => {
  return (
    <>
      {isForLoadingPage ? (
        <div className="flex flex-col items-center h-screen justify-center">
          <img
            alt="logo"
            src={logoBig}
            className="h-14 w-14 lg:h-32 lg:w-32"
            loading="lazy"
          />
          <h2 className="text-xl lg:text-3xl mt-4">Chargement...</h2>
        </div>
      ) : (
        <div className="flex justify-center">
          <img
            alt="logo"
            src={logo}
            className="h-10 w-10 lg:h-14 lg:w-14"
            loading="lazy"
          />
          <h2 className="text-xl lg:text-3xl mt-4">Chargement...</h2>
        </div>
      )}
    </>
  );
};
