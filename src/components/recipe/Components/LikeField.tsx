import { clapIcon } from "../../../icons";

interface LikeField {
  className?: string;
}

export const LikeField: React.FC<LikeField> = ({ className, children }) => {
  return (
    <div
      className={`flex absolute top-2 left-38 w-20 h-10 bg-white rounded-xl p-3 ${className}`}
    >
      <img src={clapIcon} className="self-center w-10 h-10" alt="likes" />
      <div className="self-center text-xl">{children}</div>
    </div>
  );
};
