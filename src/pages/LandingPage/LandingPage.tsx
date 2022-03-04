import { RouteName } from "App";
import { BugFormulaire } from "components/layout/BugFormulaire";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import {
  BackgroundImage,
  Button,
  Container,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
  SearchBar,
} from "../../components";
import { useRecipesQuery } from "../../graphql";
import useIsMobile from "../../hooks/isMobile";
import {
  Conseil,
  Cooking,
  Ustensil,
  atelier,
  corpsWhy,
  landingPageCategories,
  money,
  planet,
  wellbeing,
  issy,
  escapeTheCity,
  sixHTN,
} from "../../icons";
import "../../pages/recipe/SinglePage/SinglePage.css";
import { CategoryCircle } from "./Components/CategoryCircle";
import { Newsletter } from "./Components/Newsletter";
import { Press } from "../../components/layout/TheyTalkAboutUs";
import { Helmet } from "react-helmet";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "pages/LandingPage/LandingPage.css";

const responsiveCarouselLanding = {
  desktop: {
    breakpoint: { max: 3000, min: 1224 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1224, min: 664 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 664, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  const {
    error,
    loading,
    data: dataIsDiplayHome,
    refetch,
  } = useRecipesQuery({
    fetchPolicy: "no-cache",
    variables: { first: 8, filter: { isDisplayHome: true } },
  });

  const { data: dataBegginer } = useRecipesQuery({
    fetchPolicy: "no-cache",
    variables: { first: 8, filter: { tags: ["Premiers pas"] } },
  });

  const { data: dataNbrLikes } = useRecipesQuery({
    fetchPolicy: "no-cache",
    variables: { first: 8, filter: { isOrderByNumberLike: true } },
  });

  if (loading || !dataIsDiplayHome || !dataBegginer || !dataNbrLikes) {
    return <Loading />;
  }

  const recipes = dataIsDiplayHome.allRecipes?.edges || [];
  const recipesBegginer = dataBegginer.allRecipes?.edges || [];
  const recipesOrderByLikes = dataNbrLikes.allRecipes?.edges || [];

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <title>
          Toutes vos recettes DIY pour une consommation fait-maison | Greenit
        </title>
        <meta
          name="description"
          content="Votre espace de partage de recette DIY, des astuces écologiques pour la maison, des ateliers pour débuter dans le fait-maison et des pages sur les bienfaits des ingrédients."
        />
      </Helmet>
      <BugFormulaire />
      <BackgroundImage className="overflow-hidden" />

      <Container className="flex flex-col | w-4/5 px-4 sm:w-2/3 items-start | mt-4 mb-2 md:mt-4">
        <div className="mb-6">
          {!isMobile && (
            <h5 className="text-green font-medium text-3xl md:text-5xl mb-2 |">
              Greenit
            </h5>
          )}
          <h1 className="text-2xl font-semibold md:text-4xl md:mb-1 inline lg:block |">
            La communauté du fait maison,
          </h1>
          <h5 className="text-2xl font-semibold md:text-4xl | ml-2 lg:ml-0 md:mb-2 inline">
            pour une consommation
          </h5>
          <h5 className="text-green font-semibold text-2xl md:text-4xl | ml-2 inline">
            durable
          </h5>
        </div>
        <div className="lg:w-2/5">
          <SearchBar keyId="searchBarLandingPage" />
        </div>
      </Container>
      <div className="w-full sm:w-4/5 lg:w-2/3 | py-8 pl-6 | flex overflow-x-auto">
        <div className="flex flex-row">
          {landingPageCategories.slice(0, 1).map((item) => (
            <CategoryCircle
              name={item.title}
              icon={item.icon}
              key={item.title}
            />
          ))}
          {landingPageCategories.slice(2, 3).map((item) => (
            <CategoryCircle
              name={item.title}
              icon={item.icon}
              key={item.title}
            />
          ))}
          <div className="w-1 h-18 border-r-1 border-grey self-center mb-14 mx-6"></div>
          {landingPageCategories.slice(3).map((item) => (
            <CategoryCircle
              name={item.title}
              icon={item.icon}
              key={item.title}
            />
          ))}
        </div>
      </div>

      <Container className="mb-14" itemsCenter>
        <h2 className="text-xl md:text-2xl | mb-2 lg:mb-6 text-center">
          Notre sélection de recettes
        </h2>
        {isMobile ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 mb-2">
            {recipes?.slice(0, 6).map((recipe, index: number) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 justify-items-center gap-y-10 gap-x-4">
            {recipes?.map((recipe) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
          </div>
        )}
        <Link to={RouteName.recipes} className="lg:mt-10">
          <Button type="green">Découvrir plus</Button>
        </Link>
      </Container>

      <h2 className="text-xl md:text-2xl | mb-6 text-center">
        Les recettes débutants
      </h2>
      {isMobile ? (
        <div className="w-full pl-4 overflow-x-auto">
          <div className="w-max flex">
            {recipesBegginer?.map((recipe) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
          </div>
        </div>
      ) : (
        <Carousel
          swipeable={true}
          showDots={true}
          ssr={true}
          responsive={responsiveCarouselLanding}
          infinite={true}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass={
            isMobile ? "carousel-container-mobile" : "carousel-container"
          }
          customTransition="transform 300ms ease-in-out"
          dotListClass={
            isMobile ? "custom-dot-list-style-mobile" : "custom-dot-list-style"
          }
          itemClass={isMobile ? "carousel-item-mobile" : "carousel-item"}
        >
          {recipesBegginer?.map((recipe) => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
        </Carousel>
      )}
      <Container className="flex flex-col items-center | w-10/12 mt-8 lg:mt-20">
        <div className="lg:mb-4">
          <h2 className="text-lg lg:text-xl mb-2 text-center">
            Le guide pour se lancer dans le DIY
          </h2>
          <h3 className="text-sm lg:text-base font-light text-center">
            3 étapes simples pour vous lancer dans le fait-maison, co-écrit avec
            des experts de la communauté Greenit !
          </h3>
        </div>

        <div className="flex flex-row justify-evenly gap-2 lg:gap-6 my-6">
          {[
            {
              icon: Conseil,
              title: "3 meilleurs conseils pour débuter",
              number: "1",
            },
            {
              icon: Ustensil,
              title: "Les ingrédients & ustensiles",
              number: "2",
            },
            {
              icon: Cooking,
              title: "2 Recettes simples",
              number: "3",
            },
          ].map((item) => (
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 grid bg-white rounded-xl shadow-lg m-2 p-2 | cursor-pointer transform sm:hover:scale-105 ease-linear transition-all duration-150">
              <div className="grid absolute  w-8 h-8  md:w-10 md:h-10 -mt-4 -ml-4 bg-white rounded-full shadow-sm m-2">
                <h2 className="text-center self-center font-bold  text-sm  lg:text-xl">
                  {item.number}
                </h2>
              </div>
              <div className="grid justify-items-center">
                <img
                  src={item.icon}
                  className="w-10 md:w-16 self-center items-center"
                  alt="conseils_diy"
                  loading="lazy"
                />{" "}
              </div>
              <h3 className="text-xs lg:text-sm  text-center font-light">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <Link to={RouteName.starterPage}>
          <Button className="" type="blue" id="starter-page-home">
            Se lancer
          </Button>
        </Link>
      </Container>
      <h2 className="text-xl md:text-2xl | mt-20 mb-6 text-center">
        Les recettes préférées
      </h2>
      {isMobile ? (
        <div className="w-full pl-4 overflow-x-auto">
          <div className="w-max flex">
            {recipesOrderByLikes?.map((recipe) => (
              <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
            ))}
          </div>
        </div>
      ) : (
        <Carousel
          swipeable={true}
          showDots={true}
          ssr={true}
          responsive={responsiveCarouselLanding}
          infinite={true}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass={
            isMobile ? "carousel-container-mobile" : "carousel-container"
          }
          customTransition="transform 300ms ease-in-out"
          dotListClass={
            isMobile ? "custom-dot-list-style-mobile" : "custom-dot-list-style"
          }
          itemClass={isMobile ? "carousel-item-mobile" : "carousel-item"}
        >
          {recipesOrderByLikes?.map((recipe) => (
            <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
          ))}
        </Carousel>
      )}

      <Container className="w-full text-center mt-20" itemsCenter>
        <h2 className="text-xl md:text-2xl | mb-2 text-center">
          🙏 Merci à tous pour votre grande générosité ! 🌱
        </h2>

        <h3 className=" w-full sm:w-2/3 md:w-2/5 px-4 md:p-1 mb-6 text-md md:text-xl text-center">
          Grâce aux dons de toute la communauté nous pouvons continuer à
          développer Greenit, avec toujours plus de DIY !
        </h3>
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 md:-ml-10">
          <iframe
            className="react-player px-4 sm:px-0 justify-self-center"
            height="300px"
            width="310px"
            title="video ulule"
            src="https://fr.ulule.com/greenit-community/widget.html"
            scrolling="no"
          ></iframe>
          <div className="w-full px-4 sm:px-0 sm:w-96 lg:w-99">
            <iframe
              className="react-player"
              height="270px"
              width="100%"
              src="https://www.youtube-nocookie.com/embed/v0-8WGzCTs8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </Container>

      <Container className="w-full text-center" itemsCenter>
        <h2 className="text-xl md:text-2xl | mt-10 lg:mt-20 mb-6 text-center">
          Nos tutos vidéos pour commencer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 sm:grid-rows-1 gap-2 md:gap-8 pt-4 w-4/5 lg:w-3/5">
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

      <div className="mt-10 grid bg-orange w-full py-12 px-6 justify-items-center">
        <div className="grid mb-8 text-center">
          <h2 className="text-white text-xl md:text-2xl mb-2">
            Tous les ateliers DIY proches de chez toi !{" "}
          </h2>
          <h3 className="text-white text-lg md:text-xl | text-center whitespace-pre-line">
            Fais-toi aider et rencontre d’autres passionnés
          </h3>
        </div>
        <div className="grid grid-flow-row auto-rows-auto justify-items-center">
          <div className="relative justify-center">
            <img src={atelier} className="w-56 h-56" alt="liked button" />
          </div>
          <Link className="self-top mt-5" to={RouteName.workshops}>
            <Button className="border-white" type="orange">
              Explorer des ateliers
            </Button>
          </Link>
        </div>
      </div>

      <Container
        className="w-full md:w-3/5 h-full"
        itemsCenter
        padding={isMobile}
      >
        <h2 className="text-xl md:text-2xl | mt-20 lg:mb-10 text-center">
          Pourquoi Greenit ?
        </h2>
        <div className="grid grid-cols-2 gap-8 md:gap-12 justify-items-center mt-8">
          {[
            { text: "Pour la planète", color: "#8AD554", icon: planet },
            { text: "Pour ton corps", color: "#7EAADD", icon: corpsWhy },
            { text: "Pour tes économies", color: "#ffd460", icon: money },
            { text: "Pour ton esprit", color: "#EA9875", icon: wellbeing },
          ].map((item, index) => (
            <div className="grid col-span-1 justify-items-center" key={index}>
              <img
                src={item.icon}
                alt={item.text}
                className="w-28 h-28 md:w-32 md:h-32 pb-2"
                loading="lazy"
              ></img>
              <h2 className="text-md md:text-xl" style={{ color: item.color }}>
                {item.text}
              </h2>
            </div>
          ))}
        </div>
        <h3 className="mt-10 mb-4 text-md md:text-xl text-center">
          Greenit est une initiative visant à encourager une consommation <br />
          plus durable et responsable.
        </h3>
        <Link to={RouteName.why}>
          <Button type="blue">En savoir plus</Button>
        </Link>
      </Container>
      <Newsletter />
      <div className="flex justify-between flex-col lg:flex-row mb-20">
        <Press
          title="Ces 3 amis ont crée un site qui propose des dizaines de recettes zéro déchet à faire soi-même"
          image={sixHTN}
          subtitle="18h39.fr, un média de Castorama"
        ></Press>
        <Press
          inverted={true}
          title="&quot;Avec la Greenit Community, just do it yourself !&quot;"
          image={escapeTheCity}
          subtitle="EscapeTheCity, média engagé low-tech"
        ></Press>
        <Press
          title="&quot;Greenit&quot; : une plateforme collaborative pour le fait-maison"
          image={issy}
          subtitle="Ville d'Issy-Les-Moulineaux"
        ></Press>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
