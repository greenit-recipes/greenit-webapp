import React, { useEffect, useState } from "react";
import { RecipeCard, Navbar, Footer, Empty } from "../../components";
import useIsMobile from "../../hooks/isMobile";
import {
  useRecipesQuery,
  useRecipeFilterQuery,
  RecipesQuery,
} from "../../graphql";
import { Loading } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { filterIcon } from "../../icons";

interface FilterBarProps {
  filter: Record<string, any>;
  currentFilters: Record<string, any>;
  setCurrentFilters: (filter: Record<string, any>) => void;
  isMobile?: boolean;
  toggle?: boolean;
}

interface FilterBarItem {
  item: Record<string, any>;
  handleFilter: (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>
  ) => void;
  currentFilters: Record<string, any>;
}

const FilterBarItem: React.FC<FilterBarItem> = ({
  item,
  handleFilter,
  currentFilters,
}) => {
  return (
    <div className="lg:pt-5 mb-5 content-center text-center lg:text-left">
      <h1 className="text-2xl text-gray-600 mb-2">{item.title}</h1>
      {item.options.map((option: { title: string; value: string }) => {
        const isSelected = currentFilters[item.name] === option.value;
        return (
          <div className="text-xl mb-2 cursor-pointer">
            <h3
              className={
                isSelected ? "text-black bold italic" : "text-gray-600"
              }
              onClick={() => {
                handleFilter(isSelected, option, item);
              }}
            >
              {option.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  currentFilters,
  setCurrentFilters,
  isMobile,
  toggle,
}) => {
  const handleFilter = (
    isSelected: boolean,
    option: { title: string; value: string },
    item: Record<string, any>
  ) => {
    setCurrentFilters((prevState: Record<string, any>) => {
      const state = { ...prevState };
      if (!isSelected) {
        state[item.name] = option.value;
      } else {
        delete state[item.name];
      }
      return state;
    });
  };

  if (isMobile) {
    return (
      <div
        className={`z-10 bg-white ${
          toggle ? "filterBar_fadeIn" : "filterBar_fadeOut"
        } fixed min-w-screen min-h-screen flex flex-col items-center`}
      >
        <h1 className="text-2xl mb-5">Filter</h1>
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
    );
  }
  return (
    <div className="py-12 top-12 w-1/10 pl-10">
      <h1 className="text-2xl mb-5">Filter</h1>
      {filter.map((item: any) => (
        <FilterBarItem
          item={item}
          currentFilters={currentFilters}
          handleFilter={handleFilter}
        />
      ))}
    </div>
  );
};

const RecipeListPage = () => {
  const params = new URLSearchParams(window.location.search);
  const { error, loading, data, refetch, fetchMore } = useRecipesQuery({
    variables: {
      first: 10,
      filter: { search: params.get("search") || "" },
    },
  });
  const { loading: loadingFilter, data: filterData } = useRecipeFilterQuery();
  const isMobile = useIsMobile();
  const [currentFilters, setCurrentFilters] = useState<any>({
    search: params.get("search") || "",
  });
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (!loading) {
      refetch({ filter: currentFilters });
    }
  }, [currentFilters, refetch]);
  if (loading || !data || loadingFilter || !filterData) {
    return <Loading />;
  }
  const recipes = data.allRecipes?.edges || [];
  const hasMore = data.allRecipes?.pageInfo.hasNextPage || false;
  const { filter } = filterData;
  return (
    <div className={isMobile && toggle ? "overflow-hidden fixed" : ""}>
      <Navbar />
      {isMobile && (
        <FilterBar
          filter={filter}
          currentFilters={currentFilters}
          setCurrentFilters={setCurrentFilters}
          isMobile={isMobile}
          toggle={toggle}
        />
      )}
      <div className="flex lg:mt-10 items-start">
        {!isMobile && (
          <FilterBar
            filter={filter}
            currentFilters={currentFilters}
            setCurrentFilters={setCurrentFilters}
            isMobile={isMobile}
            toggle={toggle}
          />
        )}
        <div className="h-auto w-full | sticky top-0 pb-20 flex flex-col items-center">
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<></>}
            next={() => {
              fetchMore({
                variables: {
                  filter: currentFilters,
                  after: recipes[recipes.length - 1]?.cursor || "",
                  first: 10,
                },
                updateQuery: (prev, next) => {
                  const fetchMoreResult = next.fetchMoreResult as
                    | RecipesQuery
                    | undefined;
                  if (!fetchMoreResult) {
                    return prev;
                  }
                  const newEdges = fetchMoreResult?.allRecipes?.edges;
                  const pageInfo = fetchMoreResult?.allRecipes?.pageInfo;
                  return {
                    allRecipes: {
                      edges: [
                        ...((prev as RecipesQuery | undefined)?.allRecipes
                          ?.edges || []),
                        ...(newEdges || []),
                      ],
                      pageInfo,
                    },
                  };
                },
              });
            }}
          >
            <div className="w-auto | flex flex-row flex-wrap gap-10 | py-10 lg:px-0 | justify-center">
              {recipes?.map((recipe, index: number) => (
                <RecipeCard recipe={recipe?.node} key={index} />
              ))}
            </div>
          </InfiniteScroll>
          {recipes?.length === 0 && <Empty />}
        </div>
      </div>

      {isMobile && (
        <img
          src={filterIcon}
          className="fixed bottom-10 right-10 z-20 h-16 w-16"
          onClick={(e) => {
            e.stopPropagation();
            setToggle((prevState) => !prevState);
          }}
        />
      )}
      <Footer />
    </div>
  );
};
export default RecipeListPage;
