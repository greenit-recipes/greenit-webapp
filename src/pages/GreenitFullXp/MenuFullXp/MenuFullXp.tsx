import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React from "react";

interface IMenuFullXp {
  setNavigation: any;
}
const MenuFullXp: React.FC<IMenuFullXp> = ({ setNavigation }) => {
  return (
    <div className="flex flex-wrap space-x-4 rounded-3xl bg-inactive">
      {menuFullXp.map((item, index) => (
        <div
         className={` ${ item?.haveAccesOnMenu ? 'cursor-pointer ' : ''} ${ localStorage.getItem("currentMenuGreenitFullXp") === item.name ? "rounded-3xl font-medium text-white bg-active" : ""} text-sm py-1.5 px-3`}
          key={item.name}
          onClick={() => {
            if (!item?.haveAccesOnMenu) return;
            //Todo : Investigate the behaviour
            //Step over payment phase in the navigation
            item.name !== menuFullXp[1].name && setNavigation(item.name);
            //Clear menu cookies on confirmation
            item.name === menuFullXp[2].name && localStorage.removeItem("currentMenuGreenitFullXp")
          }}
        >
         {item.name}
        </div>
      ))}
    </div>
  );
};

export default MenuFullXp;
