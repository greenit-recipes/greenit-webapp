import { useState } from "react";
import { includes, keys } from "lodash";

interface IFilterBarItem {
  item: Record<string, any>;
  handleFilter: (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>
  ) => void;
  key: string;
  currentFilters: Record<string, any>;
}

export const FilterBarItem: React.FC<IFilterBarItem> = ({
  item,
  handleFilter,
  key,
  currentFilters,
}) => {
  const [isTrigerButton, setTrigerButton] = useState(false);
  const isDisplay = isTrigerButton ? "absolute" : "hidden";
  const checkShouldBeChecked = (isChecked: boolean, value: string) => {};
  const currentId = item?.name;
  const filterIsActivate = includes(keys(currentFilters), currentId);
  console.log("currentFilters filter bar item -->", currentFilters);

  return (
    <>
      <div
        className="relative"
        key={key}
        onMouseEnter={() => setTrigerButton(true)}
        onMouseLeave={() => setTrigerButton(false)}
      >
        <button className="flex border-b-2 border-transparent hover:border-blue self-center">
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
              const isSelected = includes(currentFilters[item.name], (option.value || option.title))
              return (
                <div
                  className="flex"
                  key={index}
                  onClick={() => {
                    handleFilter(isSelected, option, item);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
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
