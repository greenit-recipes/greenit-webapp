import React, { useState } from "react";

export const CookieBanner: React.FC = () => {
  const [hidden, setHidden] = useState(
    localStorage.getItem("cookies") === "true" || false,
  );

  const acceptCookies = () => {
    localStorage.setItem("cookies", "true");
    setHidden(true);
  };

  return (
    <>
      <div
        className={` ${
          hidden && "hidden"
        } z-50 flex flex-col items-center fixed bg-white w-[95%] h-40 md:h-50
       md:w-[500px] left-3 md:left-6 bottom-7 p-5 text-center rounded-2xl shadow-md`}
      >
        <span className="text-[#192A51] text-sm md:text-lg font-semibold mb-3">
          Bienvenue sur Greenit 🌱
        </span>
        <p className="text-[#192A51] font-normal text-xs md:text-base mx-5">
          Greenit utilise des cookies pour améliorer les recettes, les
          fonctionnalités du site et proposer des vidéos c’est ok pour toi ?
        </p>
        <div className="flex flex-row space-x-5 justify-between mt-2.5">
          <button
            onClick={() => {
              acceptCookies();
            }}
            className="text-xs md:text-sm underline decoration-solid"
          >
            Je n’accepte pas
          </button>
          <button
            onClick={() => {
              acceptCookies();
            }}
            className="text-xs md:text-sm text-center h-9 md:h-10 w-32 md:w-40 bg-white border-2 text-green rounded shadow-md"
          >
            Accepter et fermer
          </button>
        </div>
      </div>
    </>
  );
};
