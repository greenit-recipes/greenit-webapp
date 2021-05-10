import React, { useState } from "react";
import { RecipeCard, Navbar, Footer } from "../../components";
import useIsMobile from "../../hooks/isMobile";
import { useRecipesQuery, DifficultyChoice } from "../../graphql";

const filters = [
  {
    title: "House",
    name: "house",
    options: [
      { title: "Sanitation", value: "1cb1a8aa-d483-4c13-ae66-a71c7413c639" },
      { title: "Decoration", value: "affe5a2e-a8e4-417b-b4fe-c94b74d97e79" },
      { title: "Utilites", value: "utilities" },
    ],
  },
  {
    title: "Body",
    name: "body",
    options: [
      { title: "Hygiene", value: "d811789c-5c6c-4a70-851b-773f774a2a92" },
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
      { title: "Under 15 minutes", value: 15 },
      { title: "Under 30 minutes", value: 30 },
      { title: "Under 1 hour", value: 60 },
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
      { title: "Beginner", value: "BEGINNER" },
      { title: "Intermediate", value: "INTERMEDIATE" },
      { title: "Advanced", value: "ADVANCED" },
    ],
  },
];

const RecipeListPage = () => {
  const { error, loading, data, refetch } = useRecipesQuery();
  const isMobile = useIsMobile();
  const [currentFilters, setCurrentFilters] = useState<any[]>([]);
  const handleFilter = (item: { filter: string; value: string | number }) => {
    setCurrentFilters((prevState) => {
      const index = prevState.findIndex(
        ({ filter, value }) => filter === item.filter && value === item.value
      );
      if (index === -1) {
        return [...prevState, item];
      } else {
        const _filters = [...prevState];
        _filters.splice(index, 1);
        return _filters;
      }
    });
  };
  React.useEffect(() => {
    const filter = {};
    currentFilters.forEach((item) => {
      // @ts-ignore
      filter[item.filter] = item.value;
    });
    console.log(filter);
    refetch({
      filter,
    });
  }, [currentFilters]);

  if (loading || !data) {
    return <div>Loading</div>;
  }

  const recipes = data.allRecipes;
  return (
    <>
      {!isMobile && <Navbar />}
      <div className="flex pt-10">
        {/* SIDEBAR */}
        {!isMobile && (
          <div className="sticky py-12 top-0 w-1/10 pl-10">
            <h1 className="text-2xl">Filter</h1>
            {filters.map((filter) => (
              <div className="pt-5">
                <h1 className="text-xl">{filter.title}</h1>
                {/* @ts-ignore */}
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
                      (item) =>
                        item.value === option.value &&
                        item.filter === filter.name
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
          <div className="w-auto | flex flex-row flex-wrap gap-10 | py-10 lg:px-0 | justify-center">
            {recipes?.map((recipe, index) => (
              <div className="pl-10">
                <RecipeCard recipe={recipe ?? undefined} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default RecipeListPage;
