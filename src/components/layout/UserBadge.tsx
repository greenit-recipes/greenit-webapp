import { getImagePath } from "helpers/image.helper";
import { defaultImageProfil } from "../../icons";

interface IUserBadge {
  image: any;
  name?: string;
  className?: string;
  isRecipeCard?: boolean;
}

export const UserBadge: React.FC<IUserBadge> = ({ className, image, name, isRecipeCard = false}) => {
  return (
    <div className={isRecipeCard
      ? `absolute top-1 left-2 lg:left-2 | grid justify-items-center | rounded-xl ${className}`
      : `flex mr-5 ${className}`}> 
      <div>
        <img
          src={image ? getImagePath(image) : defaultImageProfil}
          alt="badge"
          className={ isRecipeCard
          ? `rounded-full bg-white shadow-lg mr-2 w-9 min-w-9 h-9 self-center object-cover`
          : `rounded-full bg-white shadow-lg mr-2 w-10 min-w-10 h-10 md:w-12 md:h-12 self-center object-cover`} 
        />
      </div>

      { !isRecipeCard && (<h2 className="self-center text-lg md:text-xl">{name}</h2>) }
    </div>
  );
};
