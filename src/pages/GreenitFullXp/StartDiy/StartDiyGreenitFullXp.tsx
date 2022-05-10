import { RouteName } from "App";
import { previousPath } from "helpers/route-helper";
import { retourIcon } from "icons";
import React from "react";
import { Link } from "react-router-dom";

const StartDiyGreenitFullXp = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="absolute left-0 z-20 grid w-8 h-8 ml-3 rounded-full cursor-pointer top-18 lg:w-14 lg:h-14 lg:p-2 lg:top-24 lg:ml-8 lg:bg-white lg:shadow-md"
        onClick={() => {
          previousPath();
        }}
      >
        <img alt="Retour icon" loading="lazy" src={retourIcon} />
      </div>
      <img
        className="w-96 h-96 rounded-full mt-20"
        alt="lessive"
        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
        loading="lazy"
      />
      <div className="mt-10 text-center p-6">
        <p className="text-xl">
          Se lancer dans le fait-maison avec{" "}
          <span className="text-green">3</span> recettes simples
        </p>
        <p className="mt-6">
          Avec la box <b>Premiers pas</b>, débute en achetant uniquement les
          ingrédients dont tu as besoin !
        </p>
        <div className="mt-6">
          <Link to={RouteName.greenitFullXp}>
            <button
              className={`btn-single-page justify-center mt-2 p-2 h-10 flex w-full bg-green text-white`}
            >
              Je commande ma box Premiers Pas
            </button>
          </Link>
          <button
            className={`btn-single-page justify-center mb-4 p-2 h-10 flex w-full bg-white text-green`}
            onClick={() => {}}
          >
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartDiyGreenitFullXp;
