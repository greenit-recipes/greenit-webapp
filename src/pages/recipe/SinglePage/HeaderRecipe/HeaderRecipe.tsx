import { UserBadge } from "components/layout/UserBadge";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import HTMLReactParser from "html-react-parser";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import "./HeaderRecipe.css";

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
  const [height, setHeight] = useState(0);
  useEffect(() => {
    parentFcn(height);
  });
  return (
    <div
      ref={divElement => {
        if (divElement && divElement.clientHeight !== 0)
          setHeight(divElement.clientHeight);
      }}
      className="fixed z-0 grid w-full pb-20 justify-items-center bg-yellowL lg:mt-2"
    >
      <div className="flex lg:mt-20 items-center justify-center mb-10">
        <UserBadge
          image={recipe?.author?.imageProfile}
          // @ts-ignore
          facebookImg={recipe?.author?.photoUrl}
        ></UserBadge>
        <div className="flex flex-col w-1/3 ml-8">
          <div className="flex mb-3">
            <div className="flex flex-col mr-10">
              <h3 className="">{recipe?.author?.username}</h3>
              <div className="mb-1 text-sm">Créateur.ice</div>
            </div>
            <div className="flex flex-row flex-wrap mb-3 mt-3">
              {
                // @ts-ignore
                !isEmpty(JSON.parse(recipe?.author?.urlsSocialMedia)) &&
                  JSON.parse(recipe?.author?.urlsSocialMedia)?.map(
                    (data: any, index: any) => (
                      <a href={data?.url} key={index} className="mr-2">
                        <i
                          className={`bx ${
                            getLogoAndNameByUrl(data?.url)?.icon
                          } bx-sm`}
                        ></i>
                      </a>
                    ),
                  )
              }
            </div>
          </div>
          <div className="flex flex-col w-full pl-4 pr-4  lg:pl-0 lg:pr-0 lg:flex-row">
            <div className="flex items-center text-sm lg:text-base">
              {recipe?.author?.biographie &&
                HTMLReactParser(recipe?.author?.biographie)}
            </div>
          </div>
        </div>

        {isDisplay && (
          <div className="p-4 text-lg text-blue">
            Nous travaillons sur cette fonctionnalité ! Bientôt, tu auras accès
            aux recettes de tes créateurs.ices préféré.e.s !
          </div>
        )}
      </div>
    </div>
  );
};
