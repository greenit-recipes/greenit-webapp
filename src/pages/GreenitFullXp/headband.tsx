import React from "react";
import "./fullXp.css";
import "App.css";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import CheckoutFullXp from "pages/GreenitFullXp/CheckoutFullXp/CheckoutFullXp";
interface IHeadBand {
  setNavigation: any;
  currentPositionMenu: number;
  idButton?: string;
}

const HeadBand: React.FC<IHeadBand> = ({
  setNavigation,
  currentPositionMenu,
  idButton,
}) => {
  return (
    <div className="headband h-16 pb-2 bg-white">
      <div>
        <p className="fontQSemibold">Box Premiers Pas</p>
        <p className="fontQSbold text-green">20 € la box</p>
      </div>

      {currentPositionMenu === 1 ? (
        <CheckoutFullXp />
      ) : (
        <button
          id={`${idButton}-etape-suivante`}
          className="h-10 rounded-lg bg-green w-32 lg:w-72 text-white"
          onClick={() => {
            setNavigation(menuFullXp[currentPositionMenu + 1].name);
          }}
        >
         Étape suivante
        </button>
      )}
    </div>
  );
};

export default HeadBand;
