import { useQuery } from "@apollo/client";
import { RouteName } from "App";
import "App.css";
import { Button, Loading, RecipeCard } from "components";
import { CreatorProfil } from "./CreatorProfil";
import { getImagePath } from "helpers/image.helper";
import { defaultImageProfil, likedIconOff } from "icons";
import { isEmpty } from "lodash";
import { ModalImageProfil } from "pages/Profil/ModalImageProfil";
import { Modal } from "pages/Profil/ModalProfil";
import { CTACard } from "pages/recipe/ListPage/Components/CTACard";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ME } from "services/auth.service";
import { Container, Footer, Navbar } from "../../components";

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
    fetchPolicy: "no-cache",
  });

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
    setImage(user?.imageProfile ? getImagePath(user?.imageProfile) : user?.photoUrl+ "?type=large" );
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

      <Container
        className="flex flex-col | items-center | mt-8 md:mt-20"
        padding
      >
        <div className="grid grid-cols-2 gap-4 mb-8 md:mb-20">
          <div className="grid justify-items-center bg-transparent h-32 w-32 md:h-40 md:w-40 rounded-full border-2 border-transparent hover:border-gray-400">
            <ModalImageProfil
              hasImageProfile={!!userImage}
              parentFunction={refetch}
            />
            <img
              className={`object-cover h-32 w-32 md:h-36 md:w-36
              rounded-full | self-center`}
              // @ts-ignore
              src={userImage ? userImage : defaultImageProfil}
              alt="user profil"
              loading="lazy"
            ></img>
          </div>
          <div className="flex flex-col | self-center">
            <div className="flex-inline overflow-clip overflow-hidden ...">
              <h2 className="text-xl md:text-2xl">{user?.username}</h2>
            </div>
            <Modal />
          </div>
        </div>
      </Container>
      {user?.isCreatorProfil && ( <CreatorProfil user={user}></CreatorProfil> ) }
      <div className="grid grid-cols-2 px-4 gap-4 | md:px-20">
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue" +
            (!visible ? "outline-none border-blue" : "")
          }
          onClick={() => setVisible(false)}
        >
          <h3 className=" md:text-2xl">Recettes favorites</h3>
        </button>
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-green |" +
            (visible ? "outline-none border-green" : "")
          }
          onClick={() => setVisible(true)}
        >
          <h3 className=" md:text-2xl">Vos recettes</h3>
        </button>
      </div>

      <div className="flex flex-col mb-20 | items-center">
        <div className={"text-center" + (visible ? " hidden" : "")}>
          {!visible && (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 auto-rows-auto justify-items-center mt-5">
              {isEmpty(user?.recipeFavorite) && (
                <div
                  className={
                    "grid text-center col-span-3 w-full mb-56 mt-8 justify-items-center" +
                    (visible ? " hidden" : "")
                  }
                >
                  <h2 className=" md:text-2xl">
                    Tu n'as pas encore de recette favorite
                  </h2>
                  <h3 className=" md:text-xl mt-4">
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
                    className="col-span-1 w-full sm:mb-6 justify-center"
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
          <div className="grid grid-cols-2 sm:gap-2 md:grid-cols-3 auto-rows-auto justify-items-center mt-5">
            <CTACard
              className="lg:mt-2 lg:mb-6"
              type="blue"
              link={RouteName.createRecipe}
            >
              <button id="Share_a_recipe" className="w-11/12 lg:w-10/12">
                <h2 className="text-center text-lg lg:text-xl text-white mt-28 lg:mt-36">
                  Publier une nouvelle recette
                </h2>
              </button>
            </CTACard>
            {user?.recipeAuthor?.map((recipe: any, index: any) => (
              <>
                <div
                  key={index}
                  className="col-span-1 w-full mb-6 md:mb-12 justify-center"
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

      <Footer />
    </div>
  );
};

export default ProfilPage;
