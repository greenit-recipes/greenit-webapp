import { UserBadge } from "components/layout/UserBadge";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import HTMLReactParser from "html-react-parser";
import { rondIcon } from "icons";
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
          setHeight(divElement?.clientHeight);
      }}
      className="fixed z-0 grid w-full pb-20 justify-items-center bg-yellowL lg:mt-2"
    >
      <div className="flex mt-20 items-center justify-center mb-10">
        <UserBadge
          image={recipe?.author?.imageProfile}
          // @ts-ignore
          facebookImg={recipe?.author?.photoUrl}
        ></UserBadge>
        <div className="flex flex-col w-2/3 lg:w-1/3 ml-4 lg:ml-8">
          <div className="flex mb-3">
            <div className="flex flex-col mr-10">
              <h3 className="">{recipe?.author?.username}</h3>
              <div className="mb-1 text-sm">Créateur.ice</div>
            </div>
            <div className="flex flex-row mb-3 mt-3">
              {
                // @ts-ignore
                !isEmpty(JSON.parse(recipe?.author?.urlsSocialMedia)) &&
                  JSON.parse(recipe?.author?.urlsSocialMedia)?.map(
                    (data: any, index: any) => (
                      <div
                        className="relative mr-2 w-9 h-9 justify-center flex items-center "
                        key={index}
                      >
                        <a
                          href={data?.url}
                          target="_blank"
                          className="hover:text-yellow sm:hover:scale-105 ease-linear"
                        >
                          <img
                            src={rondIcon}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            alt="icon rond"
                          ></img>

                          <i
                            className={`bx  mt-1 ${
                              getLogoAndNameByUrl(data?.url)?.icon
                            } bx-sm`}
                          ></i>
                        </a>
                      </div>
                    ),
                  )
              }
            </div>
          </div>
          <div className="flex flex-col w-full pr-4  lg:pl-0 lg:pr-0 lg:flex-row">
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
