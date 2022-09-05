import { Container } from "components";
import { Footer } from "components/layout/Footer";
import { Navbar } from "components/layout/Navbar";
import { Button } from "components/misc/Button";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import authService from "services/auth.service";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

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
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <Container className="grid w-full justify-center">
        <div className="flex flex-col mt-16 lg:mt-28 px-8 mb-40 gap-4">
          <h2 className="text-xl md:text-2xl | text-center">
            Ta recette a été prise en compte !<br />
            <br />
            Merci d’aider la communauté ! 🙏
          </h2>

          {isLoggedIn ? (
            <>
              <h3 className="text-center text-lg md:text-xl">
                Ta recette est en attente de validation. <br /> Tu seras notifié
                une fois la publication dans les 24/48h.
              </h3>
              <h3 className="text-center text-sm">
                Si tu souhaites la modifier, envoie-nous un email au plus vite à
                hello@greenitcommunity.com.{" "}
              </h3>
            </>
          ) : (
            <>
              <p className="text-center">
                Pour que ta recette te soit créditée, créé ton compte
                créateur.ice 👇
              </p>
            </>
          )}
          {isLoggedIn && (
            <Link to="/profil" className="flex justify-center">
              <Button className="mt-14 mb-10 w-60 self-center" type="darkBlue">
                Retourner dans mon profil
              </Button>
            </Link>
          )}
          {!isLoggedIn && (
            <ModalLogGreenit
              btn={
                <Button
                  id="navbar-create-profil"
                  type="blue"
                  className="w-44 self-center"
                >
                  Créer mon compte
                </Button>
              }
            ></ModalLogGreenit>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default RecipeCreatedPage;
