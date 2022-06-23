import { getImagePath } from "helpers/image.helper";
import { defaultImageProfil } from "../../icons";

interface IUserBadge {
  image: any;
  facebookImg: string;
  name?: string;
  className?: string;
  isRecipeCard?: boolean;
  isSinglePage?: boolean;
}

export const UserBadge: React.FC<IUserBadge> = ({
  className,
  image,
  name,
  facebookImg,
  isRecipeCard = false,
  isSinglePage = false,
}) => {
  const normalImage = image ? getImagePath(image) : facebookImg;
  return (
    <>
      {isSinglePage ? (
        <div
          className={
            isRecipeCard
              ? `absolute top-1 left-2 lg:left-2 | grid justify-items-center | rounded-xl ${className}`
              : `flex mr-5 ${className}`
          }
        >
          <div>
            <img
              // @ts-ignore
              src={normalImage ? normalImage : defaultImageProfil}
              alt="badge"
              loading="lazy"
              className={
                isRecipeCard
                  ? `rounded-full bg-white shadow-lg mr-2 w-9 min-w-9 h-9 self-center object-cover`
                  : `rounded-full bg-white shadow-lg mr-2 w-10 min-w-10 h-10 md:w-12 md:h-12 self-center object-cover`
              }
            />
          </div>

          {!isRecipeCard && (
            <h2 className="self-center text-lg md:text-xl">{name}</h2>
          )}
        </div>
      ) : (
        <img
          // @ts-ignore
          src={normalImage ? normalImage : defaultImageProfil}
          alt="badge"
          loading="lazy"
          className="rounded-full h-28 md:w-28 object-cover"
        />
      )}
    </>
  );
};
