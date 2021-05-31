import React, { useEffect, useState } from "react";
import { RecipeCard, Navbar, Footer } from "../../components";
import useIsMobile from "../../hooks/isMobile";
import { useRecipesQuery, useRecipeFilterQuery } from "../../graphql";
import { Loading } from "../../components";

const RecipeListPage = () => {
  const { error, loading, data, refetch } = useRecipesQuery();
  const { loading: loadingFilter, data: filterData } = useRecipeFilterQuery();
  const isMobile = useIsMobile();
  const [currentFilters, setCurrentFilters] = useState<any>({});
  useEffect(() => {
    const filter = { ...currentFilters };
    if (filter.categoryTag) {
      filter.tags = filter.tags
        ? [filter.tags, filter.categoryTag]
        : [filter.categoryTag];
    }
    delete filter.categoryTag;
    console.log(filter)
    refetch({
      filter,
    });
  }, [currentFilters, refetch]);

  if (loading || !data || loadingFilter || !filterData) {
    return <Loading />;
  }

  const recipes = data.allRecipes;
  const { filter } = filterData;
  return (
    <>
      {!isMobile && <Navbar />}
      <div className="flex pt-10 items-start">
        {/* SIDEBAR
          TODO: FIX not showing full filterbar on scroll cause sticky
          */}
        {!isMobile && (
          <div className=" py-12 top-12 w-1/10 pl-10">
            <h1 className="text-2xl">Filter</h1>
            {filter.map((item: any) => (
              <div className="pt-5">
                {currentFilters["category"] === item.value ? (
                  <h1 className="text-xl text-black">{item.title}</h1>
                ) : (
                  <h1 className="text-xl text-gray-600">{item.title}</h1>
                )}
                {item.options.map(
                  (option: { title: string; value: string }) => (
                    <div className="text-lg pt-1 cursor-pointer">
                      {currentFilters[item.name] === option.value ||
                      currentFilters.categoryTag === option.value ||
                      currentFilters.tags?.some(
                        (item: string) => item === option.value
                      ) ? (
                        <h3
                          className="text-black"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentFilters((prevState: any) => {
                              const state: { [k: string]: any } = {
                                ...prevState,
                              };
                              if (item.name === "additional_categories") {
                                if (state.tags && state.tags.length > 1) {
                                  state.tags = state.tags.filter(
                                    (tag: string) => tag !== option.value
                                  );
                                } else {
                                  delete state.tags;
                                }
                              } else if (!item.value) {
                                delete state[item.name];
                              } else {
                                delete state.category;
                                delete state.categoryTag;
                              }
                              return state;
                            });
                          }}
                        >
                          {option.title}
                        </h3>
                      ) : (
                        <h3
                          className="text-gray-500"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentFilters((prevState: any) => {
                              const state: { [k: string]: string } = {
                                ...prevState,
                                ...(item.value
                                  ? {
                                      category: item.value,
                                      categoryTag: option.value,
                                    }
                                  : {}),
                                ...(item.name === "additional_categories"
                                  ? { tags: [option.value] }
                                  : {}),
                                ...(item.name === "duration"
                                  ? { duration: option.value }
                                  : {}),
                                ...(item.name === "difficulty"
                                  ? { difficulty: option.value }
                                  : {}),
                              };
                              return state;
                            });
                          }}
                        >
                          {option.title}
                        </h3>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
        {/* CONTENT */}
        <div className="h-auto w-full | sticky top-0 pb-20">
          <div className="w-auto | flex flex-row flex-wrap gap-10 | py-10 lg:px-0 | justify-center">
            {recipes?.map((recipe, index) => (
              <RecipeCard recipe={recipe ?? undefined} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default RecipeListPage;
