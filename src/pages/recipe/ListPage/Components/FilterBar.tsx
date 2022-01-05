import { FilterBarItem } from "pages/recipe/ListPage/Components/FilterBarItem";
import { FilterBarSearch } from "pages/recipe/ListPage/Components/FilterBarSearch";
import { Button } from "components/misc/Button";
import authService from "services/auth.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    setCurrentFilters((prevState: Record<string, any>) => {
      const state = { ...prevState };
      if (!isSelected) {
        state[item.name] = option.value || option.title;
      } else {
        delete state[item.name];
      }
      return state;
    });
    setScrollOffset(0);
  };

  if (isMobile) {
    return (
      // to refacto - we can scroll in the back + we have to click again on the filter icon to see the results
      <div className="overflow-y-scroll absolute">
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
              {filter.map((item: any) => (
                <FilterBarItem
                  item={item}
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
    <div className="py-12 top-12 w-1/10 pl-10">
      <FilterBarSearch
        search={search}
        setSearch={setSearch}
        setCurrentFilters={setCurrentFilters}
      />
      {isLoggedIn ? (
        <Link to="/créer-une-recette">
          <Button
            type="green"
            className="justify-self-start mt-6 mb-2 h-10 rounded-xl"
          >
            <h3> Partager une recette </h3>
          </Button>
        </Link>
      ) : (
        <div />
      )}
      {filter.map((item: any, index: any) => (
        <FilterBarItem
          item={item}
          key={index}
          currentFilters={currentFilters}
          handleFilter={handleFilter}
        />
      ))}
    </div>
  );
};
