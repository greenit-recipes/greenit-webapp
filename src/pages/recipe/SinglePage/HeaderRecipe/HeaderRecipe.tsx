import { UserBadge } from "components/layout/UserBadge";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import { useRef } from "react";
import "./HeaderRecipe.css";
interface IHeaderRecipe {
  className?: string;
  recipe: any;
  parentFcn?: any;
}

export const HeaderRecipe: React.FC<IHeaderRecipe> = ({
  className,
  recipe,
  parentFcn
}) => {
  const user = null;

  return (
    <div  
    ref={ (divElement) => { if(parentFcn) parentFcn(divElement?.clientHeight) } }
    className="fixed z-0 grid justify-items-center w-full pb-20 bgColorHeaderRecipe">
      <div className="fontQSbold text-2xl lg:text-3xl mt-20">Alicds</div>
      <div className="fontQSregular text-lg	mb-3">Créateur.ice</div>
      <div className="w-full pl-4 pr-4 lg:pl-0 lg:pr-0 lg:w-3/6 flex flex-col lg:flex-row fontQSmedium  mb-8 flex items-center justify-center">
        <UserBadge
          image={recipe?.author?.imageProfile}
          // @ts-ignore
          facebookImg={recipe?.author?.photoUrl}
        ></UserBadge>
        <div className="flex items-center lg:ml-5">
          🍃 conseillère en aroma-phytothérapie sur Aix en Provence 🌻 recettes,
          DIY, conseils, bien-être 🌿 conseils personnalisés 🍃 conseillère en
          aroma-phytothérapie sur Aix en Provence 🌻 recettes, DIY, conseils,
          bien-être 🌿 conseils personnalisés
        </div>
      </div>
      <div className="mb-7">
        <div className="flex mr-3 pt-2 pb-2 pl-2 pr-4 bg-white rounded fontQSmedium">
          <img
            className="h-5 w-5 mr-3"
            src="https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/768x492_tous-trolls.jpg"
          ></img>
          Voir le profil
        </div>
        {
          // @ts-ignore
          user && JSON.parse(user?.urlsSocialMedia)?.map((data: any, index: any) => (
              <a href={data?.url} key={index}>
        <div className="flex pt-2 pb-2 pl-2 pr-2 bg-white rounded fontQSmedium">
                  <img
                    src={getLogoAndNameByUrl(data?.url)?.icon}
                    className="w-7 h-7 self-center"
                    alt={getLogoAndNameByUrl(data?.url)?.name}
                  />
                  <div>{getLogoAndNameByUrl(data?.url)?.name}</div>
                </div>
              </a>
            ))
        }
      </div>
    </div>
  );
};
