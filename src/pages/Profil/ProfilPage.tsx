import { useQuery } from "@apollo/client";
import "App.css";
import { Button, Loading, RecipeCard } from "components";
import { getImagePath } from "helpers/image.helper";
import { defaultImageProfil } from "icons";
import { isEmpty } from "lodash";
import { ModalImageProfil } from "pages/Profil/ModalImageProfil";
import { Modal } from "pages/Profil/ModalProfil";
import { CTACard } from "pages/recipe/ListPage/Components/CTACard";
import React, { useEffect, useState } from "react";
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
    setImage(getImagePath(user?.imageProfile));
  }, [user]);

  const refetchMe = () => refetch();

  const [visible, setVisible] = React.useState(false);

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Container
        className="flex flex-col | items-center | mt-8 md:mt-20"
        padding
      >
        <div className="grid grid-cols-2 gap-4 mb-8 md:mb-20">
          <div className="grid justify-items-center bg-transparent h-32 w-32 md:h-40 md:w-40 rounded-full border-2 border-transparent hover:border-gray-400">
            <ModalImageProfil hasImageProfile={!!userImage} parentFunction={refetch} />
            <img
              className={`object-cover h-32 w-32 md:h-36 md:w-36
              rounded-full | self-center`}
              // @ts-ignore
              src={userImage ? userImage : defaultImageProfil}
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

      <div className="grid grid-cols-2 px-4 gap-4 | md:px-20">
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue" +
            (!visible ? "outline-none border-blue" : "")
          }
          onClick={() => setVisible(false)}
        >
          <h3 className="text-base md:text-2xl">Recettes favorites</h3>
        </button>
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-green |" +
            (visible ? "outline-none border-green" : "")
          }
          onClick={() => setVisible(true)}
        >
          <h3 className="text-base md:text-2xl">Vos recettes</h3>
        </button>
      </div>

      <div className="flex flex-col mb-20 | items-center">
        <div className={"text-center" + (visible ? " hidden" : "")}>
          {!visible && (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 auto-rows-auto justify-items-center mt-5">
              {isEmpty(user?.recipeFavorite) && (
                <div
                  className={
                    "grid text-center col-span-3 w-2/3 mb-56 mt-8 justify-items-center" +
                    (visible ? " hidden" : "")
                  }
                >
                  <h3 className="text-base md:text-2xl">
                    Tu n'as pas de recette favorite
                  </h3>
                  <Link to="/recipes">
                    <Button className="mt-5" type="blue">
                      Explorer des recettes
                    </Button>
                  </Link>
                </div>
              )}

              {user?.recipeFavorite?.map((recipe: any, index: any) => (
                <>
                  <div key={index} className="col-span-1 w-full sm:mb-6 justify-center">
                    <RecipeCard
                      parentFunction={refetchMe}
                      recipe={recipe}
                      isRefetchData={true}
                      key={index}
                      inCarousel={false}
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
              link="/créer-une-recette"
            >
              <h1 className="w-11/12 text-center text-xl lg:text-2xl text-white mt-24 lg:mt-40">
                Publier une nouvelle recette
              </h1>
            </CTACard>
            {user?.recipeAuthor?.map((recipe: any, index: any) => (
              <>
                <div key={index} className="col-span-1 w-full mb-6 md:mb-12 justify-center">
                  <RecipeCard
                    parentFunction={refetchMe}
                    disabledFavoriteRecipe={true}
                    recipe={recipe}
                    key={index}
                    isProfilPage={true}
                    inCarousel={false}
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
