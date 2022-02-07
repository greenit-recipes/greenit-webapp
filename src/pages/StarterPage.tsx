import { BackgroundImage, Container, Navbar } from "components";
import { Helmet } from "react-helmet";

const StarterPage = () => {
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Guide pour les débutants en DIY - Cosmétiques maison et produits d’hygiène</title>
        <meta name="description" content="Un guide simple pour débutant en DIY : des conseils et astuces, les ingrédients indispensables et des recettes simples pour débuter." />
      </Helmet>
      <BackgroundImage />
      <Container className="flex flex-col | items-center | md:w-2/3 mt-16 lg:mt-28 px-8 ">
        <h1 className="text-2xl md:text-3xl | text-center">
          Bientôt un espace débutant,
        </h1>
        <h3 className="text-2xl md:text-3xl | text-center">
          pour se lancer pas à pas !
        </h3>

        <h3 className="mt-2 text-xl md:text-2xl | mt-10 mb-10 text-center">
          On se casse la biscotte pour construire cette page, disponible très
          vite 🤗
        </h3>
      </Container>
    </div>
  );
};

export default StarterPage;
