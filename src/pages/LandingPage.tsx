import React from "react";
import {
  RecipeCard,
  Navbar,
  Grid,
  Container,
  Button,
  Footer,
} from "../components";
import useIsMobile from "../hooks/isMobile";
import { landingPageCategories } from "../icons";
import {
  body,
  face,
  hair,
  home,
  wellbeing,
  logo,
  money,
  planet,
  search,
} from "../icons";
import ReactPlayer from "react-player";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRecipesQuery } from "../graphql";

const SearchBar = () => {

  return (
    <div className="h-14 md:h-20 w-full | flex | relative">
      <input
        type="text"
        className="w-full h-full | rounded-full shadow-lg | text-xl md:text-3xl | pl-5"
        placeholder="Search ..."
      />
      <div
        className="w-16 md:w-20 h-14 md:h-20 md:h-16 | flex absolute -right-0 | rounded-full cursor-pointer"
        style={{ backgroundColor: "#c0e0fb" }}
      >
        <img
          src={search}
          className="w-10 h-10 md:h-10 md:w-10 | self-center | ml-auto mr-auto"
        />
      </div>
    </div>
  );
};

interface CategoryCircleProps {
  name: string;
  icon: string;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ name, icon }) => {
  return (
    <div className="flex flex-col | items-center | max-w-28">
      <div className="w-20 h-20 md:w-28 md:h-28 | rounded-full shadow-lg">
        <a href="/recipes">
          <img
            className="max-h-full max-w-full | ml-auto mr-auto | flex place-self-center | rounded-full"
            src={icon}
          ></img>
        </a>
      </div>
      <h3 className="pt-2 text-md md:text-lg"> {name} </h3>
    </div>
  );
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  const { error, loading, data, refetch } = useRecipesQuery();
  if (loading || !data) {
    return <div>Loading</div>;
  }
  const recipes = data.allRecipes;
  return (
    <div className="flex flex-col | items-center self-center">
      {!isMobile && <Navbar />}
      <div className="flex flex-col | items-center | pt-32">
        <img src={logo} className="h-40 w-40 mb-10" />
        <h1 className="text-2xl md:text-5xl | pb-10">
          Recipes For Homemade Products
        </h1>
        <SearchBar />
      </div>
      <div className="w-screen md:w-4/5 | items-center pt-14 pb-16 | flex justify-center">
        {/* TODO: FIX FOR PHONE */}
        {isMobile ? (
          <AliceCarousel
            mouseTracking
            autoWidth
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
              default: 7,
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
      <Container title="Recipes of The Week" itemsCenter></Container>
      <div className="w-full md:w-5/6">
        {/* TODO: FIX FOR DESKTOP AND MAKE SURE LAST CARD IS SHOWN ON MOBILE */}
        <AliceCarousel
          mouseTracking
          autoWidth
          activeIndex={1}
          paddingLeft={10}
          items={recipes?.filter((item, index) => index > 45).map((recipe) => (
            <RecipeCard recipe={recipe ?? undefined} key={recipe?.id}/>
          ))}
        />
      </div>
      <Container
        margin={20}
        title="Questionnaire"
        itemsCenter={true}
        className="w-full md:3/5 h-auto"
      >
        <h1 className="text-2xl">Find Recipes tailored for you!</h1>
        <Grid
          type="col"
          gap="14"
          size={{
            default: 5,
          }}
          className="mt-10 mb-10"
        >
          {[home, face, wellbeing, hair, body].map((item, index) => (
            <img
              src={item}
              key={index}
              className="h-40 w-40 hover:bg-gray-300 rounded-full"
            ></img>
          ))}
        </Grid>
        <Button
          type="primary"
          rounded="2xl"
          className="w-24 sm:w-48 h-12 | flex self-center"
        >
          <a href="/personalizedSearch" className="text-2xl">
            Start
          </a>
        </Button>
      </Container>
      <Container
        title="Video tutorials to start"
        className="w-full md:3/5 h-96"
        itemsCenter={true}
      >
        <Grid
          type="col"
          gap="14"
          size={{
            default: 1,
            md: 2,
          }}
          className="pt-10 w-3/5"
        >
          <div className="relative" style={{ height: "23rem" }}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=c4jOZp-EibM"
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
          <div className="relative">
            <ReactPlayer
              className="absolute top-0 left-0"
              url="https://www.youtube.com/watch?v=c4jOZp-EibM"
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
        </Grid>
      </Container>

      <Container
        className="w-full md:3/5 h-full pt-40"
        title="Why Greenit?"
        margin={20}
        itemsCenter
      >
        <Grid
          type="col"
          gap="8 md:gap-24"
          size={{
            default: 2,
            sm: 4,
          }}
          className="pt-10"
        >
          {[
            { text: "For The Planet", color: "#a6f78d", icon: planet },
            { text: "For Your Body", color: "#ffe390", icon: body },
            { text: "For Your Finances", color: "#ffbea8", icon: money },
            { text: "For Your Wellbeing", color: "#93c5fe", icon: wellbeing },
          ].map((item) => (
            <div className="h-full w-full flex flex-col items-center">
              <img
                src={item.icon}
                className="w-28 md:w-40 md:h-40 h-28 hover:bg-gray-300 rounded-full pb-2"
              ></img>
              <h3 className="text-md md:text-2xl" style={{ color: item.color }}>
                {item.text}
              </h3>
            </div>
          ))}
        </Grid>
        <h2 className="mt-20 mb-10 text-md md:text-2xl">
          Greenit is an initiative to encourage individuals to consume in <br />
          a sustainable, autonomous way
        </h2>
        <Button type="success" rounded="2xl" className="w-32 md:w-48 h-12">
          <a href="/personalizedSearch" className="text-xl md:text-2xl">
            Read More
          </a>
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;
