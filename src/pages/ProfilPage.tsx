import { useQuery } from "@apollo/client";
import { RecipeCard } from "components";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ME } from "services/auth.service";
import "../App.css";
import { Container, Footer, Navbar } from "../components";
import useIsMobile from "../hooks/isMobile";

const ProfilPage: React.FC = () => {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  // Soit il est dans le storage et c'est good

  // Soit je recois les informations pas le chemin
  const { loading, error, data } = useQuery(ME);
  const history = useHistory();

  if (!loading && isEmpty(data?.me)) {
    history.push({
      pathname: "/",
    });
  }

  const [visible, setVisible] = React.useState(false);

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Container
        className="flex flex-col | items-center | mt-8 md:mt-20"
        padding
      >
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-xs md:mb-20">
          <div className="">
            <img
              src="https://www.babelio.com/users/AVT_Albert-Einstein_407.jpeg"
              className="border-4 border-white shadow-xl | rounded-full"
              alt="photo profil"
            />
          </div>
          <div className="flex flex-col | self-center">
            <div className="flex-inline overflow-clip overflow-hidden ...">
              <h2 className="text-xl md:text-2xl">{data?.me?.username}</h2>
            </div>
            <div className="mt-3">
              <button className="text-xs bg-white text-black p-2 border-2 border-gray-600 shadow-md rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
                Paramètres
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div className="grid grid-cols-2 mb-10 px-4 gap-4 | md:px-20">
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue-400" +
            (!visible ? "outline-none border-blue-500" : "")
          }
          onClick={() => setVisible(false)}
        >
          <h3 className="text-base md:text-2xl">Recettes favorites</h3>
        </button>
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-green-600 |" +
            (visible ? "outline-none border-green-600" : "")
          }
          onClick={() => setVisible(true)}
        >
          <h3 className="text-base md:text-2xl">Vos recettes</h3>
        </button>
      </div>

      <Container className="flex flex-col mb-20 | items-center" padding>
        <div className={"bg-blue-500 text-center" + (visible ? " hidden" : "")}>
          {!visible && (
          <div>
            {!data?.me?.recipeFavorite && (
              <div
                className={
                  "bg-green-600 text-center" + (visible ? " hidden" : "")
                }
              >
                <h3 className="p-36 text-2xl">
                  Vous n'avez pas de recette favorites o
                </h3>
              </div>
            )}
            {data?.me?.recipeFavorite?.map((recipe: any, index: any) => (
              <>
                {isMobile ? (
                  <div
                    key={index}
                    className="w-full flex justify-center mb-2 pt-10"
                  >
                    <RecipeCard
                      recipe={recipe}
                      key={index}
                      inCarousel={false}
                      isProfilPage={true}
                    />
                  </div>
                ) : (
                  <RecipeCard recipe={recipe} key={index} inCarousel={false} isProfilPage={true}/>
                )}
              </>
            ))}
          </div>
        )}
        </div>
        {visible && (
          <div>
            {!data?.me?.recipeAuthor && (
              <div
                className={
                  "bg-green-600 text-center" + (!visible ? " hidden" : "")
                }
              >
                <h3 className="p-36 text-2xl">
                  Vous n'avez pas de recette pour l'instant
                </h3>
              </div>
            )}
            {data?.me?.recipeAuthor?.map((recipe: any, index: any) => (
              <>
                {isMobile ? (
                  <div
                    key={index}
                    className="w-full flex justify-center mb-2 pt-10"
                  >
                    <RecipeCard
                      recipe={recipe}
                      key={index}
                      isProfilPage={true}
                      inCarousel={false}
                    />
                  </div>
                ) : (
                  <RecipeCard recipe={recipe} key={index} isProfilPage={true} inCarousel={false} />
                )}
              </>
            ))}
          </div>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default ProfilPage;
