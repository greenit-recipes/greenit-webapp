import { useEffect, useState } from "react";
import { RecipeCard, Navbar, Footer, Empty } from "../../../components";
import useIsMobile from "../../../hooks/isMobile";
import { useRecipesQuery, RecipesQuery } from "../../../graphql";
import { Loading } from "../../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { filterIcon, scrollToTop } from "../../../icons";
import { filterData } from "../../../utils";
import { FilterBar } from "./Components/FilterBar";
import { CTACard } from "pages/recipe/ListPage/Components/CTACard";

const RecipeListPage = () => {
  const params = new URLSearchParams(window.location.search);
  const { error, loading, data, refetch, fetchMore } = useRecipesQuery({
    variables: {
      first: 10,
      filter: {
        search: params.get("search") || "",
        ...(params.get("tags") ? { tags: [params.get("tags")] } : {}),
        ...(params.get("category") ? { category: params.get("category") } : {}),
      },
    },
  });
  const isMobile = useIsMobile();
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  const [currentFilters, setCurrentFilters] = useState<any>({
    search: params.get("search") || "",
    ...(params.get("tags") ? { tags: params.get("tags") } : {}),
    ...(params.get("category") ? { category: params.get("category") } : {}),
  });
  const [toggle, setToggle] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    if (!loading) {
      refetch({ filter: currentFilters });
    }
  }, [currentFilters, refetch]);
  if (loading || !data) {
    return <Loading />;
  }
  const recipes = data.allRecipes?.edges || [];
  const hasMore = data.allRecipes?.pageInfo.hasNextPage || false;
  if (
    params.get("tags") &&
    !filterData[1].options.some((option) => option.title === params.get("tags"))
  ) {
    // @ts-ignore
    filterData[1].options.push({ title: params.get("tags") });
  }
  return (
    <div className={isMobile && toggle ? "overflow-hidden" : ""}>
      <Navbar />
      {isMobile && (
        <FilterBar
          filter={filterData}
          currentFilters={currentFilters}
          setCurrentFilters={setCurrentFilters}
          isMobile={isMobile}
          toggle={toggle}
          setScrollOffset={setScrollOffset}
          params={params}
        />
      )}
      <div className="flex lg:mt-10 items-start">
        {!isMobile && (
          <FilterBar
            filter={filterData}
            currentFilters={currentFilters}
            setCurrentFilters={setCurrentFilters}
            isMobile={isMobile}
            toggle={toggle}
            setScrollOffset={setScrollOffset}
            params={params}
          />
        )}
        <div className="h-auto w-full justify-items-center | ml-1 top-0 mb-20 sm:p-4 flex flex-col items-center">
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<Loading isForLoadingPage={false} />}
            onScroll={(e) => {
              if (!isMobile) {
                if (window.pageYOffset > 400) {
                  setShowScrollTop(true);
                } else {
                  setShowScrollTop(false);
                }
              }
            }}
            next={() => {
              fetchMore({
                variables: {
                  filter: currentFilters,
                  after: data.allRecipes?.pageInfo?.endCursor,
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
            {isMobile ? (
              <div className="w-full | flex flex-row flex-wrap md:gap-y-10 | py-10 md:ml-6 lg:px-2 ">
                {recipes?.slice(0, 4).map((recipe, index: number) => (
                  <RecipeCard recipe={recipe?.node} key={index} />
                ))}

                <div className={toggle === true ? "hidden" : ""}>
                  <CTACard type="blue" link="/profil">
                    <h1 className="w-11/12 text-center text-xl lg:text-2xl text-white mt-24 lg:mt-36">
                      Aide la communauté,
                      <br />
                      publie ta recette
                    </h1>
                  </CTACard>
                </div>

                <CTACard type="yellow" link="/register">
                  <h1 className="w-11/12 text-center text-xl lg:text-2xl text-white mt-28">
                    Trouve un atelier
                    <br />
                    près de chez toi
                  </h1>
                </CTACard>
                {recipes?.slice(4).map((recipe, index: number) => (
                  <RecipeCard recipe={recipe?.node} key={index} />
                ))}
              </div>
            ) : (
              <div className="w-auto | flex flex-row flex-wrap justify-items-center md:gap-y-10 | md:ml-6 lg:px-2 lg:py-4 mb-14">
                {recipes?.slice(0, 5).map((recipe, index: number) => (
                  <RecipeCard recipe={recipe?.node} key={index} />
                ))}
                <div className={toggle === true ? "hidden" : ""}>
                  <CTACard type="blue" link="/profil">
                    <h1 className="w-11/12 text-center text-2xl text-white mt-36">
                      Aide la communauté,
                      <br />
                      publie ta recette
                    </h1>
                  </CTACard>
                </div>

                <CTACard type="yellow" link="/register">
                  <h1 className="w-11/12 text-center text-2xl text-white lg:mt-44">
                    Trouve un atelier
                    <br />
                    près de chez toi
                  </h1>
                </CTACard>
                {recipes?.slice(5).map((recipe, index: number) => (
                  <RecipeCard recipe={recipe?.node} key={index} />
                ))}
              </div>
            )}
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
            if (!toggle) {
              setScrollOffset(window.pageYOffset);
            }
            setToggle((prevState) => !prevState);
            setTimeout(() => {
              window.scrollTo({
                top: scrollOffset,
                behavior: "smooth",
              });
            }, 100);
          }}
        />
      )}
      {showScrollTop && (
        <img
          src={scrollToTop}
          className="fixed bottom-10 right-10 z-20 h-16 w-16 cursor-pointer"
          id="scrollToTop"
          onClick={() => {
            window.scrollTo({
              top: scrollOffset,
              behavior: "smooth",
            });
          }}
        />
      )}
      <Footer />
    </div>
  );
};
export default RecipeListPage;
