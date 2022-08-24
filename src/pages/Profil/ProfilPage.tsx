import { useQuery } from "@apollo/client";
import { RouteName } from "App";
import "App.css";
import { Button, Loading, RecipeCard } from "components";
import { getImagePath } from "helpers/image.helper";
import { Cooking, defaultImageProfil, likedIconOff, likedIconOn } from "icons";
import { isEmpty } from "lodash";
import { ExplorateurProfil } from "pages/Profil/ExplorateurProfil";
import { ModalImageProfil } from "pages/Profil/ModalImageProfil";
import { CTACard } from "pages/recipe/ListPage/Components/CTACard";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ME } from "services/auth.service";
import { Footer, Navbar } from "../../components";
import { CreatorProfil } from "./CreatorProfil";
import "./Profil.css";
import Modal from "components/layout/Modal/Modal";
import { ModalProfil } from "pages/Profil/ModalProfil";
import { ProfilGreenitFullXp } from "pages/Profil/ProfilGreenitFullXp";
import { useRecipesQuery } from "../../graphql";
import TabPersonalization from "./Tabs/TabPersonalization";
import TabICM from "./Tabs/TabICM";
import TabLDC from "./Tabs/TabLDC";
import useIsMobile from "../../hooks/isMobile";

const ProfilPage: React.FC = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: "network-only",
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);

  const history = useHistory();

  if (!loading && isEmpty(data?.me)) {
    history.push({
      pathname: "/",
    });
  }
  const user = data?.me;

  // Image
  const [userImage, setImage] = useState(user?.imageProfile);

  useEffect(() => {
    setImage(
      user?.imageProfile
        ? getImagePath(user?.imageProfile)
        : user?.photoUrl + "?type=large",
    );
  }, [user]);

  const refetchMe = () => refetch();

  const isMobile = useIsMobile();

  //Tabs
  const [isDashboardActive, setIsDashboardActive] = useState(true);
  const [isParticularitiesActive, setIsParticularitiesActive] = useState(false);
  const [isICMActive, setIsICMActive] = useState(false);
  const [isLDCActive, setIsLDCActive] = useState(false);

  //Recommended Recipes
  const { data: dataHome } = useRecipesQuery({
    variables: { first: 8, filter: { category: ["Maison"] } },
  });

  if (loading || !data || !dataHome) {
    return <Loading />;
  }

  const dataHomes = dataHome.allRecipes?.edges || [];

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <title>Espace personnel DIY | Vos recettes maison favorites</title>
        <meta
          name="description"
          content="Dans votre espace personnel Greenit, vous pouvez enregistrer vos recettes maison et accéder à vos recettes déjà publiées. Il suffit de vous créer un compte !"
        />
      </Helmet>

      <div className="fixed z-0 grid w-full pb-28 space-y-4 justify-items-center bgColorHeaderProfil">
        <div className="flex space-x-4 md:space-x-10 mt-20">
          <div
            className="absolute w-32 h-32 transition-all duration-150 ease-linear rounded-full cursor-pointer md:h-40 md:w-40"
            onClick={() => setShowModalImage(true)}
          >
            {!userImage && (
              <div className="grid items-center w-full h-full rounded-full justify-items-center">
                <h2 className="p-2 text-xs bg-white opacity-75 text-grey-700 rounded-3xl">
                  Ajoute ta photo
                </h2>
              </div>
            )}
          </div>
          <Modal
            title={"Change ta photo"}
            isCenter={true}
            onClose={() => setShowModalImage(false)}
            show={showModalImage}
          >
            <ModalImageProfil
              parentFunction={refetch}
              parentFunctionOpenModal={setShowModalImage}
            />
          </Modal>
          <img
            className={`object-cover h-24 w-24 border-2 border-white md:h-26 md:w-26 mt-1
              rounded-full | self-center`}
            // @ts-ignore
            src={userImage ? userImage : defaultImageProfil}
            alt="user profil"
            loading="lazy"
          ></img>
          <div className="flex flex-col | self-center font-medium">
            <div className="flex-inline overflow-clip overflow-hidden ...">
              <h1 className="fontQSemibold text-xl md:text-2xl">
                {user?.username}
              </h1>
            </div>

            <span
              className="text-xs lg:text-base hover:cursor-pointer text-darkBlue underline decoration-solid"
              onClick={() => setShowModal(true)}
            >
              Paramètres
            </span>
            <Modal
              title={"Paramètres"}
              isCenter={true}
              onClose={() => setShowModal(false)}
              show={showModal}
            >
              <ModalProfil />
            </Modal>
          </div>
        </div>
        {user?.isCreatorProfil && (
          <CreatorProfil parentFunction={refetch} user={user}></CreatorProfil>
        )}
      </div>
      <div
        className={`w-full flex flex-col | items-center z-20 rounded-profil bg-white ${
          user?.isCreatorProfil ? "mt-72" : "mt-40"
        }`}
      >
        {/* Tabs */}
        {/*Todo: Refactor Menu*/}
        <div className="w-full flex justify-around items-center | mb-2">
          <div
            id="profil-carnettab"
            className={`flex justify-center md:items-center md:space-x-2 w-1/4 ${
              isDashboardActive
                ? "border-l-2 border-b-4 border-l-white border-b-darkBlue shadow-xl "
                : "border-b-4 border-greyL"
            } py-2 | cursor-pointer`}
            onClick={() => {
              !isDashboardActive && setIsDashboardActive(!isDashboardActive);
              isParticularitiesActive &&
                setIsParticularitiesActive(!isParticularitiesActive);
              isICMActive && setIsICMActive(!isICMActive);
              isLDCActive && setIsLDCActive(!isLDCActive);
            }}
          >
            <i
              className={`bx ${
                isDashboardActive
                  ? "bxs-bookmark-heart text-blue"
                  : "bx-bookmark-heart"
              } text-3xl`}
            ></i>
            {!isMobile && <h4 className="text-md">Mon carnet de recettes</h4>}
          </div>
          <div
            id="profil-particularitestab"
            className={`flex justify-center md:items-center md:space-x-2 w-1/4  ${
              isParticularitiesActive
                ? "border-l-2 border-b-4 border-l-white border-b-darkBlue shadow-xl "
                : "border-b-4 border-greyL"
            } py-2 | cursor-pointer`}
            onClick={() => {
              !isParticularitiesActive &&
                setIsParticularitiesActive(!isParticularitiesActive);
              isDashboardActive && setIsDashboardActive(!isDashboardActive);
              isICMActive && setIsICMActive(!isICMActive);
              isLDCActive && setIsLDCActive(!isLDCActive);
            }}
          >
            <i
              className={`bx ${
                isParticularitiesActive
                  ? "bxs-category-alt text-green"
                  : "bx-category-alt"
              } text-3xl`}
            ></i>
            {!isMobile && <h4 className="text-md">Mes particularités</h4>}
          </div>
          <div
            id="profil-ICMtab"
            className={`flex justify-center md:items-center md:space-x-2 w-1/4  ${
              isICMActive
                ? "border-l-2 border-b-4 border-l-white border-b-darkBlue shadow-xl "
                : "border-b-4 border-greyL"
            } py-2 | cursor-pointer`}
            onClick={() => {
              !isICMActive && setIsICMActive(!isICMActive);
              isParticularitiesActive &&
                setIsParticularitiesActive(!isParticularitiesActive);
              isDashboardActive && setIsDashboardActive(!isDashboardActive);
              isLDCActive && setIsLDCActive(!isLDCActive);
            }}
          >
            <i
              className={`bx  ${
                isICMActive ? "bxs-lemon text-blue" : "bx-lemon"
              } text-3xl`}
            ></i>
            {!isMobile && <h4 className="text-md">Ingrédients chez moi</h4>}
          </div>
          <div
            id="profil-LDCtab"
            className={`flex justify-center md:items-center md:space-x-2 w-1/4  ${
              isLDCActive
                ? "border-l-2 border-b-4 border-l-white border-b-darkBlue shadow-xl "
                : "border-b-4 border-greyL"
            } py-2 | cursor-pointer`}
            onClick={() => {
              !isLDCActive && setIsLDCActive(!isLDCActive);
              isParticularitiesActive &&
                setIsParticularitiesActive(!isParticularitiesActive);
              isICMActive && setIsICMActive(!isICMActive);
              isDashboardActive && setIsDashboardActive(!isDashboardActive);
            }}
          >
            <i
              className={`bx bx-cart-download ${
                isLDCActive && "text-blue"
              } text-3xl`}
            ></i>
            {!isMobile && <h4 className="text-md">Liste de course</h4>}
          </div>
        </div>
        <div className="w-full mb-5 pt-4">
          {isDashboardActive && (
            <>
              {/*Todo (zack) Rename Component*/}
              <ExplorateurProfil
                isLoad={loading}
                parentFunction={refetch}
                recipeMadeUser={user?.recipeMadeUser}
              ></ExplorateurProfil>

              {user?.isBeginnerBox && (
                <ProfilGreenitFullXp
                  parentFunction={refetch}
                  isRecipeMadeBeginnerBox={user?.isRecipeMadeBeginnerBox}
                ></ProfilGreenitFullXp>
              )}

              {/* Bookmarks */}
              <div className="w-full flex flex-col items-center justify-center | mt-6 mb-4">
                <div className="w-full flex items-center justify-center space-x-2">
                  <i className="bx bxs-bookmark-heart text-3xl text-blue"></i>
                  <h2 className="text-xl font-semibold">Recettes favorites</h2>
                </div>
                <span className="text-2xl font-diy">
                  Des recettes spécialement adaptées !
                </span>
              </div>
              {isEmpty(user?.recipeFavorite) && (
                <div
                  className={
                    "grid text-center col-span-3 w-full mb-10 mt-8 justify-items-center"
                  }
                >
                  <h2 className=" md:text-xl">
                    Tu n'as pas encore de recette favorite
                  </h2>
                  <h3 className="mt-4 md:text-lg">
                    Pour mettre une recette en favoris <br />
                    appuie sur le coeur de la recette
                  </h3>
                  <div>
                    <img
                      className="w-12 h-12"
                      src={likedIconOff}
                      alt="like icon off"
                    />
                  </div>
                  <Link to={RouteName.recipes}>
                    <Button
                      className="mt-5"
                      type="darkBlue"
                      id="profil-carnet-explorer"
                    >
                      Explorer des recettes
                    </Button>
                  </Link>
                </div>
              )}
              {/*Todo : Add flex wrap in desktop view*/}
              <div className="flex justify-center w-full msm:overflow-x-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-5">
                  {user?.recipeFavorite?.map((recipe: any, index: any) => (
                    <>
                      <div
                        key={index}
                        className="justify-center w-full col-span-1 sm:mb-6"
                      >
                        <RecipeCard
                          parentFunction={refetchMe}
                          recipe={recipe}
                          isRefetchData={true}
                          key={index}
                          isProfilPage={true}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* Published recipes  */}
              <div className="w-full flex flex-col items-center justify-center | mt-6 mb-4">
                <div className="w-full flex items-center justify-center space-x-2">
                  <i className="bx bxs-pencil text-3xl"></i>
                  <h2 className="text-xl font-semibold">Recettes publiées</h2>
                </div>
                <span className="text-2xl font-diy">
                  Ta contribution à la communauté Greenit !
                </span>
              </div>
              <div className="md:flex md:justify-center w-full pt-4 pl-4 overflow-x-auto">
                <div className="flex w-max">
                  <CTACard
                    className="lg:mb-6"
                    type="blue"
                    link={RouteName.createRecipe}
                  >
                    <button id="Share_a_recipe" className="w-11/12 lg:w-10/12">
                      <h2 className="text-lg text-center text-white lg:text-xl mt-28 lg:mt-36">
                        Publier une nouvelle recette
                      </h2>
                    </button>
                  </CTACard>
                  {user?.recipeAuthor?.map((recipe: any, index: any) => (
                    <>
                      <div
                        key={index}
                        className="justify-center w-full col-span-1 mb-6 md:mb-12"
                      >
                        <RecipeCard
                          isDisplayUserBadge={false}
                          parentFunction={refetchMe}
                          disabledFavoriteRecipe={true}
                          recipe={recipe}
                          key={index}
                          isProfilPage={true}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
          {isParticularitiesActive && (
            <TabPersonalization
              ingredientAtHome={user.ingredientAtHomeUser}
              parentFunction={refetchMe}
              particularities={user.particularitySearch}
              hasParticularities={
                !isEmpty(JSON.parse(user.particularitySearch))
              }
            />
          )}
          {isICMActive && (
            <TabICM
              parentFunction={refetchMe}
              hasICM={user?.ingredientAtHomeUser.length > 0}
              ingredientsAtHome={user.ingredientAtHomeUser}
            />
          )}
          {isLDCActive && (
            <TabLDC
              user={user}
              parentFunction={refetchMe}
              hasLDC={user?.ingredientShoppingListUser.length > 0}
              ingredientShoppingList={user.ingredientShoppingListUser}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilPage;
