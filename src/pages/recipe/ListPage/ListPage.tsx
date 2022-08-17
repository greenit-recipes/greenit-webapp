import { useQuery } from "@apollo/client";
import { getObjectSession } from "helpers/session-helper";
import { map, mapValues, omit, sum } from "lodash";
import debounce from "lodash/debounce";
import { SEARCH_AUTO_COMPLETE_RECIPE } from "pages/AutocompleteRequest";
import { ModalListPage } from "pages/recipe/ListPage/Components/ModalListPage";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import {
  BackgroundImage,
  Button,
  Empty,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
} from "components";
import { RecipesQuery, useRecipesQuery } from "../../../graphql";
import useIsMobile from "hooks/isMobile";
import { scrollToTop } from "icons";
import { filterData } from "utils";
import { FilterBar } from "./Components/FilterBar";
import ModalPersonalizationInfo from "components/personalization/ModalPersonalizationInfo";
import SectionPersonalization from "components/personalization/sections/SectionPersonalization";
import SectionICM from "components/personalization/sections/SectionICM";

const RecipeListPage = () => {
  //Personalization
  const [isParticularityActive, setIsParticularityActive] = useState(false);
  const [isICMActive, setIsICMActive] = useState(false);

  //End Personalization

  const cleanDataPlayload = (filter: any) =>
    mapValues(filter, function (value, key) {
      if (key === "search") return value;
      if (key === "particularity") return;
      return map(value, x => x.value);
    });
  const params = new URLSearchParams(window.location.search);
  const history = useHistory();

  const sessionFilter = getObjectSession("filterListPage");
  const searchSession = sessionFilter?.search ? sessionFilter?.search : "";
  const tagsSession = sessionFilter?.tags || [];
  const categorySession = sessionFilter?.category || [];

  const getAndDeleteParamsUrl = (urlParams: string) => {
    // For SEO url (delete url after search google)
    if (!params.get(urlParams)) return;
    const currentParams = params.get(urlParams);
    params.delete(urlParams);
    history.replace({
      search: params.toString(),
    });

    if (urlParams === "search") {
      window.sessionStorage.setItem(
        "filterListPage",
        JSON.stringify({ [urlParams]: currentParams }),
      );
      return currentParams;
    }
    window.sessionStorage.setItem(
      "filterListPage",
      JSON.stringify({
        [urlParams]: [{ title: currentParams, value: currentParams }],
      }),
    );
    return [{ title: currentParams, value: currentParams }];
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const setSearchTermDebounced = debounce(setSearchTerm, 250);

  // Ne par run au premier lancement
  const { data: autoCompleteData, loading: autoCompleteLoading } = useQuery(
    SEARCH_AUTO_COMPLETE_RECIPE,
    {
      fetchPolicy: "network-only",
      variables: { search: searchTerm },
      skip: searchTerm ? false : true,
    },
  );
  const recipesAutoComplete = autoCompleteData?.searchAutoCompleteRecipes || {
    recipes: [],
    ingredients: [],
    totalRecipes: 0,
  };

  // params trigger 2 requests before param and after getting param need to be fixed
  // @ts-ignore
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<any>({
    search: params.get("search")
      ? getAndDeleteParamsUrl("search")
      : searchSession,
    tags: params.get("tags") ? getAndDeleteParamsUrl("tags") : tagsSession,
    category: params.get("category")
      ? getAndDeleteParamsUrl("category")
      : categorySession,
    difficulty: sessionFilter?.difficulty || [],
    particularity: [{ tagsSkin: [], tagsHair: [], tagsPeculiarity: [] }] || [], // [{ tagsSkin: ["00838ea5-bc78-4a11-a9fe-57d3e20aac71"], tagsHair: [], tagsPeculiarity: [] }],
    ingredientsAtHome:
      [
        "e1fee130-92fd-48c6-b140-1d54e4707e64",
        "19f7b6e1-b292-4b3b-bf83-9233dd221b39",
        "61ee83a6-b6a7-4460-ac8c-7d9fa9e4f8a7",
      ] || [],
    duration: sessionFilter?.duration || [],
    numberOfIngredients: sessionFilter?.numberOfIngredients || [],
  });

  console.log("currentFilters", currentFilters);

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
        // @ts-ignore
        particularity: [{ tagsSkin: [], tagsHair: [], tagsPeculiarity: [] }], // [{ tagsSkin: ["00838ea5-bc78-4a11-a9fe-57d3e20aac71"], tagsHair: [], tagsPeculiarity: [] }],
        // @ts-ignore
        ingredientsAtHome:
          [
            "e1fee130-92fd-48c6-b140-1d54e4707e64",
            "19f7b6e1-b292-4b3b-bf83-9233dd221b39",
            "61ee83a6-b6a7-4460-ac8c-7d9fa9e4f8a7",
          ] || [],
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
        JSON.stringify(currentFilters),
      );
      refetch({ filter: filterValue });
      return;
    }
    if (!loading) setIsFirstLoading(false);
  }, [currentFilters, loading]);

  const searchText = getObjectSession("filterListPage")?.search;

  const [isShowModal, setIsShowModal] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const recipes = data?.allRecipes?.edges || [];
  const hasMore = data?.allRecipes?.pageInfo.hasNextPage || false;
  const nbrFilter = sum(map(omit(currentFilters, "search"), x => x?.length));
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
      <div className="bg-greenL pt-5">
        {/*Personalization section*/}

        <div className="flex justify-center ">
          <Button
            id="listpage-mes-particularites"
            className="px-4 py-1 mr-3 mb-4 shadow-md"
            haveIcon={true}
            onClick={() => {
              setIsParticularityActive(!isParticularityActive);
              isICMActive && setIsICMActive(!isICMActive);
            }}
            type="green"
          >
            <i className="bx bxs-category-alt text-2xl mt-0.5 mr-2"></i>
            Mes particularités
          </Button>
          <Button
            id="listpage-ingredientchezmoi"
            className="mr-3 mb-4 shadow-md"
            haveIcon={true}
            onClick={() => {
              setIsICMActive(!isICMActive);
              isParticularityActive &&
                setIsParticularityActive(!isParticularityActive);
            }}
            type="darkBlue"
          >
            <i className="bx bx-lemon text-2xl mt-0.5 mr-2"></i>
            Ingrédients chez moi
          </Button>
        </div>

        {/*Paritucularities*/}
        {isParticularityActive && <SectionPersonalization />}

        {/*ICM*/}
        {isICMActive && (
          <div className="ml-5">
            <SectionICM />
          </div>
        )}

        {/*End Personalization section*/}

        {!isMobile && (
          <>
            <FilterBar
              recipesAutoComplete={recipesAutoComplete}
              setSearch={setSearchTermDebounced}
              search={searchTerm}
              filter={filterData}
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
              isMobile={isMobile}
              toggle={toggle}
              setScrollOffset={setScrollOffset}
            />
          </>
        )}

        {isMobile && (
          <div className="z-30 grid py-2 justify-items-center">
            <div className="self-center w-4/5">
              <FilterBar
                isOnlyForSearch={true}
                recipesAutoComplete={recipesAutoComplete}
                search={searchTerm}
                setSearch={setSearchTermDebounced}
                filter={filterData}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
                isMobile={isMobile}
                toggle={toggle}
                setScrollOffset={setScrollOffset}
              />
            </div>
            {searchText && searchText.length && (
              <div className="w-4/5 mt-4 border-b-1 pb-2">
                <p className="text-sm font-bold mb-1">
                  Résultat pour "{searchText}"
                </p>
              </div>
            )}
            <ModalListPage
              nbrFilter={nbrFilter}
              isShowModal={isShowModal}
              parentFunction={setIsShowModal}
            >
              <FilterBar
                filter={filterData}
                recipesAutoComplete={recipesAutoComplete}
                search={searchTerm}
                setSearch={setSearchTermDebounced}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
                isMobile={isMobile}
                toggle={toggle}
                setScrollOffset={setScrollOffset}
              />
            </ModalListPage>
          </div>
        )}
      </div>

      <div className="flex justify-center bg-white recipe-list">
        <div className="h-auto max-w-7xl justify-items-center | top-0 mb-20 sm:p-4 flex flex-col items-center">
          {/*Recommended Recipes*/}
          <div className="mt-2">
            <div className="flex text-center justify-center space-x-2 md:mb-5">
              <h3 className="text-2xl font-normal">Recettes pour vous</h3>
              <ModalPersonalizationInfo
                btn={
                  <i
                    className="bx bx-info-circle hover:text-blue text-2xl mt-1 cursor-pointer"
                    id="listpage-informations"
                  ></i>
                }
              ></ModalPersonalizationInfo>
            </div>
            {isMobile ? (
              <div className="grid justify-center grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
                {recipes?.slice(0, 4).map(recipe => {
                  return (
                    <div key={recipe?.node?.id}>
                      <RecipeCard ingredientRatio="3/5" recipe={recipe?.node} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-items-center | py-1-4 px-8 mb-14">
                <div className="flex flex-wrap justify-center gap-y-10 gap-x-4">
                  {recipes?.slice(0, 4).map(recipe => (
                    <div key={recipe?.node?.id}>
                      <RecipeCard ingredientRatio="3/5" recipe={recipe?.node} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* to refacto infinite scroll*/}
          <h3 className="text-2xl text-center font-normal | mt-12 md:mb-5">
            Découvrir d’autres recettes
          </h3>
          <InfiniteScroll
            dataLength={recipes?.length ?? 0}
            hasMore={hasMore}
            loader={<Loading isForLoadingPage={false} />}
            scrollThreshold={0.5}
            endMessage={
              recipes?.length > 0 && (
                <div className="font-light text-center">
                  <div>Tu as tout vu !</div>
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
                //@ts-ignore
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
                {recipes?.map(recipe => {
                  return (
                    <div key={recipe?.node?.id}>
                      <RecipeCard recipe={recipe?.node} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-items-center | py-1-4 px-8 mb-14">
                <div className="flex flex-wrap justify-center gap-y-10 gap-x-4">
                  {recipes?.map(recipe => (
                    <div key={recipe?.node?.id}>
                      <RecipeCard recipe={recipe?.node} />
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
