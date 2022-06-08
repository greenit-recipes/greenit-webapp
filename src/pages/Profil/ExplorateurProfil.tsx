import { useMutation } from "@apollo/client";
import { RouteName } from "App";
import { Button, Loading } from "components";
import { getImagePath } from "helpers/image.helper";
import useIsMobile from "hooks/isMobile";
import { map, orderBy, sum, toNumber } from "lodash";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosRemove } from "react-icons/io";
import { Link } from "react-router-dom";
import { PLUS_OR_LESS_RECIPE } from "services/auth.service";

interface IUser {
  recipeMadeUser: any;
  parentFunction?: any;
  isLoad: boolean;
}

export const ExplorateurProfil: React.FC<IUser> = ({
  recipeMadeUser,
  parentFunction,
  isLoad,
}) => {
  const substancesRecipes = sum(
    map(recipeMadeUser, x => x.recipe.numberOfSubstances),
  );
  const moneySavedRecipes = sum(
    map(
      recipeMadeUser,
      x => toNumber(x.amount) * toNumber(x.recipe.moneySaved),
    ),
  );
  const plasticSavedRecipes = sum(
    map(
      recipeMadeUser,
      x => toNumber(x.amount) * toNumber(x.recipe.plasticSaved),
    ),
  );

  const amountTotal = sum(map(recipeMadeUser, x => toNumber(x.amount)));

  const [plusOrLessRecipe, { loading, error }] = useMutation(
    PLUS_OR_LESS_RECIPE,
    { errorPolicy: "all" },
  );

  const isMobile = useIsMobile();
  const [isArrowDown, setArrowDown] = useState(true);

  const onSubmitHandlerPlusOrLess = (recipeId: number, isLess: boolean) => {
    plusOrLessRecipe({
      variables: {
        recipeId,
        isLess,
      },
    }).then(() => {
      return parentFunction ? parentFunction() : null;
    });
  };

  return (
    <div className="flex flex-col items-center mb-14">
      <div className="w-full lg:w-4/6">
        <div className="text-2xl font-semibold text-center">
          Tes recettes réalisées
        </div>
        <div className="flex items-center justify-center">
          <Button
            id="Share_a_recipe"
            type="darkBlue"
            rounded="lg"
            haveArrow={true}
            isArrowDown={isArrowDown}
            onClick={() => setArrowDown(true)}
            className="mt-4 inline justify-end self-center | mr-2 cursor-pointer"
          >
            {amountTotal} produits fabriqués
          </Button>
        </div>
        <div className={!isArrowDown ? "fadeIn-arrow" : " fadeOut-arrow"}>
          <div className="msm:mx-8 mt-4 rounded-b">
            <div className="flex justify-between">
              <div className="text-xs fontQSregular">Recettes faites</div>
              <div className="text-xs fontQSregular">
                Nombre de produits fabriqués
              </div>
            </div>
            <div className={``}>
              {orderBy(recipeMadeUser, "recipe.name").map(
                (item: any, index: any) => (
                  <div
                    key={item?.recipe?.id}
                    className={`flex items-center btnProfilPage ingredient-shadow max-h-32 mt-4 ${
                      !isMobile ? "" : ""
                    }`}
                  >
                    <Link to={`${RouteName.recipes}/${item?.recipe?.urlId}`}>
                      <div className="flex items-center justify-between">
                        <img
                          className="object-cover w-16 h-16 rounded lg:h-14 lg:w-14"
                          alt={item?.recipe?.name}
                          loading="lazy"
                          src={getImagePath(item?.recipe?.image)}
                        ></img>
                      </div>
                    </Link>

                    <div className="w-5/6 ml-4 lg:ml-14 text-sm">
                      {" "}
                      {item?.recipe?.name}
                    </div>
                    <div className="w-2/5 lg:w-1/6">
                      <div className="flex items-center justify-end p-4 w-full h-16 lg:h-14 rounded bg-greenL">
                        <IoIosRemove
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            onSubmitHandlerPlusOrLess(item?.recipe?.id, true);
                          }}
                        />
                        <div className="flex items-center justify-center w-10 h-10 ml-2 mr-2 bg-white rounded-full">
                          {item?.amount}
                        </div>
                        <HiOutlinePlus
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            onSubmitHandlerPlusOrLess(item?.recipe?.id, false);
                          }}
                        />

                        {isLoad && <Loading />}
                      </div>
                    </div>
                  </div>
                ),
              )}
              {!recipeMadeUser.length && (
                <div className="text-center mt-4 text-sm">
                  Ajoute les recettes déjà réalisées pour mesurer ton impact !
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <CircleGreenit
          colorCircle="bg-orange"
          icon={
           <i className="bx bxs-vial -rotate-12 absolute w-8 h-8 icon-position-circle bx-md"></i>
          }
          symbol=""
          number={substancesRecipes}
          text="Total des substances épargnées"
        />
        <CircleGreenit
          colorCircle="bg-yellow"
          icon={
            <i className="bx bx-euro absolute w-8 h-8 icon-position-circle bx-md"></i>
          }
          customClassName="ml-16"
          symbol="€"
          number={moneySavedRecipes}
          text="Total argent économisé"
        />
        <CircleGreenit
          colorCircle="bg-green"
          icon={
            <i className="bx bx-leaf absolute w-8 h-8 icon-position-circle bx-md"></i>
          }
          customClassName="ml-16"
          symbol="g"
          number={plasticSavedRecipes}
          text="Total de plastiques évités"
        />
      </div>
    </div>
  );
};
