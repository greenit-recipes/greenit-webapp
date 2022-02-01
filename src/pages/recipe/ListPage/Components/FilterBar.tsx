import { FilterBarItem } from "pages/recipe/ListPage/Components/FilterBarItem";
import { FilterBarSearch } from "pages/recipe/ListPage/Components/FilterBarSearch";
import { Button } from "components/misc/Button";
import authService from "services/auth.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { find, map, omit, flattenDeep } from "lodash";
import { BackgroundImage } from "components";
import { RouteName } from "App";

interface FilterBarProps {
  filter: Record<string, any>;
  currentFilters: Record<string, any>;
  setCurrentFilters: (filter: Record<string, any>) => void;
  isMobile?: boolean;
  isOnlyForSearch?: boolean;
  toggle?: boolean;
  setScrollOffset: (val: number) => void;
  params: URLSearchParams;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  params,
  currentFilters,
  setCurrentFilters,
  isMobile,
  isOnlyForSearch = false,
  toggle,
  setScrollOffset,
}) => {
  const [search, setSearch] = useState(params.get("search") || "");
  const isLoggedIn = authService.isLoggedIn();
  const removeFilter = (valuex: any, key: any) => {
    let currentState = { ...currentFilters };
    currentState[key] = currentState[key].filter( (value: { value: string, title: string}) => value.value !== valuex);

    setCurrentFilters(currentState);
    //setCurrentFilters(toto);
  };
  const isCurrentFilterEmpty =
    flattenDeep(map(omit(currentFilters, "search"), (x) => x))?.length > 0;

  const removeFilters = () => {
    setCurrentFilters({});
  };
  const handleFilter = (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>
  ) => {
    const state = { ...currentFilters };
    if (state[item.name]) {
      if (find(state[item.name], { value: option.value, title: option.title})) {
        state[item.name] = state[item.name].filter(
          (value: { value: string, title: string}) => value.value !== (option.value)
        );
      } else {
        state[item.name].push({ value: option.value, title: option.title});
      }
    } else {
      state[item.name] = [{ value: option.value, title: option.title}];
    }

    setCurrentFilters(state);
    setScrollOffset(0);
  };

  return (
    <>
    {isOnlyForSearch ? (
    <FilterBarSearch
              search={search}
              keyId="SearchFilterBarForMobile"
              setSearch={setSearch}
              setCurrentFilters={setCurrentFilters}
            />
    ) : (
    <div className="w-full grid justify-items-start lg:justify-items-center bg-white">
      <BackgroundImage />
      <div
        className={
          isMobile
            ? "w-full grid px-4 mt-10 mb-6"
            : "grid grid-rows-2 justify-items-center w-full max-w-6xl p-4 mt-4 rounded-lg"
        }
      >
        {!isMobile && (
          <div className="flex w-11/12 self-center">
            <FilterBarSearch
              search={search}
              keyId="SearchFilterBar"
              setSearch={setSearch}
              setCurrentFilters={setCurrentFilters}
            />
            {isLoggedIn ? (
              <Link to={RouteName.createRecipe} className="flex">
                <Button
                  type="grey"
                  className="self-center h-10 rounded-xl ml-4"
                >
                  <h3> Partager une recette </h3>
                </Button>
              </Link>
            ) : (
              <Link to={RouteName.register} className="flex">
                <Button
                  type="grey"
                  className="self-center h-10 rounded-xl ml-4"
                >
                  <h3> Partager une recette </h3>
                </Button>
              </Link>
            )}
          </div>
        )}
        {isMobile && (
          <Button
            className="p-2 right-0 mr-3 fixed top-14"
            type="grey"
            onClick={() => removeFilters()}
          >
            <h3 className="text-end text-sm">Supprimer les filtres ✕</h3>
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
          <div className="flex-col w-11/12 h-auto bg-bluelight rounded-lg px-4 py-2 mt-4">
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
                            className="flex h-8 inline bg-blue text-white rounded-xl px-3 py-1 ml-2 mb-2"
                            key={index}
                          >
                            <p>{value.title}</p>
                            <button
                              className="ml-2"
                              onClick={() => removeFilter(value.value, key)}
                            >
                              ✖︎
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                </div>
                <div>
                  <Button type="grey" onClick={() => removeFilters()}>
                    <h3 className="text-sm">Supprimer tous les filtres ✖︎</h3>
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
    </div>) 
    }
    </>
  );
};
