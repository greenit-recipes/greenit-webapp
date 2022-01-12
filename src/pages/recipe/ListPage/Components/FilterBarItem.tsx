import { useState } from "react";
import { includes, keys } from "lodash";

interface IFilterBarItem {
  item: Record<string, any>;
  handleFilter: (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>
  ) => void;
  currentFilters: Record<string, any>;
}

export const FilterBarItem: React.FC<IFilterBarItem> = ({
  item,
  handleFilter,
  currentFilters,
}) => {
  const [isTrigerButton, setTrigerButton] = useState(false);
  const isDisplay = isTrigerButton ? "absolute" : "hidden";
  const checkShouldBeChecked = (isChecked: boolean, value: string) => {};
  const currentId = item?.name;
  const filterIsActivate = includes(keys(currentFilters), currentId);

  return (
    <>
      <div className="relative">
        <button
          className="flex"
          onClick={() => {
            setTrigerButton(!isTrigerButton);
          }}
        >
          <p>{item.title}</p>
          {isTrigerButton && <p>--</p>}
          {!isTrigerButton && <p>!!</p>}
          {filterIsActivate}

          {currentFilters[item.name] ? <div>({currentFilters[item.name].length})</div> : <div>(0)</div>}
        </button>
        <ul className={" list-none w-24 bg-blue " + "20px" + " " + isDisplay}>
          {item.options.map(
            (option: { title: string; value: string }, index: any) => {
              const isSelected =
                currentFilters[item.name] === (option.value || option.title);
              return (
                <li
                  className={
                    isSelected ? "text-green underline" : "text-gray-700"
                  }
                  onClick={() => {
                    handleFilter(isSelected, option, item);
                  }}
                >
                  {option.title}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};
