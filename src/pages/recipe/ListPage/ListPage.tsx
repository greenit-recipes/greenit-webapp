import { getObjectSession } from "helpers/session-helper";
import { map, mapValues, omit, sum } from "lodash";
import { ModalListPage } from "pages/recipe/ListPage/Components/ModalListPage";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  BackgroundImage,
  Empty,
  Footer,
  Loading,
  Navbar,
  RecipeCard
} from "../../../components";
import { RecipesQuery, useRecipesQuery } from "../../../graphql";
import useIsMobile from "../../../hooks/isMobile";
import { scrollToTop } from "../../../icons";
import { filterData } from "../../../utils";
import { FilterBar } from "./Components/FilterBar";

const RecipeListPage = () => {
  
  const cleanDataPlayload = (filter: any) =>
    mapValues(filter, function (value, key) {
      if (key === "search") return value;
      return map(value, (x) => x.value);
    });

  const sessionFilter = getObjectSession("filterListPage");
  // params trigger 2 requests before param and after getting param need to be fixed
  // @ts-ignore
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<any>({
    search: sessionFilter?.search ? sessionFilter?.search : "",
    tags: sessionFilter?.tags || [],
    category: sessionFilter?.category || [],
    difficulty: sessionFilter?.difficulty || [],
    duration: sessionFilter?.duration || [],
    numberOfIngredients: sessionFilter?.numberOfIngredients || [],
  });

  const { error, loading, data, refetch, fetchMore } = useRecipesQuery({
    fetchPolicy: "cache-first",
    variables: {
      first: 15,
      filter: {
        search: sessionFilter?.search ? sessionFilter?.search : "",
        // @ts-ignore
        tags: sessionFilter?.tags ? map(sessionFilter?.tags, "value") : [],
        // @ts-ignore
        category: sessionFilter?.category
          ? map(sessionFilter?.category, "value")
          : [],
        difficulty: sessionFilter?.difficulty
          ? map(sessionFilter?.difficulty, "value")
          : [],
        duration: sessionFilter?.duration
          ? map(sessionFilter?.duration, "value")
          : [],
        numberOfIngredients: sessionFilter?.numberOfIngredients
          ? map(sessionFilter?.numberOfIngredients, "value")
          : [],
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const isMobile = useIsMobile();

  const [toggle, setToggle] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (!loading && !isFirstLoading) {
      // to avoid a second request with state of filter
      const filterValue = cleanDataPlayload(currentFilters);
      window.sessionStorage.setItem(
        "filterListPage",
        JSON.stringify(currentFilters)
      );
      refetch({ filter: filterValue });
      return;
    }
    if (!loading) setIsFirstLoading(false);
  }, [currentFilters, loading]);

  const [isShowModal, setIsShowModal] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const recipes = data?.allRecipes?.edges || [];
  const hasMore = data?.allRecipes?.pageInfo.hasNextPage || false;
  const refs = data?.allRecipes?.edges?.reduce(
    (acc: any, value: any, key: any) => {
      acc[key] = React.createRef();
      return acc;
    },
    {}
  );

  const saveIndexScroll = (index: number) => {
    window.sessionStorage.setItem(
      "indexScrollListPage",
      JSON.stringify(index)
    );
  }

  const handleClick = (id: number) => {
    return refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  
  const nbrFilter = sum(map(omit(currentFilters, "search"), (x) => x?.length));
  return (
    <div className={""}>
      <Navbar />
      <BackgroundImage />
      <Helmet>
        <title>Recettes DIY : Cosmétiques, produits ménagers | Greenit</title>
        <meta
          name="description"
          content="Découvrez nos recettes 100 % naturelles partagées par la communauté : cosmétique maison, produits ménagers, produit bien-être, santé, maquillage. Fabriquez vos produits d’hygiène !"
        />
      </Helmet>
      {!isMobile && (
        <FilterBar
          filter={filterData}
          currentFilters={currentFilters}
          setCurrentFilters={setCurrentFilters}
          isMobile={isMobile}
          toggle={toggle}
          setScrollOffset={setScrollOffset}
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
            />
          </div>
          <ModalListPage
            nbrFilter={nbrFilter}
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
            />
          </ModalListPage>
        </div>
      )}
      <div className="flex justify-center">
        <div className="h-auto max-w-7xl justify-items-center | top-0 mb-20 sm:p-4 flex flex-col items-center">
          {/* to refacto infinite scroll*/}
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<Loading isForLoadingPage={false} />}
            scrollThreshold={0.5}
            endMessage={
              recipes?.length > 0 && (
                <div className="text-center font-light">
                  <div>Tu as tout vu ! </div>
                </div>
              )
            }
            next={() => {
              fetchMore({
                variables: {
                  filter: cleanDataPlayload(currentFilters),
                  after: data?.allRecipes?.pageInfo?.endCursor,
                  first: 10,
                },
                updateQuery: (prev, next) => {
                  const fetchMoreResult = next.fetchMoreResult as
                    | RecipesQuery
                    | undefined;
                  if (!fetchMoreResult) {
                    return data?.allRecipes;
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
                {recipes?.map((recipe, index) => {
                  return (
                    <div ref={refs[index]} key={index}>
                      <RecipeCard onClickFunctionListPage={saveIndexScroll} index={index + 1} recipe={recipe?.node} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-items-center | py-4 px-8 mb-14">
                <div className="flex flex-wrap justify-center gap-y-10 gap-x-4">
                  {recipes?.map((recipe, index) => (
                    <div ref={refs[index]} key={index}>
                      <RecipeCard onClickFunctionListPage={saveIndexScroll} index={index + 1} recipe={recipe?.node} />
                    </div>
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
        alt="scroll to top"
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
