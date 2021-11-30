import { getImagePath } from "helpers/image.helper";
import { logo } from "../../icons";

interface UserBadge {
  recipe?: any;
  className?: string;
}

export const UserBadge: React.FC<UserBadge> = ({ className, recipe }) => {
  console.log(recipe?.author);
  console.log(recipe?.author?.username);
  return (
    <div className={`flex mr-5 ${className}`}>
        <img
          // src={getImagePath(recipe?.author?.imageProfile)}
          src={logo}
          className="w-10 min-w-10 h-10 md:w-16 md:h-16 self-center w-1/4 rounded-3xl"
        />
        <h1 className="self-center text-lg md:text-xl">GreenitCommunity</h1>
    </div>
  );
};
