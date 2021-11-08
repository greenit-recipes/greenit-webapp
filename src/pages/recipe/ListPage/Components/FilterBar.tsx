import { FilterBarItem } from "./FilterBarItem";
import { FilterBarSearch } from "./FilterBarSearch";
import React, { useEffect, useState } from "react";

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
        <div className="overflow-y-scroll">
          <div
            className={`z-10 bg-white ${
              toggle ? "filterBar_fadeIn" : "filterBar_fadeOut"
            } flex flex-col items-center`}
          >
            <FilterBarSearch
              setCurrentFilters={setCurrentFilters}
              search={search}
              setSearch={setSearch}
            />
            <div className="grid grid-cols-2 w-screen">
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
      );
    }
    return (
      <div className="py-12 top-12 w-1/10 pl-10">
        <FilterBarSearch
          search={search}
          setSearch={setSearch}
          setCurrentFilters={setCurrentFilters}
        />
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