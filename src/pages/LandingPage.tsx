import React from "react";
import {
  RecipeCard,
  Navbar,
  Grid,
  Container,
  Loading,
  Button,
  Footer,
} from "../components";
import useIsMobile from "../hooks/isMobile";
import { landingPageCategories } from "../icons";
import { body, wellbeing, logo, money, planet, search } from "../icons";
import ReactPlayer from "react-player";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRecipesQuery } from "../graphql";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const SearchBar: React.FC<{
  size?: "small" | "large";
  setValue?: (val: string) => void;
  value?: string;
  onSubmit?: () => void;
  hideSearchIcon?: boolean;
}> = ({ size = "large", value, setValue, onSubmit, hideSearchIcon }) => {
  const isLarge = size === "large";
  const history = useHistory();
  const totalSize = `w-full h-14 md:h-${isLarge ? "20" : "14"}`;
  const iconSize = `w-16 md:w-${isLarge ? "20" : "14"} h-14 md:h-${
    isLarge ? "20" : "14"
  }`;
  const handleSubmit = () => {
    if (!onSubmit) {
      history.push(
        `/recipes/?search=${
          (document.getElementById("search") as HTMLInputElement)?.value
        }`
      );
    } else {
      onSubmit();
    }
  };
  return (
    <div className={`${totalSize} | flex | relative`}>
      <input
        type="text"
        className={`w-full h-full | rounded-full shadow-lg | text-xl md:${
          isLarge ? "md:text-2xl" : "text-xl"
        } | pl-5`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Recherche ..."
        id="search"
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        {...(value
          ? {
              value,
            }
          : {})}
      />
      {!hideSearchIcon && (
        <div
          className={`${iconSize} | flex absolute -right-0 | rounded-full cursor-pointer`}
          style={{ backgroundColor: "#c0e0fb" }}
        >
          <img
            src={search}
            className={`w-10 h-10 md:h-${isLarge ? "10" : "9"} md:w-${
              isLarge ? "10" : "9"
            } | self-center | ml-auto mr-auto`}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      )}
    </div>
  );
};

interface CategoryCircleProps {
  name: string;
  icon: string;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ name, icon }) => {
  const isTag = ["Permier Pas", "Zéro-déchet", "Ingrédients du frigo"].includes(
    name
  );
  return (
    <div className="flex flex-col | items-center | max-w-28">
      <div className="w-20 h-20 md:w-28 md:h-28 | rounded-full shadow-lg">
        <Link to={`/recipes?${isTag ? `tags=${name}` : `category=${name}`}`}>
          <img
            className="max-h-full max-w-full | ml-auto mr-auto | flex place-self-center | rounded-full"
            src={icon}
          ></img>
        </Link>
      </div>
      <h3 className="pt-2 text-md md:text-lg"> {name} </h3>
    </div>
  );
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  const { error, loading, data, refetch } = useRecipesQuery({
    variables: { first: 10 },
  });
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Container
        className="flex flex-col | items-center | mt-16 lg:mt-32"
        padding
      >
        <h1 className="text-2xl md:text-5xl | pb-10 text-center">
          Toutes les recettes pour vos produits faits maison
        </h1>
        <SearchBar />
      </Container>
      <div className="w-screen md:w-4/5 | items-center pt-14 pb-16 | flex justify-center">
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
      <Container title="Les recettes de la semaine" itemsCenter></Container>
      <div className="w-full md:w-5/6 mb-10 recipesOfTheWeekCarousel flex flex-row">
        <AliceCarousel
          mouseTracking
          autoWidth
          infinite
          activeIndex={0}
          paddingLeft={10}
          items={
            data?.allRecipes
              ? data.allRecipes?.edges.map((recipe, index) => (
                  <RecipeCard
                    recipe={recipe?.node}
                    key={index}
                    inCarousel={true}
                  />
                ))
              : [<Loading />]
          }
        />
      </div>
      <Container
        title="nos tutos vidéos pour commencer"
        className="w-screen md:3/5 h-96"
        itemsCenter={true}
      >
        <Grid
          type="col"
          gap="14"
          size={{
            default: 1,
            md: 2,
          }}
          className="pt-10 w-4/5 md:w-3/5"
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
        className="w-full md:3/5 h-full pt-10 lg:pt-20"
        title="Pourquoi Greenit?"
        margin={20}
        itemsCenter
        padding={isMobile}
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
            { text: "Pour la planète", color: "#a6f78d", icon: planet },
            { text: "Pour ton corps", color: "#ffe390", icon: body },
            { text: "Pour tes èconomies", color: "#ffbea8", icon: money },
            { text: "Pour ton espirt", color: "#93c5fe", icon: wellbeing },
          ].map((item) => (
            <div className="h-full w-full flex flex-col items-center">
              <img
                src={item.icon}
                className="w-28 md:w-40 md:h-40 h-28 rounded-full pb-2"
              ></img>
              <h3 className="text-md md:text-2xl" style={{ color: item.color }}>
                {item.text}
              </h3>
            </div>
          ))}
        </Grid>
        <h2 className="mt-20 mb-10 text-md md:text-2xl text-center">
          Greenit est une initiative visant à encourager une consommation plus
          durable et responsable
        </h2>
        <Button type="success" rounded="2xl" className="w-36 md:w-48 h-12">
          <Link to="/why" className="text-xl md:text-2xl">
            En savoir plus
          </Link>
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;
