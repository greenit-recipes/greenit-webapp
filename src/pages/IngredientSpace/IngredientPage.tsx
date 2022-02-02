import { Navbar, Container, BackgroundImage, Button } from "components";
import { Helmet } from "react-helmet";

const ingredientPage = () => {
  return (
    <div className="flex flex-col | items-center self-center">
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>
          Huiles végétales, huiles essentielles - Découvrez les bienfaits des
          ingrédients
        </title>
        <meta
          name="description"
          content="Greenit vous propose un guide d’utilisation de vos ingrédients DIY (huiles essentielles, huiles végétales, poudres végétales…) pour découvrir leurs bienfaits et propriétés."
        />
      </Helmet>
      <Navbar />
      <BackgroundImage />
      <Container className="flex flex-col | items-center | md:w-2/3 mt-16 lg:mt-28 px-8 ">
        <h1 className="text-2xl md:text-3xl | text-center">
          Bientôt l'espace ingrédient,
        </h1>
        <h1 className="text-2xl md:text-3xl | text-center">
          pour référencer tous les ingrédients et leurs bienfaits !
        </h1>

        <h3 className="mt-2 text-xl md:text-2xl | mt-10 mb-10 text-center">
          On se casse la biscotte pour construire cette page, disponible très
          vite 🤗
        </h3>
      </Container>
    </div>
  );
};

export default ingredientPage;
