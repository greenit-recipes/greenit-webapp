import { getElementById } from "domutils";
import { keys, values } from "lodash";
import { useState } from "react";

interface MenuMultiSelect {
  title: string;
}

export const MenuMultiSelect: React.FC<MenuMultiSelect> = ({ title }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="flex w-max px-4">
        <button
          id={`ingredeintSinglePage-menu-${title}`}
          className={isActive ? "flex" : "flex bg-blue"}
          onClick={() => setIsActive(!isActive)}
        >
          <i className="bx bx-bowl-hot bx-sm"></i>
          <h4 className="ml-2">{title}</h4>
        </button>
      </div>
    </>
  );
};
