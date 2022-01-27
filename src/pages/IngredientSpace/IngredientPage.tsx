import { Navbar, Container, BackgroundImage, Button } from "components";

const ingredientPage = () => {
  return (
    <div className="flex flex-col | items-center self-center">
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
          On se casse la biscotte pour construire cette page, disponible très vite 🤗
        </h3>
      </Container>
    </div>
  );
};

export default ingredientPage;
