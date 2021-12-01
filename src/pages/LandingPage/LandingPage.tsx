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
  likedIconOn,
  likedIconOff,
} from "../../icons";
import ReactPlayer from "react-player";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRecipesQuery } from "../../graphql";
import { Link } from "react-router-dom";
import { CategoryCircle } from "./Components/CategoryCircle";
import { Newsletter } from "./Components/Newsletter";
import { BackgroundImage } from "./Components/BackgroundImage";
import authService from "services/auth.service";

const LandingPage = () => {
  const isLoggedIn = authService.isLoggedIn();
  const isMobile = useIsMobile();
  const { error, loading, data, refetch } = useRecipesQuery({
    fetchPolicy: "no-cache",
    variables: { first: 10 },
  });

  if (loading || !data) {
    return <Loading />;
  }
  
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />

      <BackgroundImage className="overflow-hidden" />

      <Container
        className="flex flex-col | items-center | mt-16 lg:mt-28"
        padding
      >
        <h1 className="text-3xl md:text-5xl | pb-16 text-center">
          L’espace de la production maison, <br /> pour une nouvelle
          consommation
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
                      <div key={index} className="mb-10">
                        <RecipeCard
                          recipe={recipe?.node}
                          key={index}
                          inCarousel={true}
                        />
                      </div>
                    )}
                  </>
                ))
              : [<Loading />]
          }
        />
      </div>
      <Container
        title="Nos tutos vidéos pour commencer"
        className="w-screen md:3/5 text-center mt-8"
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
            <div className="relative" style={{ height: "12rem" }}>
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

      {isLoggedIn ? (
        <div />
      ) : (
        <Container
          margin={20}
          title="Créee ton espace personnel"
          itemsCenter
          padding={isMobile}
        >
          <Grid
            type="row"
            gap="0"
            size={{
              default: 2,
            }}
          >
            <div className="grid mb-8">
              <h3 className="text-lg md:text-xl | text-center whitespace-pre-line">
                Commence ton carnet de recettes,
                {"\n"} et partage ton savoir
              </h3>
            </div>
            <div className="flex justify-center h-22">
              <img
                src={likedIconOff}
                className="-ml-6 w-16 h-16"
                alt="liked button"
              />
              <img
                src={likedIconOn}
                className="absolute ml-8 | w-16 h-16"
                alt="liked button"
              />
            </div>
          </Grid>
          <Link to="/register">
            <Button type="orange">Créer mon profil</Button>
          </Link>
        </Container>
      )}

      <Container
        className="w-full md:3/5 h-full"
        title="Pourquoi Greenit?"
        margin={10}
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
          Greenit est une initiative visant à encourager une consommation <br />
          plus durable et responsable.
        </h3>
        <Link to="/why">
          <Button type="blue">En savoir plus</Button>
        </Link>
      </Container>

      <Newsletter />

      <Footer />
    </div>
  );
};

export default LandingPage;
