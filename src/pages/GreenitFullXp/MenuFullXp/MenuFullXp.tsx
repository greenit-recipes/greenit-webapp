import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React from "react";

interface IMenuFullXp {
  setNavigation: any;
}
const MenuFullXp: React.FC<IMenuFullXp> = ({ setNavigation }) => {
  return (
    <div className="flex m-4 ml-14 mt-10">
      {menuFullXp.map((item, index) => (
        <div
         className="cursor-pointer m-2"
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
