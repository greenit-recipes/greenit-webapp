import { useState } from "react";
import { SearchBar } from "../layout";
import { ICMingredients } from "./PersonalizationHelper";
import debounce from "lodash/debounce";
import { useQuery } from "@apollo/client";
import { SEARCH_AUTO_COMPLETE_RECIPE } from "pages/AutocompleteRequest";

export const IngredientSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const setSearchTermDebounced = debounce(setSearchTerm, 250);
  // Ne par run au premier lancement
  const { data: autoCompleteData, loading: autoCompleteLoading } = useQuery(
    SEARCH_AUTO_COMPLETE_RECIPE,
    {
      fetchPolicy: "network-only",
      variables: { search: searchTerm, isOnlyIngredients: true },
      skip: !searchTerm,
    },
  );

  const recipesAutoComplete = autoCompleteData?.searchAutoCompleteRecipes || {
    recipes: [],
    ingredients: [],
    totalRecipes: 0,
  };

  return (
    <div className="flex flex-col justify-center -mt-8 md:-mt-4 mx-12 md:mx-24 md:w-[700px]">
      <div className="flex justify-center text-center space-x-2 mb-3">
        <i className="bx bx-lemon text-xl mt-0.5"></i>
        <h2>Gérer mes ingrédients</h2>
      </div>
      <div className="space-y-3 mb-5">
        <h3>Les ingrédients chez moi</h3>
        <div className="md:w-1/2">
          <SearchBar
            keyId="modal-ingredients-chez-moi-searchbar"
            suggestionIsActive={true}
            placeholder="Ajouter un ingrédient"
            size="small"
            setValue={setSearchTermDebounced}
            isLoading={autoCompleteLoading}
            // @ts-ignore
            suggestions={recipesAutoComplete}
          />
        </div>
      </div>
      <div
        className={`flex flex-col md:flex-row md:flex-wrap h-80 ${
          ICMingredients.length > 6 ? "md:h-[450px]" : "md:h-56"
        } msm:space-y-4 overflow-y-auto`}
      >
        {ICMingredients.map(ingredient => (
          <div className="flex md:flex-col items-center msm:space-x-3 space-y-2 | md:mb-6">
            <img
              src={ingredient.image}
              className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover"
              alt={ingredient.alt}
            />
            <p className="w-3/5 md:h-[35%] md:w-28 md:text-center md:text-sm">
              {" "}
              {ingredient.name}
            </p>
            <div className="flex justify-center items-center md:w-12 w-9 h-9 border-red border-2 rounded-md shadow-md | cursor-pointer">
              <i
                className="bx bx-x text-red text-3xl"
                id="modal-ingredients-chez-moi-supprimer"
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div className="self-center">
        <button
          id="modal-ingredients-chez-moi-valider"
          className={`justify-center rounded-md shadow-md mt-2 p-2 h-10 flex w-full md:w-20 bg-green text-white`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default IngredientSearch;
