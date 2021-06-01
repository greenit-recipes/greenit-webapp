import React, { useEffect, useState } from "react";
import { RecipeCard, Navbar, Footer } from "../../components";
import useIsMobile from "../../hooks/isMobile";
import { useRecipesQuery, useRecipeFilterQuery } from "../../graphql";
import { Loading } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipeListPage = () => {
  const { error, loading, data, refetch, fetchMore } = useRecipesQuery({
    variables: {
      first: 10,
    },
  });
  const { loading: loadingFilter, data: filterData } = useRecipeFilterQuery();
  const isMobile = useIsMobile();
  const [currentFilters, setCurrentFilters] = useState<any>({});
  useEffect(() => {
    refetch({ filter: currentFilters });
  }, [currentFilters, refetch]);

  if (loading || !data || loadingFilter || !filterData) {
    return <Loading />;
  }
  const recipes = data.allRecipes?.edges || [];
  const hasMore = data.allRecipes?.pageInfo.hasNextPage || false;
  const { filter } = filterData;
  return (
    <>
      {!isMobile && <Navbar />}
      <div className="flex pt-10 items-start">
        {/* SIDEBAR
          TODO: FIX not showing full filterbar on scroll cause sticky
          */}
        {!isMobile && (
          <div className="py-12 top-12 w-1/10 pl-10">
            <h1 className="text-2xl">Filter</h1>
            {filter.map((item: any) => (
              <div className="pt-5">
                <h1 className="text-xl text-gray-600 mb-2">{item.title}</h1>
                {item.options.map(
                  (option: { title: string; value: string }) => {
                    const isSelected =
                      currentFilters[item.name] === option.value;
                    return (
                      <div className="text-lg mb-1 cursor-pointer">
                        <h3
                          className={
                            isSelected ? "text-black" : "text-gray-600"
                          }
                          onClick={() => {
                            setCurrentFilters((prevState: any) => {
                              const state = { ...prevState };
                              if (!isSelected) {
                                state[item.name] = option.value;
                              } else {
                                delete state[item.name];
                              }
                              return state;
                            });
                          }}
                        >
                          {option.title}
                        </h3>
                      </div>
                    );
                  }
                )}
              </div>
            ))}
          </div>
        )}
        {/* CONTENT */}
        <div className="h-auto w-full | sticky top-0 pb-20">
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            next={() => {
              fetchMore({
                variables: {
                  filter: currentFilters,
                  after: recipes[recipes.length - 1]?.cursor || "",
                  first: 10,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return prev;
                  }
                  //@ts-ignore
                  const newEdges = fetchMoreResult.allRecipes.edges;
                  //@ts-ignore
                  const pageInfo = fetchMoreResult.allRecipes.pageInfo;
                  return {
                    allRecipes: {
                      //@ts-ignore
                      edges: [...prev.allRecipes.edges, ...newEdges],
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
        </div>
      </div>
      <Footer />
    </>
  );
};
export default RecipeListPage;
