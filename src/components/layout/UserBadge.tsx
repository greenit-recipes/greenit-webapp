import { getImagePath } from "helpers/image.helper";
import { logo } from "../../icons";

interface UserBadge {
  recipe?: any;
  user?: any;
  className?: string;
}

export const UserBadge: React.FC<UserBadge> = ({ className, user }) => {
  console.log(user);
  return (
    <div className={`flex mr-5 ${className}`}>
      <div className="rounded-full bg-white shadow-lg mr-2">
        <img
          src={logo}
          alt="badge"
          className="w-10 min-w-10 h-10 md:w-12 md:h-12 self-center"
        />
      </div>

      <h1 className="self-center text-lg md:text-xl">GreenitCommunity</h1>
    </div>
  );
};
