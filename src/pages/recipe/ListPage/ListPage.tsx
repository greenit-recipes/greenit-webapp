import { useEffect, useState } from "react";
import {
  RecipeCard,
  Navbar,
  Footer,
  Empty,
  SearchBar,
} from "../../../components";
import useIsMobile from "../../../hooks/isMobile";
import { useRecipesQuery, RecipesQuery } from "../../../graphql";
import { Loading } from "../../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { filterIcon, scrollToTop } from "../../../icons";
import { filterData } from "../../../utils";
import { FilterBar } from "./Components/FilterBar";
import { ModalListPage } from "pages/recipe/ListPage/Components/ModalListPage";
const RecipeListPage = () => {
  const params = new URLSearchParams(window.location.search);

  const [currentFilters, setCurrentFilters] = useState<any>({
    search: "",
    tags: [],
    category: [],
    difficulty: [],
    duration: [],
    numberOfIngredients: [],
  });

  const { error, loading, data, refetch, fetchMore } = useRecipesQuery({
    fetchPolicy: "network-only",
    variables: {
      first: 15,
      filter: {
        search: "",
        tags: [],
        category: [],
        difficulty: [],
        duration: [],
        numberOfIngredients: [],
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
  const [toggle, setToggle] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    if (!loading) {
      refetch({ filter: currentFilters });
    }
  }, [currentFilters]);

  const [isShowModal, setIsShowModal] = useState(false);

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
    <div className={""}>
      <Navbar />
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

      {isMobile && (
        <ModalListPage
         isShowModal={isShowModal}
         parentFunction={setIsShowModal}
        >
          <FilterBar
            filter={filterData}
            currentFilters={currentFilters}
            setCurrentFilters={setCurrentFilters}
            isMobile={isMobile}
            toggle={toggle}
            setScrollOffset={setScrollOffset}
            params={params}
          />
        </ModalListPage>
      )}
      <div className="flex justify-center">
        <div className="h-auto max-w-7xl  justify-items-center | top-0 mb-20 sm:p-4 flex flex-col items-center">
          {isMobile && (
            <div className="sm:w-2/5 mt-2">
              <SearchBar />
            </div>
          )}
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<></>}
            scrollThreshold={0.7}
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
                    return data.allRecipes;
                  }
                  const newEdges = fetchMoreResult?.allRecipes?.edges;
                  const pageInfo = fetchMoreResult?.allRecipes?.pageInfo;
                  return {
                    allRecipes: {
                      edges: [
                        ...((data as RecipesQuery | undefined)?.allRecipes
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
              <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 md:grid-cols-4 md:gap-x-4 justify-center md:gap-y-10">
                {recipes?.map((recipe, index) => (
                  <RecipeCard recipe={recipe?.node} key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-items-center | py-4 px-8 mb-14">
                <div className="flex flex-wrap justify-center gap-y-10 gap-x-4">
                  {recipes?.map((recipe, index) => (
                    <RecipeCard recipe={recipe?.node} key={index} />
                  ))}
                </div>
              </div>
            )}
          </InfiniteScroll>
          {recipes?.length === 0 && <Empty />}
        </div>
      </div>
      <img
        src={scrollToTop}
        className="fixed bottom-6 right-4 z-20 h-12 w-12 cursor-pointer"
        id="scrollToTop"
        onClick={() => {
          window.scrollTo({
            top: scrollOffset,
            behavior: "smooth",
          });
        }}
      />
      <Footer />
    </div>
  );
};
export default RecipeListPage;
