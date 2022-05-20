import { RouteName } from "App";
import { boxStepsCreme, boxStepsLessive, boxStepsSavon } from "icons";
import { recipesBegginerFullXp } from "pages/GreenitFullXp/FullXpHelper";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BackButton } from "../../../components/misc/BackButton";
import useIsMobile from "../../../hooks/isMobile";

const StartDiyGreenitFullXp = () => {
  const isMobile = useIsMobile();

  const imageHeight = isMobile ? 56 : 72;
  const imageWidth = isMobile ? 40 : 48;

  return (
    <div className="relative h-screen flex flex-col md:flex-row md:justify-around items-center">
      <Helmet>
        <title>Coffret DIY débutants - Réalisez vos produits maison</title>
        <meta
          name="description"
          content="Coffret pour les débutants en fait-maison. Une box spécialement conçue pour les premiers pas en DIY. Réalisez tous vos produits hygiènes, cosmétiques et ménagers. Greenit vous livre des ingrédients et vous réalisez !"
        />
      </Helmet>
      <BackButton idButton="se-lancer-dans-le-fait-maison" styleCSS="mt-14 md:mt-16" />
      {isMobile && (
        <div className="flex flex-row justify-center mt-24 items-center">
          <img
            src={boxStepsCreme}
            alt={recipesBegginerFullXp[2]?.name}
            className={`z-10 flex flex-col object-cover ${`h-72 w-52`}
            rounded-2xl | justify-self-center smooth-image
                    }`}
            loading="lazy"
          ></img>
          <img
            src={boxStepsLessive}
            alt={recipesBegginerFullXp[0]?.name}
            className={`absolute right-0 top-16 flex flex-col object-cover ${`h-72 w-40`}
            rounded-l-2xl | justify-self-center smooth-image
                    }`}
            loading="lazy"
          ></img>
          <img
            src={boxStepsSavon}
            alt={recipesBegginerFullXp[1]?.name}
            className={`absolute left-0 top-32 flex flex-col object-cover ${`h-72 w-40`}
            rounded-r-2xl | justify-self-center smooth-image
                    }`}
            loading="lazy"
          ></img>
        </div>
      )}

      <div className="msm:text-center msm:mt-6 p-6">
        <p className="text-2xl font-semibold">
          Se lancer dans le fait-maison avec {!isMobile && <br />}
          <span className="text-green">3</span> recettes simples
        </p>
        <p className="text-base font-normal mt-6">
          Avec la box <b>Premiers pas</b>, débute en achetant uniquement les{" "}
          {!isMobile && <br />}
          ingrédients dont tu as besoin !
        </p>
        <div className="md:w-3/4 mt-6">
          <Link to={RouteName.greenitFullXp}>
            <button
              onClick={() => {
                localStorage.setItem(
                  "currentMenuGreenitFullXp",
                  menuFullXp[0]?.name
                );
              }}
              className={`btn-single-page justify-center mt-2 p-2 h-10 flex w-full bg-green text-white`}
              id='se-lancer-dans-le-fait-maison-je-commande'
            >
              Je commande
            </button>
          </Link>
          <Link to={RouteName.findOUtMoreBoxGreentilFullXP}>
            <button
              className={`btn-single-page justify-center mb-4 mt-4 p-2 h-10 flex w-full bg-white text-green`}
              id='se-lancer-dans-le-fait-maison-en-savoir-plus'
            >
              En savoir plus
            </button>
          </Link>
        </div>
      </div>
      {/* Todo : Refactor into cards */}
      {!isMobile && (
        <div className="flex flex-row justify-center items-center space-x-8">
          <div>
            <img
              src={boxStepsCreme}
              alt={recipesBegginerFullXp[2]?.name}
              className={`flex flex-col object-cover ${`h-80 w-52`}
            rounded-2xl | justify-self-center smooth-image
                    }`}
              loading="lazy"
            ></img>
          </div>
          <div className="space-y-4">
            <img
              src={boxStepsLessive}
              alt={recipesBegginerFullXp[0]?.name}
              className={`flex flex-col object-cover ${`h-${imageHeight} w-${imageWidth}`}
            rounded-2xl | justify-self-center smooth-image
                    }`}
              loading="lazy"
            ></img>
            <img
              src={boxStepsSavon}
              alt={recipesBegginerFullXp[1]?.name}
              className={`flex flex-col object-cover ${`h-${imageHeight} w-${imageWidth}`}
            rounded-2xl | justify-self-center smooth-image
                    }`}
              loading="lazy"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartDiyGreenitFullXp;
