import { commentaireIcon } from "icons";

interface ICommentField {
  className?: string;
  parentFunction?: any;
}

export const CommentField: React.FC<ICommentField> = ({
  className,
  children,
  parentFunction,
}) => {
  return (
    <div
      className={`flex cursor-pointer ml-7 ${className}`}
      onClick={() => {
        if (parentFunction) {
          parentFunction();
        }
      }}
    >
      <img
        src={commentaireIcon}
        className="self-center w-7 h-7 lg:w-8 lg:h-8"
        alt="likes button"
        loading="lazy"
      />
      <h2 className="self-center text-lg md:text-xl ml-1">{children}</h2>
    </div>
  );
};
