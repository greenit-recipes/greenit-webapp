import { FilterBarItem } from "pages/recipe/ListPage/Components/FilterBarItem";
import { FilterBarSearch } from "pages/recipe/ListPage/Components/FilterBarSearch";
import { Button } from "components/misc/Button";
import authService from "services/auth.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { includes, map, omit } from "lodash";

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
  const removeFilter = (value: any, key: any) => {
    let currentState = { ...currentFilters };
    currentState[key] = currentState[key].filter((x: string) => x !== value);

    setCurrentFilters(currentState);
    //setCurrentFilters(toto);
  };

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
      if (includes(state[item.name], option.value || option.title)) {
        state[item.name] = state[item.name].filter(
          (value: string) => value !== (option.value || option.title)
        );
      } else {
        state[item.name].push(option.value || option.title);
      }
    } else {
      state[item.name] = [option.value || option.title];
    }

    setCurrentFilters(state);
    setScrollOffset(0);
  };

  if (isMobile) {
    return (
      // to refacto - we can scroll in the back + we have to click again on the filter icon to see the results
      <div className="sticky top-0 z-50 bg-white w-full">
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
    <div
      className={
        isMobile ? "" : "grid grid-rows-2 justify-items-center bg-white w-full"
      }
    >
      {!isMobile && (
        <div className="flex w-10/12 self-center mt-6">
          <FilterBarSearch
            search={search}
            setSearch={setSearch}
            setCurrentFilters={setCurrentFilters}
          />
          {isLoggedIn ? (
            <Link to="/créer-une-recette" className="flex">
              <Button type="grey" className="self-center h-10 rounded-xl ml-4">
                <h3> Partager une recette </h3>
              </Button>
            </Link>
          ) : (
            <Link to="/register" className="flex">
              <Button type="grey" className="self-center h-10 rounded-xl ml-4">
                <h3> Partager une recette </h3>
              </Button>
            </Link>
          )}
        </div>
      )}
      {isMobile && (
        <button className="pt-5" onClick={() => removeFilters()}>
          <h3 className="text-sm mt-2">Supprimer tous les filtres ✕</h3>
        </button>
      )}
      <div className={isMobile ? "" : "flex justify-between w-4/5 mt-5"}>
        {filter.map((item: any, index: any) => (
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
      <div></div>
      {!isMobile && (
        <div className="flex-col w-10/12 bg-blue bg-opacity-25 rounded-lg px-4 py-2">
          <div className="flex h-8">
            <h2 className="self-center">Filtres:</h2>
            {map(omit(currentFilters, "search"), (item: any, key: any) =>
              map(item, (value, index) => (
                <div
                  className="bg-blue text-white rounded-xl px-3 py-1 flex ml-2"
                  key={index}
                >
                  <p>{value}</p>
                  <button
                    className="ml-2"
                    onClick={() => removeFilter(value, key)}
                  >
                    ✖︎
                  </button>
                </div>
              ))
            )}
          </div>
          <div>
            <button onClick={() => removeFilters()}>
              <h3 className="text-sm mt-2">Supprimer tous les filtres ✕</h3>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
