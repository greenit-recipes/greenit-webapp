import { PopupButton } from "@typeform/embed-react";
import { bugIcon } from "../../icons";

interface IBugFormulaire {
  className?: string;
}

export const BugFormulaire: React.FC<IBugFormulaire> = ({ className }) => {
  return (
    <div className={`grid fixed bottom-0 right-0 mr-4 mb-4 z-20 justify-items-center  ${className}`}>
      <PopupButton
        id="fKixX57P"
        style={{ fontSize: 20 }}
        size={60}
      >
        <img className="w-12 h-12 shadow-lg rounded-full" src={bugIcon} alt="bug icon" loading="lazy"/>
      </PopupButton>
      <h2 className="flex text-xs text-center">Reporter <br /> un bug</h2>
    </div>
  );
};
