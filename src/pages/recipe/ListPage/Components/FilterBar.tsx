import { Button } from "components/misc/Button";
import { getObjectSession } from "helpers/session-helper";
import { find, flattenDeep, map, omit } from "lodash";
import { FilterBarItem } from "pages/recipe/ListPage/Components/FilterBarItem";
import { FilterBarSearch } from "pages/recipe/ListPage/Components/FilterBarSearch";
import React, { useState } from "react";

interface FilterBarProps {
  filter: Record<string, any>;
  currentFilters: Record<string, any>;
  setCurrentFilters: (filter: Record<string, any>) => void;
  isMobile?: boolean;
  recipesAutoComplete?: any;
  setSearch: any;
  search: any;
  isOnlyForSearch?: boolean;
  toggle?: boolean;
  setScrollOffset: (val: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  currentFilters,
  setCurrentFilters,
  recipesAutoComplete,
  setSearch,
  search,
  isMobile,
  isOnlyForSearch = false,
  toggle,
  setScrollOffset,
}) => {
  const removeFilter = (valuex: any, key: any) => {
    let currentState = { ...currentFilters };
    currentState[key] = currentState[key].filter(
      (value: { value: string; title: string }) => value.value !== valuex,
    );

    setCurrentFilters(currentState);
  };
  const isCurrentFilterEmpty =
    flattenDeep(map(omit(currentFilters, "search"), x => x))?.length > 0;

  const searchText = getObjectSession("filterListPage")?.search;

  const removeFilters = () => {
    setCurrentFilters({
      search: "",
      // @ts-ignore
      tags: [],
      // @ts-ignore
      category: [],
      difficulty: [],
      duration: [],
      numberOfIngredients: [],
    });
  };
  const handleFilter = (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>,
  ) => {
    const state = { ...currentFilters };
    if (state[item.name]) {
      if (
        find(state[item.name], { value: option.value, title: option.title })
      ) {
        state[item.name] = state[item.name].filter(
          (value: { value: string; title: string }) =>
            value.value !== option.value,
        );
      } else {
        state[item.name].push({ value: option.value, title: option.title });
      }
    } else {
      state[item.name] = [{ value: option.value, title: option.title }];
    }

    setCurrentFilters(state);
    setScrollOffset(0);
  };

  return (
    <>
      {isOnlyForSearch ? (
        <FilterBarSearch
          customClass="w-full lg:w-3/6"
          recipesAutoComplete={recipesAutoComplete}
          search={search}
          keyId="SearchFilterBarForMobile"
          setSearch={setSearch}
          setCurrentFilters={setCurrentFilters}
        />
      ) : (
        <div className="grid w-full bg-white justify-items-start lg:justify-items-center">
          <div
            className={
              isMobile
                ? "w-full grid px-4 mt-10 mb-6"
                : "grid justify-items-center w-full max-w-6xl p-4 rounded-lg"
            }
          >
            {!isMobile && (
              <div className="flex self-center w-11/12 flex-col">
                <FilterBarSearch
                  customClass="w-2/6"
                  recipesAutoComplete={recipesAutoComplete}
                  search={search}
                  keyId="SearchFilterBar"
                  setSearch={setSearch}
                  setCurrentFilters={setCurrentFilters}
                />
                {searchText && searchText.length && (
                  <div className="mt-4 border-b-1 pb-2 mb-2">
                    <p className="mb-1">
                      <span className="text-sm mr-2">Résultats pour </span>{" "}
                      <span className="font-bold text-lg">"{searchText}"</span>
                    </p>
                  </div>
                )}
              </div>
            )}
            {isMobile && (
              <Button
                className="fixed right-0 p-2 mr-3 top-14"
                type="red"
                onClick={() => removeFilters()}
              >
                <h3 className="text-sm text-end">Supprimer les filtres X</h3>
              </Button>
            )}
            <div className={isMobile ? "" : "grid grid-cols-5 mt-4 w-10/12"}>
              {filter.slice(0, 4).map((item: any, index: any) => (
                <div key={index}>
                  <FilterBarItem
                    isMobile={isMobile}
                    item={item}
                    currentFilters={currentFilters}
                    handleFilter={handleFilter}
                  />
                </div>
              ))}
              {filter.slice(4, 10).map((item: any, index: any) => (
                <div key={index}>
                  <FilterBarItem
                    isMobile={isMobile}
                    item={item}
                    currentFilters={currentFilters}
                    handleFilter={handleFilter}
                  />
                </div>
              ))}
            </div>

            {!isMobile && (
              <div className="flex-col w-11/12 h-auto px-4 py-2 mt-4 rounded-lg bg-blueL">
                {isCurrentFilterEmpty && (
                  <>
                    <div className="flex">
                      <div>
                        <h2 className="self-center">Filtres:</h2>
                      </div>
                      <div className="flex flex-wrap">
                        {map(
                          omit(currentFilters, "search"),
                          (item: any, key: any) =>
                            map(item, (value, index) => (
                              <div
                                className="flex inline h-8 px-3 mb-2 ml-2 text-white rounded-lg bg-blue py-1"
                                key={index}
                              >
                                <p>{value.title}</p>
                                <button
                                  className="ml-2"
                                  onClick={() => removeFilter(value.value, key)}
                                >
                                  x
                                </button>
                              </div>
                            )),
                        )}
                      </div>
                    </div>
                    <div>
                      <Button type="grey" onClick={() => removeFilters()}>
                        <h3 className="text-sm">
                          Supprimer tous les filtres X
                        </h3>
                      </Button>
                    </div>
                  </>
                )}
                {!isCurrentFilterEmpty && (
                  <div className="grid | h-18">
                    <h3 className="self-center">Pas de filtre sélectionné</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
