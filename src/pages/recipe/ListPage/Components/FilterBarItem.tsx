import { Checkbox } from "components/layout/Checkbox";
import { find } from "lodash";
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
            <h2 className="text-lg">{item.title} ▾ </h2>
            <div className="ml-2 self-center text-md">
              {currentFilters?.[item.name]?.length ? (
                <h2>{currentFilters?.[item.name].length}</h2>
              ) : (
                <></>
              )}
            </div>
          </button>
          <ul
            id="list"
            className={"list-none bg-white text-lg rounded-lg"}
          >
            {item.options.map(
              (option: { title: string; value: string }, index: any) => {
                const isSelected = !!find(
                  currentFilters?.[item.name],
                  { value: option.value },
                );
                return (
                  <li key={index} className="ml-2 py-1 text-base">
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
        <div className="ml-4 mt-4">
          <div className="flex">
            <h2 className="text-xl self-center">{item.title}</h2>
            {currentFilters?.[item.name]?.length ? (
              <h2 className="self-center ml-2">
                {currentFilters?.[item.name].length}
              </h2>
            ) : (
              <></>
            )}
          </div>
          <ul className={"w-auto"}>
            {item.options.map(
              (option: { title: string; value: string }, index: any) => {
                const isSelected = !!find(
                  currentFilters?.[item.name],
                  { value: option.value },
                );
                return (
                  <li key={index} className="p-1 text-lg">
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
          <div className="border-b-2 border-grey w-2/3 mt-4"></div>
        </div>
      )}
    </>
  );
};
