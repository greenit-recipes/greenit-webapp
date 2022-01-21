import { useState } from "react";
import { includes, keys } from "lodash";
import { Checkbox } from "components/layout/Checkbox";
import "pages/recipe/ListPage/Components/FilterBar.css";

interface IFilterBarItem {
  item: Record<string, any>;
  handleFilter: (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>
  ) => void;
  currentFilters: Record<string, any>;
  isMobile?: boolean;
}

export const FilterBarItem: React.FC<IFilterBarItem> = ({
  item,
  handleFilter,
  currentFilters,
  isMobile,
}) => {
  return (
    <>
      {!isMobile ? (
        <div className="w-auto min-w-14" id="menu">
          <button className="flex border-b-2 border-transparent hover:border-blue self-center">
            <h1 className="text-lg">{item.title}</h1>
            <div className="ml-2 self-center text-md">
              {currentFilters[item.name] ? (
                <h1>{currentFilters[item.name].length}</h1>
              ) : (
                <h1 className="self-center text-md">0</h1>
              )}
            </div>
          </button>
          <ul
            id="list"
            className={"list-none w-60 bg-white rounded-lg p-2 text-lg"}
          >
            {item.options.map(
              (option: { title: string; value: string }, index: any) => {
                const isSelected = includes(
                  currentFilters[item.name],
                  option.value || option.title
                );
                return (
                  <li key={index} className="p-1">
                    <Checkbox
                      index={index}
                      parentFunction={handleFilter}
                      item={item}
                      option={option}
                      isChecked={isSelected}
                    ></Checkbox>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      ) : (
        <div>
          <button className="flex">
            <h1>{item.title}</h1>
            <div className="ml-2">
              {currentFilters[item.name] ? (
                <>({currentFilters[item.name].length})</>
              ) : (
                <></>
              )}
            </div>
          </button>
          <ul className={"list-none w-40 bg-white rounded-lg shadow-sm 20px"}>
            {item.options.map(
              (option: { title: string; value: string }, index: any) => {
                const isSelected = includes(
                  currentFilters[item.name],
                  option.value || option.title
                );
                return (
                  <li key={index} className="p-1">
                    <Checkbox
                      index={index}
                      parentFunction={handleFilter}
                      item={item}
                      option={option}
                      isChecked={isSelected}
                    ></Checkbox>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </>
  );
};
