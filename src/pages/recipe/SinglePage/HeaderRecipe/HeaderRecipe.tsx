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
  console.log('recipe -->', recipe)
  return (
    <div
      ref={(divElement) => {
        if (parentFcn) parentFcn(divElement?.clientHeight);
      }}
      className="fixed z-0 grid w-full pb-20 justify-items-center bgColorHeaderRecipe"
    >
      <div className="mt-12 lg:mt-20 text-xl lg:text-2xl">
        {recipe?.author?.username}
      </div>
      <div className="mb-1 fontQSregular">Créateur.ice</div>
      <div className="flex flex-col items-center justify-center w-full pl-4 pr-4  lg:pl-0 lg:pr-0 lg:w-3/6 lg:flex-row fontQSmedium">
        <UserBadge
          image={recipe?.author?.imageProfile}
          // @ts-ignore
          facebookImg={recipe?.author?.photoUrl}
        ></UserBadge>
        <div className="flex items-center lg:ml-5 text-sm lg:text-base">
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
      <div className="flex flex-row lg:flex justify-center items-center mb-5 mt-2">
        <div>
          <div
            className="flex pt-1 pb-1 pl-2 pr-4 mr-6 bg-white rounded cursor-pointer fontQSmedium"
            id="see-profil-createur"
            onClick={() => {
              setIsDisplay(!isDisplay);
            }}
          >
            <CgProfile className="h-6 mr-3 w-7" />
            <div>Voir le profil</div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap mb-3 mt-3">
          {
            // @ts-ignore
            !isEmpty(JSON.parse(recipe?.author?.urlsSocialMedia)) &&
              JSON.parse(recipe?.author?.urlsSocialMedia)?.map(
                (data: any, index: any) => (
                  <a href={data?.url} key={index}>
                    <div className="flex flex-row items-center justify-center object-cover gap-2 w-8 lg:w-10 h-8 ml-2 bg-white border rounded-lg shadow-lg lg:p-2">
                      <img
                        src={getLogoAndNameByUrl(data?.url)?.icon}
                        className="self-center w-6 h-6"
                        alt={getLogoAndNameByUrl(data?.url)?.name}
                      />
                    </div>
                  </a>
                )
              )
          }
        </div>
      </div>
    </div>
  );
};
