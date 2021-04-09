import React, { useState } from "react";
import { RecipeCard, Navbar, Footer } from "../../components";
import useIsMobile from "../../hooks/isMobile";

const filters = [
  {
    title: "House",
    name: "house",
    options: [
      { title: "Sanitation", value: "sanitation" },
      { title: "Decoration", value: "decoration" },
      { title: "Utilites", value: "utilities" },
    ],
  },
  {
    title: "Body",
    name: "body",
    options: [
      { title: "Hygiene", value: "hygiene" },
      { title: "Care", value: "care" },
    ],
  },
  {
    title: "Face",
    name: "face",
    options: [
      { title: "Care", value: "care" },
      { title: "Make up", value: "make_up" },
    ],
  },
  {
    title: "Hair",
    name: "hair",
    options: [{ title: "Care", value: "care" }],
  },
  {
    title: "Wellbeing",
    name: "wellbeing",
    options: [
      { title: "Health", value: "health" },
      { title: "Relaxation", value: "relaxation" },
    ],
  },
  {
    title: "Duration",
    name: "duration",
    options: [
      { title: "Under 15 minutes", value: "15min" },
      { title: "Under 30 minutes", value: "30min" },
      { title: "Under 1 hour", value: "1hour" },
    ],
  },
  {
    title: "Additional Categories",
    name: "additional_categories",
    options: [
      { title: "Quick start", value: "quick_start" }, // TODO find  a more appropriate word
      { title: "Zero waste", value: "zero_waste" },
      { title: "Easily available ingredients", value: "easily_available" },
    ],
  },
  {
    title: "Difficulty",
    name: "difficulty",
    options: [
      { title: "Easy", value: "easy" },
      { title: "Medium", value: "medium" },
      { title: "Hard", value: "hard" },
    ],
  },
];

const RecipeListPage = () => {
  const isMobile = useIsMobile();
  const [currentFilters, setCurrentFilters] = useState<string[]>([]);

  const handleFilter = ({
    filter,
    value,
  }: {
    filter: string;
    value: string;
  }) => {
    setCurrentFilters((prevState) => {
      const item = `${filter}:${value}`;
      const index = prevState.indexOf(item);
      if (index === -1) {
        return [...prevState, item];
      } else {
        const _filters = [...prevState];
        delete _filters[index];
        return _filters;
      }
    });
  };
  return (
    <>
      <Navbar />
      <div className="flex pt-10">
        {/* SIDEBAR */}
        {!isMobile && (
          <div className="sticky py-12 top-0 w-1/10 pl-10">
            <h1 className="text-2xl">Filter</h1>
            {filters.map((filter) => (
              <div className="pt-5">
                <h1 className="text-xl">{filter.title}</h1>
                {filter.options.map((option) => (
                  <div
                    className="text-lg pt-1 cursor-pointer"
                    onClick={() => {
                      handleFilter({
                        filter: filter.name,
                        value: option.value,
                      });
                    }}
                  >
                    {currentFilters.some(
                      (item) => item === `${filter.name}:${option.value}`
                    ) ? (
                      <div className="flex flex-row">
                        <h3 className="text-black">{option.title}</h3>
                        <h3 className="text-black pl-2">X</h3>
                      </div>
                    ) : (
                      <h3 className="text-gray-500">{option.title}</h3>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {/* CONTENT */}
        <div className="h-auto w-full | sticky top-0 pb-20">
          <div className="w-auto | grid grid-cols-1 md:grid-cols-5 gap-y-10 | py-10 lg:px-0">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default RecipeListPage;
