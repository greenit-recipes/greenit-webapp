import { RecipeCard } from "components";
import useIsMobile from "hooks/isMobile";
import { recipesBegginerFullXp } from "pages/GreenitFullXp/FullXpHelper";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { IoEarthOutline, IoFlaskOutline } from "react-icons/io5";
import {menuFullXp} from "../MenuFullXp/MenuHelper";

const list = (
  <div className="ml-10 lg:ml-0 lg:mt-14">
    <div className="mt-4">
      <p className="mt-1">📚 3 recettes simples</p>
      <p className="mt-1">👼 Recettes validées par la communauté</p>
      <p className="mt-1">🙌 Conçue pour les débutants</p>
      <p className="mt-1">🤩 Pas d’ingrédient en trop à stocker !</p>
      <p className="mt-1">😇 Accompagnement avec des vidéos !</p>
    </div>
  </div>
);


const RecipeFullXP = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around">
      <div className="flex flex-col">
        <div className="flex justify-between ml-10 lg:ml-0">
          <h1 className="text-2xl font-medium">Coup d’oeil sur les recettes </h1>
          {!isMobile && (
            <div className="flex justify-center items-center">
              <BiTimeFive className=" mr-2 w-10 h-10"></BiTimeFive>
              <p className="text-center">
                15 minutes par recette
              </p>
            </div>
          )}
        </div>
        {isMobile && list}
        <div className="flex flex-wrap justify-center mt-6">
          {recipesBegginerFullXp.map((recipe, index) => (
            <RecipeCard
              disabledFavoriteRecipe={true}
              isLikeDisabled={true}
              recipe={recipe}
              key={recipe?.name}
            />
          ))}
          {isMobile && (
            <div className="w-40 flex flex-col justify-center items-center">
              <BiTimeFive className="w-16 h-16"></BiTimeFive>
              <p className="text-center">
                15 minutes <br /> par recette
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center flex-col w-full lg:w-2/5">
        {!isMobile && list}

        <p className="text-xl fontQSemibold text-center lg:text-left mt-6">
          Ton impact avec ces produits maison
        </p>
        <div className="flex mt-4">
          <CircleGreenit
            colorCircle="bg-orange"
            sizeCircle="w-20 h-20"
            icon={
              <IoFlaskOutline
                className={
                  isMobile
                    ? "absolute w-8 h-8 icon-position-circle-mobile rotate-singlePage-chimie"
                    : `absolute w-10 h-10 icon-position-circle rotate-singlePage-chimie`
                }
              />
            }
            symbol=""
            number={10}
            text="Total des substances épargnées"
          />
          <CircleGreenit
            colorCircle="bg-yellow"
            sizeCircle="w-20 h-20"
            icon={
              <BsWallet2
                className={
                  isMobile
                    ? "absolute w-8 h-8 icon-position-circle-mobile rotate-singlePage-wallet"
                    : `absolute h-7 w-7 icon-position-circle rotate-singlePage-wallet`
                }
              />
            }
            customClassName="ml-4"
            symbol="€"
            number={12}
            text="Total argent économisé"
          />
          <CircleGreenit
            colorCircle="bg-green"
            sizeCircle="w-20 h-20"
            icon={
              <IoEarthOutline
                className={
                  isMobile
                    ? "absolute w-8 h-8 icon-position-circle-mobile"
                    : "absolute w-8 h-8 icon-position-circle"
                }
              />
            }
            customClassName="ml-4"
            symbol="g"
            number={214}
            text="Total de plastiques évités"
          />
        </div>
        <p className="text-center m-8">
          Le fait-maison c’est moins de substances toxiques et de plastiques
          pour le plus grand bonheur de notre portefeuille !
        </p>
      </div>
    </div>
  );
};

export default RecipeFullXP;
