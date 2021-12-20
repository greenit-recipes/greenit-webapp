import { useEffect } from "react";
import { Navbar } from "components/layout/Navbar";
import { Button } from "components/misc/Button";
import { Footer } from "components/layout/Footer";
import { BackgroundImage } from "components";
import { Link } from "react-router-dom";
const RecipeCreatedPage = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <div>
      <BackgroundImage />
      <Navbar />
      <div className="grid justify-items-center auto-rows-max h-auto">
        <div className="w-2/3 md:w-2/5">
          <h1 className="text-center text-blue text-xl md:text-2xl md:text-3xl mt-20">
            Merci d’aider la communauté !
          </h1>
          <h1 className="text-center text-gray-700 text-xl md:text-2xl md:text-3xl mt-1">
            Ta recette a été prise en compte.
          </h1>
          <h3 className="text-center text-lg md:text-xl mt-10">
            Ta recette est en attente de validation. Tu seras notifié une fois
            la publication dans les 24/48h.
          </h3>
          <h3 className="text-center text-sm md:text-base mt-10">
            Si tu souhaites la modifier, envoie-nous un email au plus vite à
            hello@greenitcommunity.com.{" "}
          </h3>
        </div>
        <Link to="/">
          <Button className="mt-14 mb-10 h-11" type="blue">
            Revenir à la page d’accueil
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeCreatedPage;
