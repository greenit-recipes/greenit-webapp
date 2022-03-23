import { UserBadge } from "components/layout/UserBadge";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import HTMLReactParser from "html-react-parser";
import "./HeaderRecipe.css";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { isEmpty } from "lodash";

interface IHeaderRecipe {
  className?: string;
  recipe: any;
  parentFcn?: any;
}

export const HeaderRecipe: React.FC<IHeaderRecipe> = ({
  className,
  recipe,
  parentFcn,
}) => {
  const [isDisplay, setIsDisplay] = useState(false);
  console.log("recipe?.author?.urlsSocialMedia", recipe?.author?.urlsSocialMedia)
  return (
    <div
      ref={(divElement) => {
        if (parentFcn) parentFcn(divElement?.clientHeight);
      }}
      className="fixed z-0 grid justify-items-center w-full pb-20 bgColorHeaderRecipe"
    >
      <div className="fontQSbold text-2xl lg:text-3xl mt-20">
        {recipe?.author?.username}
      </div>
      <div className="fontQSregular text-lg	mb-3">Créateur.ice</div>
      <div className="w-full pl-4 pr-4 lg:pl-0 lg:pr-0 lg:w-3/6 flex flex-col lg:flex-row fontQSmedium  mb-8 flex items-center justify-center">
        <UserBadge
          image={recipe?.author?.imageProfile}
          // @ts-ignore
          facebookImg={recipe?.author?.photoUrl}
        ></UserBadge>
        <div className="flex items-center lg:ml-5">
          {recipe?.author?.biographie &&
            HTMLReactParser(recipe?.author?.biographie)}
        </div>
      </div>
      {isDisplay && (
        <div className="text-lg p-4 text-blue">
          Nous travaillons sur cette fonctionnalité ! Bientôt, tu auras accès
          aux recettes de tes créateurs.ices préféré.e.s !
        </div>
      )}
      <div className="mb-5">
        <div
          className="flex mr-3 pt-2 pb-2 pl-2 pr-4 cursor-pointer bg-white rounded fontQSmedium"
          onClick={() => {
            setIsDisplay(!isDisplay);
          }}
        >
          <CgProfile id="see-profil-createur" className="h-6 w-7 mr-3" />
          <div id="see-profil-createur">Voir le profil</div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap mt-2 mb-7">
          {
            // @ts-ignore
            isEmpty(recipe?.author?.urlsSocialMedia) && JSON.parse(recipe?.author?.urlsSocialMedia)?.map(
              (data: any, index: any) => (
                <a href={data?.url} key={index}>
                  <div className="flex flex-row mt-1 gap-2 ml-2 bg-white shadow-lg rounded-lg items-center justify-center border p-1 lg:p-2">
                    <img
                      src={getLogoAndNameByUrl(data?.url)?.icon}
                      className="w-7 h-7 self-center"
                      alt={getLogoAndNameByUrl(data?.url)?.name}
                    />
                  </div>
                </a>
              )
            )
          }
        </div>
    </div>
  );
};
