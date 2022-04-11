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
        : user?.photoUrl + "?type=large"
    );
  }, [user]);

  const refetchMe = () => refetch();

  const [visible, setVisible] = React.useState(false);

  if (loading || !data) {
    return <Loading />;
  }

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

      <div className="fixed z-0 grid w-full pb-28 justify-items-center bgColorHeaderProfil mt-16">
        <div
          className="absolute w-32 h-32 transition-all duration-150 ease-linear rounded-full cursor-pointer md:h-40 md:w-40"
          onClick={() => setShowModalImage(true)}
        >
          {!!!userImage && (
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
          className={`object-cover h-28 w-28 md:h-28 md:w-28 mt-1
              rounded-full | self-center`}
          // @ts-ignore
          src={userImage ? userImage : defaultImageProfil}
          alt="user profil"
          loading="lazy"
        ></img>
        <div className="flex flex-col | self-center">
          <div className="flex-inline overflow-clip overflow-hidden ...">
            <h1 className="text-2xl fontQSemibold md:text-2xl">
              {user?.username}
            </h1>
          </div>
        </div>

        <Button
          className="w-26 ease-linear transition-all duration-150 mt-2"
          type="grey"
          onClick={() => setShowModal(true)}
        >
          Paramètres
        </Button>
        <Modal
          title={"Paramètres"}
          isCenter={true}
          onClose={() => setShowModal(false)}
          show={showModal}
        >
          <ModalProfil />
        </Modal>
      </div>
      <div className="w-full flex flex-col | items-center  z-20 rounded-profil mt-56 pt-10 bg-white">
        <div className="w-5/6 mb-10 lg:w-4/6">
          {user?.isCreatorProfil && (
            <CreatorProfil parentFunction={refetch} user={user}></CreatorProfil>
          )}
          {!user?.isCreatorProfil && (
            <ExplorateurProfil
              isLoad={loading}
              parentFunction={refetch}
              recipeMadeUser={user?.recipeMadeUser}
            ></ExplorateurProfil>
          )}
          <div className="grid grid-cols-2 px-4 gap-4 | md:px-20">
            <button
              className={
                "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-green |" +
                (visible ? "outline-none border-green" : "")
              }
              onClick={() => setVisible(true)}
            >
              <div className="flex flex-row items-center gap-2">
                <img className="h-8" src={Cooking} alt="logo recette" />
                <h3 className="text-left text-lg md:text-xl">Vos recettes</h3>
              </div>
            </button>
            <button
              className={
                "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue" +
                (!visible ? "outline-none border-blue" : "")
              }
              onClick={() => setVisible(false)}
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  className="h-10"
                  src={likedIconOn}
                  alt="logo recettes favorites"
                />
                <h3 className="text-left text-lg md:text-xl">
                  Recettes favorites
                </h3>
              </div>
            </button>
          </div>

          <div className="flex flex-col mb-20 | items-center">
            <div className={"text-center" + (visible ? " hidden" : "")}>
              {!visible && (
                <div className="grid grid-cols-2 gap-2 mt-5 md:grid-cols-3 auto-rows-auto justify-items-center">
                  {isEmpty(user?.recipeFavorite) && (
                    <div
                      className={
                        "grid text-center col-span-3 w-full mb-56 mt-8 justify-items-center" +
                        (visible ? " hidden" : "")
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
                        <Button className="mt-5" type="blue">
                          Explorer des recettes
                        </Button>
                      </Link>
                    </div>
                  )}

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
              )}
            </div>
            {visible && (
              <div className="grid grid-cols-2 mt-5 sm:gap-2 md:grid-cols-3 auto-rows-auto justify-items-center">
                <CTACard
                  className="lg:mt-2 lg:mb-6"
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilPage;
