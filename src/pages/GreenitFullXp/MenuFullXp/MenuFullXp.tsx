import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React from "react";

interface IMenuFullXp {
  setNavigation: any;
}
const MenuFullXp: React.FC<IMenuFullXp> = ({ setNavigation }) => {
  return (
    <div className="flex flex-wrap space-x-3">
      {menuFullXp.map((item, index) => (
        <div
         className={`cursor-pointer border-b-2 ${ localStorage.getItem("currentMenuGreenitFullXp") === item.name ? "text-active border-active" : "border-inactive"} px-3 pb-1.5`}
          key={item.name}
          onClick={() => {
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
