import { getObjectSession } from "helpers/session-helper";
import { isEmpty, map, mapValues, omit, sum } from "lodash";
import { ModalListPage } from "pages/recipe/ListPage/Components/ModalListPage";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import {
  BackgroundImage,
  Empty,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
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
  const params = new URLSearchParams(window.location.search);
  const history = useHistory()

  const sessionFilter = getObjectSession("filterListPage");
  const searchSession = sessionFilter?.search ? sessionFilter?.search : ""
  const tagsSession =  sessionFilter?.tags || []
  const categorySession = sessionFilter?.category || []

  const getAndDeleteParamsUrl = (urlParams: string) => {
    // For SEO url (delete url after search google)
    if (!params.get(urlParams)) return
    const currentParams = params.get(urlParams);
    params.delete(urlParams)
    history.replace({
      search: params.toString(),
    })

    if (urlParams === "search") {
      window.sessionStorage.setItem(
        "filterListPage",
        JSON.stringify({ [urlParams] : currentParams})
      );
      return currentParams
    }
    window.sessionStorage.setItem(
      "filterListPage",
      JSON.stringify({ [urlParams] : [{ title: currentParams, value: currentParams }]})
    );
    return ([{ title: currentParams, value: currentParams }]);
  }

  // params trigger 2 requests before param and after getting param need to be fixed
  // @ts-ignore
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<any>({
    search: params.get("search") ? getAndDeleteParamsUrl("search") : searchSession,
    tags: params.get("tags") ? getAndDeleteParamsUrl("tags") : tagsSession,
    category: params.get("category") ? getAndDeleteParamsUrl("category") : categorySession,
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
    window.scrollTo(0, 0);
  }, []);

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
        <div className="z-30 grid py-2 bg-white justify-items-center">
          <div className="self-center w-4/5">
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
                <div className="font-light text-center">
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
              <div className="grid justify-center grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
                {recipes?.map((recipe) => {
                  return <div key={recipe?.node?.id}><RecipeCard recipe={recipe?.node} /></div>;
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-items-center | py-1-4 px-8 mb-14">
                <div className="flex flex-wrap justify-center gap-y-10 gap-x-4">
                  {recipes?.map((recipe) => (
                    <div key={recipe?.node?.id}><RecipeCard recipe={recipe?.node} /></div>
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
        className="fixed z-20 w-12 h-12 cursor-pointer bottom-6 right-4"
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
