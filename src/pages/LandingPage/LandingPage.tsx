import {
  RecipeCard,
  Navbar,
  Grid,
  Container,
  Loading,
  Button,
  Footer,
  SearchBar,
  BackgroundImage,
} from "../../components";
import useIsMobile from "../../hooks/isMobile";
import {
  atelier,
  corpsWhy,
  corps,
  wellbeing,
  money,
  planet,
  landingPageCategories,
} from "../../icons";
import "../../pages/recipe/SinglePage/SinglePage.css";
import ReactPlayer from "react-player";
import { useRecipesQuery } from "../../graphql";
import { Link } from "react-router-dom";
import { CategoryCircle } from "./Components/CategoryCircle";
import { Newsletter } from "./Components/Newsletter";
import { BugFormulaire } from "components/layout/BugFormulaire";
import authService from "services/auth.service";
import { RouteName } from "App";

const LandingPage = () => {
  const isLoggedIn = authService.isLoggedIn();
  const isMobile = useIsMobile();
  const { error, loading, data, refetch } = useRecipesQuery({
    fetchPolicy: "no-cache",
    variables: { first: 8 },
  });

  if (loading || !data) {
    return <Loading />;
  }

  const recipes = data.allRecipes?.edges || [];

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <BugFormulaire />
      <BackgroundImage className="overflow-hidden" />
      <Container
        className="flex flex-col | items-center | mt-16 lg:mt-28"
        padding
      >
        <div className="max-w-20 sm:max-w-90">
          <h1 className="text-3xl lg:text-5xl | pb-14 text-center">
            L’espace de la production maison, <br /> pour une nouvelle
            consommation
          </h1>
        </div>
        <div className="w-10/12 | sm:w-8/12 | lg:w-1/2">
          <SearchBar />
        </div>
      </Container>
      <div className="w-screen | items-center py-8 mb-5 | flex justify-center">
        {isMobile ? (
          <div className="flex overflow-x-auto pl-6">
            {landingPageCategories.map((item) => (
              <CategoryCircle
                name={item.title}
                icon={item.icon}
                key={item.title}
              />
            ))}
          </div>
        ) : (
          <Grid
            type="col"
            gap={{
              default: 6,
            }}
            size={{
              default: 6,
            }}
          >
            {landingPageCategories.map((item) => (
              <CategoryCircle
                name={item.title}
                icon={item.icon}
                key={item.title}
              />
            ))}
          </Grid>
        )}
      </div>
      <Container
        className="mb-10"
        title="Notre sélection de recettes"
        itemsCenter
      >
        {isMobile ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 mt-6 md:grid-cols-4 md:gap-x-4 md:gap-y-10 mb-2">
            {recipes?.slice(0, 6).map((recipe, index: number) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 justify-items-center gap-y-10 gap-x-4 | py-4 px-8">
            {recipes?.map((recipe) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
          </div>
        )}
        <Link to="/recipes" className="mt-6">
          <Button type="green">Découvrir plus</Button>
        </Link>
      </Container>

      <Container className="w-screen text-center mt-8 sm:mb-14" itemsCenter>
        <h1 className="text-2xl md:text-3xl | p-5 text-center">
          Nos tutos vidéos pour commencer
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 sm:grid-rows-1 gap-2 md:gap-8 pt-4 w-4/5 xl:w-3/5">
          <div className="relative h-64 md:h-80">
            <ReactPlayer
              url="https://youtu.be/ZeNRzJg0CKo"
              className="absolute top-0 left-0 react-player"
              controls={true}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, rel: 0 },
                },
              }}
              width="100%"
              height="100%"
            />
          </div>

          <div className="relative h-64 md:h-80">
            <ReactPlayer
              url="https://youtu.be/tHAWH6fUqEo"
              className="absolute top-0 left-0 react-player"
              controls={true}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, rel: 0 },
                },
              }}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </Container>

      <div className="mt-10 grid bg-orange w-screen py-12 justify-items-center">
        <div className="grid mb-8 text-center">
          <h1 className="text-white text-2xl md:text-3xl mb-2">
            {" "}
            Tous les ateliers DIY proches de chez toi !{" "}
          </h1>
          <h3 className="text-white text-lg md:text-xl | text-center whitespace-pre-line">
            Fais-toi aider et rencontre d’autres passionnés
          </h3>
        </div>
        <div className="grid grid-flow-row auto-rows-auto justify-items-center">
          <div className="relative justify-center">
            <img src={atelier} className="w-56 h-56" alt="liked button" />
          </div>
          <Link className="self-top mt-5" to={RouteName.workshops}>
            <Button className="border-white" type="orange">Explorer des ateliers</Button>
          </Link>
        </div>
      </div>

      <Container
        className="w-full md:w-3/5 h-full"
        title="Pourquoi Greenit?"
        margin={10}
        itemsCenter
        padding={isMobile}
      >
        <div className="grid grid-cols-2 gap-8 md:gap-12 justify-items-center mt-8">
          {[
            { text: "Pour la planète", color: "#8AD554", icon: planet },
            { text: "Pour ton corps", color: "#7EAADD", icon: corpsWhy },
            { text: "Pour tes économies", color: "#ffd460", icon: money },
            { text: "Pour ton esprit", color: "#EA9875", icon: wellbeing },
          ].map((item) => (
            <div className="grid col-span-1 justify-items-center">
              <img
                src={item.icon}
                className="w-28 h-28 md:w-32 md:h-32 pb-2"
              ></img>
              <h2 className="text-md md:text-xl" style={{ color: item.color }}>
                {item.text}
              </h2>
            </div>
          ))}
        </div>
        <h3 className="mt-10 mb-10 text-md md:text-xl text-center">
          Greenit est une initiative visant à encourager une consommation <br />
          plus durable et responsable.
        </h3>
        <Link to={RouteName.why}>
          <Button type="blue">En savoir plus</Button>
        </Link>
      </Container>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default LandingPage;
