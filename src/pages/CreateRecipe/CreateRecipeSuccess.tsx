import { BackgroundImage } from "components";
import { Footer } from "components/layout/Footer";
import { Navbar } from "components/layout/Navbar";
import { Button } from "components/misc/Button";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import authService from "services/auth.service";

const ModalLogGreenit = React.lazy(() => import("components/layout/ModalLogGreenit/ModalLogGreenit"));

const RecipeCreatedPage = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  const isLoggedIn = authService.isLoggedIn();

  return (
    <div>
      <BackgroundImage />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div className="grid justify-items-center auto-rows-max h-auto">
        <div className="w-2/3 md:w-2/5">
          <h2 className="text-center text-gray-700 text-xl md:text-2xl  mt-20 ">
            Ta recette a été prise en compte.
          </h2>
          <h1 className="text-center font-bold text-blue text-xl md:text-2xl mt-10 ">
            Merci d’aider la communauté !
          </h1>

          {isLoggedIn ? (
            <>
              <h3 className="text-center text-lg md:text-xl mt-10">
                Ta recette est en attente de validation. Tu seras notifié une
                fois la publication dans les 24/48h.
              </h3>
              <h3 className="text-center text-sm md: mt-10">
                Si tu souhaites la modifier, envoie-nous un email au plus vite à
                hello@greenitcommunity.com.{" "}
              </h3>
            </>
          ) : (
            <>
              <h3 className="text-center mt-10">
                Pour que ta recette te soit créditée, créé ton compte
                créateur.ice 👇
              </h3>
            </>
          )}
        </div>
        {isLoggedIn && (
          <Link to="/">
            <Button className="mt-14 mb-10 h-11" type="blue">
              Revenir à la page d’accueil
            </Button>
          </Link>
        )}
        {!isLoggedIn && (
          <ModalLogGreenit
            btn={
              <>
                <button
                  id="Create_Profil"
                  className="p-2 mr-1 rounded-lg bg-blue mt-10 mb-10 h-9"
                >
                  <h2 id="Create_Profil" className="text-xs text-white">
                    Créer mon compte
                  </h2>
                </button>
              </>
            }
          ></ModalLogGreenit>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeCreatedPage;
