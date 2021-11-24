import { clapIcon } from "../../../icons";

interface LikeField {
  className?: string;
}

export const LikeField: React.FC<LikeField> = ({ className, children }) => {
  return (
    <div
      className={`flex absolute top-2 left-1/2 lg:left-36 w-2/5 lg:w-20 h-10 bg-white rounded-xl p-4 ${className}`}
    >
      <img src={clapIcon} className="self-center w-6 h-6 lg:w-8 lg:h-8 mb-1" alt="likes" />
      <div className="self-center text-sm lg:text-xl ml-1">{children}</div>
    </div>
  );
};
