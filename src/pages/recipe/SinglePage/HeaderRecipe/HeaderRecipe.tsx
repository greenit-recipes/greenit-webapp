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
  return (
    <div
      ref={(divElement) => {
        if (parentFcn) parentFcn(divElement?.clientHeight);
      }}
      className="fixed z-0 grid w-full pb-20 justify-items-center bgColorHeaderRecipe"
    >
      <div className="mt-20 text-2xl font-semibold lg:text-3xl">
        {recipe?.author?.username}
      </div>
      <div className="mb-3 text-lg fontQSregular">Créateur.ice</div>
      <div className="flex flex-col items-center justify-center w-full pl-4 pr-4 mb-8 lg:pl-0 lg:pr-0 lg:w-3/6 lg:flex-row fontQSmedium">
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
        <div className="p-4 text-lg text-blue">
          Nous travaillons sur cette fonctionnalité ! Bientôt, tu auras accès
          aux recettes de tes créateurs.ices préféré.e.s !
        </div>
      )}
      <div className="mb-5">
        <div
          className="flex pt-2 pb-2 pl-2 pr-4 mr-3 bg-white rounded cursor-pointer fontQSmedium"
          id="see-profil-createur"
          onClick={() => {
            setIsDisplay(!isDisplay);
          }}
        >
          <CgProfile className="h-6 mr-3 w-7" />
          <div>Voir le profil</div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap mt-2 mb-7">
          {
            // @ts-ignore
            !isEmpty(JSON.parse(recipe?.author?.urlsSocialMedia)) && JSON.parse(recipe?.author?.urlsSocialMedia)?.map(
              (data: any, index: any) => (
                <a href={data?.url} key={index}>
                  <div className="flex flex-row items-center justify-center object-cover gap-2 p-1 mt-1 ml-2 bg-white border rounded-lg shadow-lg lg:p-2">
                    <img
                      src={getLogoAndNameByUrl(data?.url)?.icon}
                      className="self-center w-7 h-7"
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
