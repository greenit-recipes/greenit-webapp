import { Button } from "components";
import { map, sum } from "lodash";
import React from "react";
import { ModalEditCreatorProfile } from "./ModalEditCreatorProfile";

interface IUser {
  user: {
    biographie: string;
    urlsSocialMedia: string[];
    recipeAuthor: {
      numberOfLikes: string;
      nbrView: string;
    }[];
  };
  parentFunction?: any;
}

export const CreatorProfil: React.FC<IUser> = ({ user, parentFunction }) => {
  const nbrLikes = map(user?.recipeAuthor, "numberOfLikes");
  const nbrView = map(user?.recipeAuthor, "nbrView");

  return (
    <div className="flex flex-col items-center text-darkBlue w-full md:w-11/12 lg:w-full">
      {/* Stat */}
      <div className="flex flex-row text-center justify-center w-11/12 gap-2">
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-white">
          <i
            className={`bx bxs-bowl-hot bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-blueL rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Recettes </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {user?.recipeAuthor.length}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-white">
          <i
            className={`bx bxs-donate-heart bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-greenL rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Soutien</p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrLikes)}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-white">
          <i
            className={`bx bxs-low-vision bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-yellowL rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Vues </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrView)}
            </p>
          </div>
        </div>
      </div>
      {/*Modal Biography and Social media*/}

      <div className="md:flex md:justify-center w-11/12">
        <ModalEditCreatorProfile
          btn={
            <Button
              className="w-full md:w-52 mt-2 mb-4 shadow-md"
              type="darkBlue"
            >
              Modifier mon profil créateur
            </Button>
          }
          user={user}
          parentFunction={parentFunction}
        />
      </div>

      {/* Recommend Stats */}
      {/*<div*/}
      {/*  className="my-6 text-sm font-semibold text-center text-darkBlue underline decoration-solid cursor-pointer lg:my-10 lg:sm"*/}
      {/*  onClick={() => {*/}
      {/*    setDisplayStat(!isDisplayStat);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {" "}*/}
      {/*  {!isDisplayStat ? "+ Plus " : "- Moins"} de statistiques*/}
      {/*</div>*/}
      {/*{isDisplayStat && <StatProfilForm></StatProfilForm>}*/}
    </div>
  );
};
