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
          className="flex border-b-2 border-transparent hover:border-blue self-center"
          onClick={() => {
            setTrigerButton(!isTrigerButton);
          }}
        >
          <h1>{item.title}</h1>
          {isTrigerButton && <p className="mx-2"> ▾ </p>}
          {!isTrigerButton && <p className="mx-2"> ▿ </p>}
          {filterIsActivate}

          {currentFilters[item.name] ? (
            <div>({currentFilters[item.name].length})</div>
          ) : (
            <div>(0)</div>
          )}
        </button>
        <ul
          className={
            " list-none w-40 bg-white border-2 p-2 rounded-lg shadow-sm " +
            "20px" +
            " " +
            isDisplay
          }
        >
          {item.options.map(
            (option: { title: string; value: string }, index: any) => {
              const isSelected =
                currentFilters[item.name] === (option.value || option.title);
              return (
                <div
                  className="flex"
                  onClick={() => {
                    handleFilter(isSelected, option, item);
                  }}
                >
                  <input
                    type="checkbox"
                    className={isSelected ? " bg-blue" : ""}
                  />
                  <li className="ml-2">{option.title}</li>
                </div>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};
