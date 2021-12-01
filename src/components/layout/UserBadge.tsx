import { getImagePath } from "helpers/image.helper";
import { logo } from "../../icons";

interface UserBadge {
  image: any;
  name?: string;
  className?: string;
}

export const UserBadge: React.FC<UserBadge> = ({ className, image, name}) => {
  return (
    <div className={`flex mr-5 ${className}`}>
      <div>
        <img
          src={logo}
          alt="badge"
          className="rounded-full bg-white shadow-lg mr-2 w-10 min-w-10 h-10 md:w-12 md:h-12 self-center"
        />
      </div>

      <h1 className="self-center text-lg md:text-xl">{name}</h1>
    </div>
  );
};
