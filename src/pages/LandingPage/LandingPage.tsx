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
  atelier,
  corpsWhy,
  landingPageCategories,
  money,
  planet,
  wellbeing,
} from "../../icons";
import "../../pages/recipe/SinglePage/SinglePage.css";
import { CategoryCircle } from "./Components/CategoryCircle";
import { Newsletter } from "./Components/Newsletter";
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

      <h2 className="text-xl md:text-2xl | mt-20 mb-6 text-center">
        Les recettes préférées
      </h2>
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
      <Footer />
    </div>
  );
};

export default LandingPage;
