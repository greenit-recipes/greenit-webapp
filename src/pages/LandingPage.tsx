import React from "react";
import { RecipeCard } from "../components";
import { Navbar } from "../components/misc";
import useIsMobile from "../hooks/isMobile";
import { landingPageCategories } from "../icons";

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
    <div className="flex flex-col | items-center">
      <div className="w-28 h-28 | rounded-full shadow-lg">
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
      <div className="w-4/5 | items-center | grid grid-cols-9 gap-4 | pt-28 pb-32 | ml-auto">
        {landingPageCategories.map((item) => (
          <CategoryCircle name={item.title} icon={item.icon} key={item.title} />
        ))}
      </div>
      <div className="flex flex-col | items-center">
        <h1 className="text-3xl md:text-5xl | pb-10">Recipes of the week</h1>
        <div className="w-3/5 | grid grid-cols-3 gap-4">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
