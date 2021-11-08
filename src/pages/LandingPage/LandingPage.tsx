import {
  RecipeCard,
  Navbar,
  Grid,
  Container,
  Loading,
  Button,
  Footer,
  SearchBar,
} from "../../components";
import useIsMobile from "../../hooks/isMobile";
import {
  body,
  wellbeing,
  money,
  planet,
  landingPageCategories,
} from "../../icons";
import ReactPlayer from "react-player";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRecipesQuery } from "../../graphql";
import { Link } from "react-router-dom";
import { CategoryCircle } from "./Components/CategoryCircle";

const LandingPage = () => {
  const isMobile = useIsMobile();
  const { error, loading, data, refetch } = useRecipesQuery({
    variables: { first: 10 },
  });
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <div className="landingpage_bg_1 | w-32 h-32 md:w-56 md:h-56"></div>
      <div className="landingpage_bg_2 | w-36 h-36 md:w-72 md:h-72"></div>
      <div className="landingpage_bg_3 | w-32 h-32 md:w-56 md:h-56"></div>
      <div className="landingpage_bg_4 | w-32 h-32 md:w-56 md:h-56"></div>
      <Container
        className="flex flex-col | items-center | mt-16 lg:mt-28"
        padding
      >
        <h1 className="text-3xl md:text-5xl | pb-16 text-center">
          L’espace de la production maison, <br/> pour une nouvelle consommation 
        </h1>
        <div className="w-full | md:w-9/12">
          <SearchBar />
        </div>
      </Container>
      <div className="w-screen md:w-3/5 | items-center pt-14 pb-16 | flex justify-center">
        {isMobile ? (
          <AliceCarousel
            mouseTracking
            autoWidth
            infinite
            disableButtonsControls={isMobile}
            items={landingPageCategories.map((item) => (
              <CategoryCircle
                name={item.title}
                icon={item.icon}
                key={item.title}
              />
            ))}
          />
        ) : (
          <Grid
            type="col"
            gap="8"
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
      <Container title="Les recettes de la semaine" itemsCenter></Container>
      <div className="w-full md:w-5/6 mb-10 recipesOfTheWeekCarousel flex flex-row">
        <AliceCarousel
          mouseTracking
          autoWidth={!isMobile}
          infinite
          activeIndex={0}
          disableButtonsControls={isMobile}
          paddingLeft={10}
          items={
            data?.allRecipes
              ? data.allRecipes?.edges.map((recipe, index) => (
                  <>
                    {isMobile ? (
                      <div
                        key={index}
                        className="w-full flex justify-center mb-2 pt-10"
                      >
                        <RecipeCard
                          recipe={recipe?.node}
                          key={index}
                          inCarousel={true}
                        />
                      </div>
                    ) : (
                      <RecipeCard
                        recipe={recipe?.node}
                        key={index}
                        inCarousel={true}
                      />
                    )}
                  </>
                ))
              : [<Loading />]
          }
        />
      </div>
      <Container
        title="Nos tutos vidéos pour commencer"
        className="w-screen md:3/5 h-96 text-center mt-8"
        itemsCenter
      >
        <Grid
          type="col"
          gap="14"
          size={{
            default: 1,
            md: 2,
          }}
          className="pt-4 w-4/5 md:w-3/5"
        >
          <div className="relative" style={{ height: "23rem" }}>
            <ReactPlayer
              url="https://youtu.be/ZeNRzJg0CKo"
              className="absolute top-0 left-0"
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
          {!isMobile && (
            <div className="relative" style={{ height: "23rem" }}>
              <ReactPlayer
                url="https://youtu.be/tHAWH6fUqEo"
                className="absolute top-0 left-0"
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
          )}
        </Grid>
      </Container>

      <Container
        className="w-full md:3/5 h-full pt-10 md:mt-40"
        title="Pourquoi Greenit?"
        margin={20}
        itemsCenter
        padding={isMobile}
      >
        <Grid
          type="col"
          gap="8 md:gap-15"
          size={{
            default: 2,
            sm: 4,
          }}
          className="text-center mt-8 md:mt-0"
        >
          {[
            { text: "Pour la planète", color: "#c2e69c", icon: planet },
            { text: "Pour ton corps", color: "#ffe390", icon: body },
            { text: "Pour tes économies", color: "#ffbea8", icon: money },
            { text: "Pour ton esprit", color: "#93c5fe", icon: wellbeing },
          ].map((item) => (
            <div className="h-full w-full flex flex-col items-center">
              <img
                src={item.icon}
                className="w-28 h-28 md:w-32 md:h-32 pb-2"
              ></img>
              <h2 className="text-md md:text-xl" style={{ color: item.color }}>
                {item.text}
              </h2>
            </div>
          ))}
        </Grid>
        <h3 className="mt-10 mb-10 text-md md:text-xl text-center">
          Greenit est une initiative visant à encourager une consommation <br/> 
          plus durable et responsable.
        </h3>
        <Button type="success" rounded="xl" className="w-36 md:w-48 h-12">
          <Link to="/why" className="text-md md:text-xl">
            <h2>En savoir plus</h2>
          </Link>
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;