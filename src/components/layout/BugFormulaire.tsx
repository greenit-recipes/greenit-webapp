import { PopupButton } from "@typeform/embed-react";
import { bugIcon } from "../../icons";

interface BugFormulaire {
  className?: string;
}

export const BugFormulaire: React.FC<BugFormulaire> = ({ className }) => {
  return (
    <div className={`grid fixed bottom-0 right-0 mr-6 mb-6 z-20 justify-items-center  ${className}`}>
      <PopupButton
        id="fKixX57P"
        style={{ fontSize: 20 }}
        className="w-14 h-14 bg-green rounded-full p-1 mb-1"
        size={60}
      >
        <img src={bugIcon} />
      </PopupButton>
      <h1 className="flex text-xs text-center">Reporter <br /> un bug</h1>
    </div>
  );
};
