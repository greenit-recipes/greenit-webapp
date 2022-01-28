import { includes, map, mapValues } from "lodash";
import { ModalListPage } from "pages/recipe/ListPage/Components/ModalListPage";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import {
  Empty, Footer, Loading, Navbar, RecipeCard
} from "../../../components";
import { RecipesQuery, useRecipesQuery } from "../../../graphql";
import useIsMobile from "../../../hooks/isMobile";
import { scrollToTop } from "../../../icons";
import { filterData } from "../../../utils";
import { FilterBar } from "./Components/FilterBar";

const RecipeListPage = () => {
  const params = new URLSearchParams(window.location.search);
  const history = useHistory();

  const cleanDataPlayload = (filter: any) =>
    mapValues(filter, function (value, key) {
      if (key === "search") return value;
      return map(value, (x) => x.value);
    });

  // params trigger 2 requests before param and after getting param need to be fixed
  const [currentFilters, setCurrentFilters] = useState<any>({
    search: params.get("search") ? params.get("search") : "",
    tags: params.get("tags")
      ? [{ title: params.get("tags"), value: params.get("tags") }]
      : [],
    category: params.get("category")
      ? [{ title: params.get("category"), value: params.get("category") }]
      : [],
    difficulty: [],
    duration: [],
    numberOfIngredients: [],
  });

  const { error, loading, data, refetch, fetchMore } = useRecipesQuery({
    fetchPolicy: "network-only",
    variables: {
      first: 15,
      filter: {
        search: params.get("search") ? params.get("search") : "" ,
          // @ts-ignore
        tags: [params.get("tags")],
            // @ts-ignore
        category: [params.get("category")],
        difficulty: [],
        duration: [],
        numberOfIngredients: [],
      },
    },
  });

  const isMobile = useIsMobile();
  useEffect(() => {
    history.listen((prev: any) => {
      if (includes(prev?.pathname, "/recipes")) {
        console.log("PASSE dans le reload !")
        window.location.reload();
      }
    });
  }, [history]);

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
      const filterValue = cleanDataPlayload(currentFilters);
      //localStorage.setItem("filterListPage", JSON.stringify(currentFilters));
      refetch({ filter: filterValue });
    }
  }, [currentFilters, refetch, loading]);

  const [isShowModal, setIsShowModal] = useState(false);

  if (loading || !data) {
    return <Loading />;
  }
  const recipes = data.allRecipes?.edges || [];
  const hasMore = data.allRecipes?.pageInfo.hasNextPage || false;

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
        <div className="grid justify-items-center bg-white py-2 z-30">
          <div className="w-4/5 self-center">
            <FilterBar
              isOnlyForSearch={true}
              filter={filterData}
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
              isMobile={isMobile}
              toggle={toggle}
              setScrollOffset={setScrollOffset}
              params={params}
            />
          </div>
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
        </div>
      )}
      <div className="flex justify-center">
        <div className="h-auto max-w-7xl justify-items-center | top-0 mb-20 sm:p-4 flex flex-col items-center">
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<></>}
            scrollThreshold={0.7}
            next={() => {
              fetchMore({
                variables: {
                  filter: cleanDataPlayload(currentFilters),
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
        className="fixed bottom-6 
        right-4 z-20 h-12 w-12 cursor-pointer"
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
