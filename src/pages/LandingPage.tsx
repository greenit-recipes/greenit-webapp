import React from "react";
import { RecipeCard, Navbar, Grid } from "../components";
import useIsMobile from "../hooks/isMobile";
import { landingPageCategories } from "../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const SearchBar = () => {
  return (
    <div className="h-14 md:h-20 w-full | flex | shadow-lg bg-gray-400 | rounded-3xl">
      <input
        type="text"
        className="w-5/6 h-full | rounded-3xl shadow-lg | text-xl md:text-3xl | pl-5"
      />
      <h1 className="w-22 | static self-center | text-2xl text-white | pl-5 | rounded-3xl">
        Search
      </h1>
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
        <img
          className="max-h-full max-w-full | ml-auto mr-auto | flex place-self-center | rounded-full"
          src={icon}
        ></img>
      </div>
      <h3 className="pt-2 text-lg"> {name} </h3>
    </div>
  );
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col | items-center self-center | ml-5 mr-5">
      {!isMobile && <Navbar />}
      <div className="flex flex-col | items-center | pt-32">
        <h1 className="text-3xl md:text-5xl | pb-10">
          Recipes For Homemade Products
        </h1>
        <SearchBar />
      </div>
      <Grid
        type="col"
        gap="4"
        size={{
          default: 9,
        }}
        className="md:w-4/5 | items-center pt-14 pb-16 | md:ml-auto"
      >
        {isMobile ? (
          <Swiper slidesPerView={3}>
            {landingPageCategories.map((item) => (
              <SwiperSlide>
                <CategoryCircle
                  name={item.title}
                  icon={item.icon}
                  key={item.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          landingPageCategories.map((item) => (
            <CategoryCircle
              name={item.title}
              icon={item.icon}
              key={item.title}
            />
          ))
        )}
      </Grid>

      <div className="flex flex-col | items-center">
        <h1 className="text-3xl md:text-5xl | md:pb-10">Recipes of the week</h1>
        <Grid
          type="col"
          gap="2"
          size={{
            default: 1,
            md: 4,
          }}
          className="min-w-full"
        >
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
