import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "../../components/misc";
import photo from "../../components/recipe/asdf.jpg";

const RecipeSinglePage = () => {
  // @ts-ignore
  const { id } = useParams();
  return (
    <div className="grid grid-cols-12 gap-4 | pt-20">
      <div className="col-span-1"></div>
      <div className="col-span-6 text-6xl h-20 mt-4">Coconut Hair Mask</div>
      <div className="col-span-5 h-20 w-auto | flex flex-row | align-items-center | justiy-center">
        <div className="col-span-1 pr-12 pl-36">
          <Icon type="category" />
        </div>
        <div className="col-span-1 pr-12">
          <Icon type="difficulty" />
        </div>
        <div className="col-span-1 pr-12">
          <Icon type="duration" />
        </div>
      </div>
      <div className="col-span-11 text-6xl h-10"></div>
      <div
        className="h-96 | col-start-2 col-span-4 | rounded-3xl"
        style={{
          height: "32em",
          background: `url('${photo}')`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="h-96 | col-start-8 col-span-4 | rounded-3xl | flex flex-col"
        style={{ height: "32em" }}
      >
        <h1 className="text-4xl pt-12 pl-10 text-gray-500">Ingredients</h1>
        <h1 className="text-4xl pt-48 pl-10 text-gray-500">Utensils</h1>
      </div>
      <div className="col-span-12 h-20"></div>
      <div
        className="h-96 |  col-start-2 col-span-4 | rounded-3xl shadow-lg | flex flex-col"
        style={{ height: "32em" }}
      >
        <iframe
          className="w-auto h-full rounded-3xl"
          src="https://www.youtube-nocookie.com/embed/MNl90GBo3so"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      <div
        className="h-96 | col-start-8 col-span-4 | rounded-3xl shadow-lg | flex flex-col"
        style={{ height: "32em" }}
      >
        <h1 className="text-4xl pt-12 pl-10 text-gray-500">Instructions</h1>
        <h1 className="text-2xl pt-48 pl-10 text-gray-500">
          Notes from the author
        </h1>
      </div>
    </div>
  );
};
export default RecipeSinglePage;
