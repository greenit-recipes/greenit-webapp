import React from "react";
import { RecipeCard } from "../../components";
import useIsMobile from "../../hooks/isMobile";

const RecipeListPage = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex gap-x-32">
        {/* SIDEBAR */}
        {!isMobile && (
          <div className="sticky top-0 w-1/6 shadow-lg pr-24"></div>
        )}
        {/* CONTENT */}
        <div className="h-screen sticky top-0 w-full">
          {["BODY / FACE", "HOME", "WELLBEING"].map((item) => (
            <div>
              <div className="w-auto | grid grid-cols-1 md:grid-cols-4 gap-4 | py-10 lg:px-0">
              <div className="md:col-span-4 md:pb-10 justify-self-center md:justify-self-start">
                <h1 className="text-4xl lg:px-10">{item}</h1>
              </div>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default RecipeListPage;
