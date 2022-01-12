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
    let currentState = { ...currentFilters }
    currentState[key] = currentState[key].filter(
      (x: string) => x !== value
    
    );

    console.log("currentState", currentState)
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
    setCurrentFilters((prevState: Record<string, any>) => {
      let state = { ...prevState };
      // TO REFACTO
      if (item.name === "duration") {
        console.log("passe la")
        if (state[item.name] === (option.value || option.title)) {
          delete state[item.name];
        } else {
          state[item.name] = option.value || option.title;
        }
        return state;
      }
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
        console.log(state);
      }
      return state;
    });
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
    <div className="sticky top-0 z-50 bg-white w-full">
      <div className="flex">
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
          <Link to="/register">
            <Button
              type="green"
              className="justify-self-start mt-6 mb-2 h-10 rounded-xl"
            >
              <h3> Partager une recette </h3>
            </Button>
          </Link>
        )}
      </div>
      <div className="flex justify-between">
        {filter.map((item: any, index: any) => (
          <FilterBarItem
            item={item}
            key={index}
            currentFilters={currentFilters}
            handleFilter={handleFilter}
          />
        ))}
      </div>
      <div className="flex-col">
        <div className="flex">
          <p>Filtres:</p>
          {map(omit(currentFilters, 'search'), (item: any, key: any) => map(item, (value) => (
                        <div className="ml-6 mr-6">
                        <p key={key}>{value}</p>
                        <button onClick={() => removeFilter(value, key)}> Remove</button>
                      </div>
          )))}
        </div>
        <div>
          <div>toto</div>
          <div> -- {currentFilters.length}</div>
          <button onClick={() => removeFilters()}>Remove all filter</button>
        </div>
      </div>
    </div>
  );
};
