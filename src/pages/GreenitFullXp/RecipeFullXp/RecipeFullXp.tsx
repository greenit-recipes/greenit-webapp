import { RecipeCard } from "components";
import useIsMobile from "hooks/isMobile";
import { recipesBegginerFullXp } from "pages/GreenitFullXp/FullXpHelper";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import React, { useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import Auth from "../../../services/auth.service";

const list = (
  <div className="ml-10 lg:ml-0 lg:mt-14">
    <div className="mt-4">
      <p className="mt-3">📚 3 recettes simples</p>
      <p className="mt-3">👼 Recettes validées par la communauté</p>
      <p className="mt-3">🙌 Conçue pour les débutants</p>
      <p className="mt-3">🤩 Pas d’ingrédient en trop à stocker !</p>
      <p className="mt-3">😇 Accompagnement avec des vidéos !</p>
    </div>
  </div>
);

const RecipeFullXP = () => {
  const isMobile = useIsMobile();
  const isLoggedIn = Auth.isLoggedIn();

  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around">
      <div className="flex flex-col">
        <div className="flex justify-between ml-10 lg:ml-0">
          <h2 className="">Coup d’oeil sur les recettes </h2>
          {!isMobile && (
            <div className="flex justify-center items-center">
              <BiTimeFive className=" mr-2 w-10 h-10"></BiTimeFive>
              <p className="text-center font-normal">15 minutes par recette</p>
            </div>
          )}
        </div>
        {isMobile && list}
        <div className="flex flex-wrap justify-center mt-6">
          {recipesBegginerFullXp.map((recipe, index) => (
            <div key={recipe?.id} className="lg:mr-2">
              <RecipeCard
                id="fullXP-commande-box"
                disabledFavoriteRecipe={!isLoggedIn}
                isLikeDisabled={true}
                recipe={recipe}
                key={recipe?.name}
                amount={recipe?.quantity}
              />
            </div>
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

        <h2 className="text-center lg:text-left mt-6">
          Ton impact avec ces produits maison
        </h2>
        <div className={`flex justify-around mt-8 mx-5 md:w-4/5 md:space-x-20`}>
          <CircleGreenit
            colorCircle="bg-blue"
            sizeCircle="w-20 h-20"
            textWidth="w-24"
            icon={
              <i className="bx bxs-vial -rotate-12 absolute w-8 h-8 icon-position-circle bx-md"></i>
            }
            symbol=""
            number={11}
            text="Total des substances épargnées"
          />
          <CircleGreenit
            colorCircle="bg-yellow"
            sizeCircle="w-20 h-20"
            textWidth="w-24"
            icon={
              <i className="bx bx-euro absolute w-8 h-8 icon-position-circle bx-md"></i>
            }
            customClassName="ml-4"
            symbol="€"
            number={8}
            text="Total argent économisé"
          />
          <CircleGreenit
            colorCircle="bg-green"
            sizeCircle="w-20 h-20"
            textWidth="w-24"
            icon={
              <i className="bx bx-leaf absolute w-8 h-8 icon-position-circle bx-md"></i>
            }
            customClassName="ml-4"
            symbol="g"
            number={158}
            text="Total de plastiques évités"
          />
        </div>
        <p className="text-center mt-8 mx-8 md:mx-1 md:w-4/5">
          Le fait-maison c’est moins de substances toxiques et de plastiques
          pour le plus grand bonheur de notre portefeuille !
        </p>
      </div>
    </div>
  );
};

export default RecipeFullXP;
