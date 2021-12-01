import { getImagePath } from "helpers/image.helper";
import { logo } from "../../icons";

interface UserBadge {
  image: any;
  title?: string;
  className?: string;
}

export const UserBadge: React.FC<UserBadge> = ({ className, image, title}) => {
  return (
    <div className={`flex mr-5 ${className}`}>
      <div className="rounded-full bg-white shadow-lg mr-2">
        <img
          src={getImagePath(image)}
          alt="badge"
          className="w-10 min-w-10 h-10 md:w-12 md:h-12 self-center"
        />
      </div>

      <h1 className="self-center text-lg md:text-xl">{title}</h1>
    </div>
  );
};
