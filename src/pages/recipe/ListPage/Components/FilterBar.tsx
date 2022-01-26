import { FilterBarItem } from "pages/recipe/ListPage/Components/FilterBarItem";
import { FilterBarSearch } from "pages/recipe/ListPage/Components/FilterBarSearch";
import { Button } from "components/misc/Button";
import authService from "services/auth.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { find, map, omit, flattenDeep } from "lodash";
import { BackgroundImage } from "components";

interface FilterBarProps {
  filter: Record<string, any>;
  currentFilters: Record<string, any>;
  setCurrentFilters: (filter: Record<string, any>) => void;
  isMobile?: boolean;
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
  useEffect(() => {
    if (isMobile && !toggle) {
      setCurrentFilters((prevState: Record<string, any>) => {
        return {
          ...prevState,
          search,
        };
      });
    }
  }, [toggle, search]);
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

  if (isMobile) {
    return (
      // to refacto - we can scroll in the back + we have to click again on the filter icon to see the results
      <div className="flex sticky top-0 z-50 bg-red w-screen h-screen">
        <div
          className={`z-10 bg-white top-0 h-full ${
            toggle ? "filterBar_fadeIn" : "filterBar_fadeOut"
          } grid justify-items-center items-align-center rounded-xl`}
        >
          <div className="flex flex-col items-center mt-24">
            <FilterBarSearch
              setCurrentFilters={setCurrentFilters}
              search={search}
              setSearch={setSearch}
            />
            {isLoggedIn ? (
              <Link to="/créer-une-recette">
                <Button type="green" className="mb-6 rounded-lg text-lg">
                  Partager une recette
                </Button>
              </Link>
            ) : (
              <div />
            )}
            <div className="grid grid-cols-2 w-full">
              {filter.map((item: any, index: any) => (
                <FilterBarItem
                  item={item}
                  key={index}
                  currentFilters={currentFilters}
                  handleFilter={handleFilter}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen grid justify-items-start lg:justify-items-center">
      <BackgroundImage />
      <div
        className={
          isMobile
            ? "w-full grid px-4 mt-10 mb-6"
            : "grid grid-rows-2 justify-items-center w-full max-w-6xl p-4 bg-white mt-4 rounded-lg"
        }
      >
        {!isMobile && (
          <div className="flex w-11/12 self-center">
            <FilterBarSearch
              search={search}
              setSearch={setSearch}
              setCurrentFilters={setCurrentFilters}
            />
            {isLoggedIn ? (
              <Link to="/créer-une-recette" className="flex">
                <Button
                  type="grey"
                  className="self-center h-10 rounded-xl ml-4"
                >
                  <h3> Partager une recette </h3>
                </Button>
              </Link>
            ) : (
              <Link to="/register" className="flex">
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
            className="p-2 justify-self-end fixed top-14"
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
    </div>
  );
};
