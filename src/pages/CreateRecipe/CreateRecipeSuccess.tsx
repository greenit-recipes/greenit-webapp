import { useEffect } from "react";
import { Navbar } from "components/layout/Navbar";
import { Button } from "components/misc/Button";
import { Footer } from "components/layout/Footer";
import { BackgroundImage } from "components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RecipeCreatedPage = () => {
  const { t, i18n } = useTranslation("common");
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
          {t("createRecipeSuccess.title")}
          </h1>
          <h1 className="text-center text-gray-700 text-xl md:text-2xl md:text-3xl mt-1">
          {t("createRecipeSuccess.subtitle")}
          </h1>
          <h3 className="text-center text-lg md:text-xl mt-10">
          {t("createRecipeSuccess.content1")}
          </h3>
          <h3 className="text-center text-sm md:text-base mt-10">
          {t("createRecipeSuccess.content2")}{" "}
          </h3>
        </div>
        <Link to="/">
          <Button className="mt-14 mb-10 h-11" type="blue">
          {t("createRecipeSuccess.button")}
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeCreatedPage;
