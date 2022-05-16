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
            setNavigation(item.name);
          }}
        >
         {item.name}
        </div>
      ))}
    </div>
  );
};

export default MenuFullXp;
