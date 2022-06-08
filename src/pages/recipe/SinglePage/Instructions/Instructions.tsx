import "./Instructions.css";
import useIsMobile from "hooks/isMobile";

interface IInstruction {
  index: number;
  text: string;
  isSelected: boolean;
  isHighlighted: boolean;
}
export const Instruction: React.FC<IInstruction> = ({
  index,
  text,
  isSelected,
  isHighlighted,
}) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div className={`flex items-center justify-center`}>
      <div
        className={`h-10 mr-5 rounded-full flex items-center justify-center instruction-video-down ${
          isHighlighted ? "text-white bg-black" : "text-black bg-greyL"
        }`}
        style={{ minWidth: "2.5rem" }}
      >
        {index}
      </div>
      <p
        className={` lg:h-14 max-h-36  ${
          isHighlighted ? "btn-single-page p-2" : ""
        }`}
      >
        {text}
      </p>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div
        className={`h-10 mr-5 rounded-full flex items-center justify-center ${
          isHighlighted
            ? "text-white bg-black instruction-video-up"
            : "text-black bg-greyL instruction-video-down"
        }`}
        style={{ minWidth: "2.5rem" }}
      >
        {index}
      </div>
      <p
        className={`flex items-center justify-center  lg:h-14 max-h-36 ${
          isHighlighted ? "instruction-video-cadre" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
};
