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
    <div className="flex flex-col justify-center -mt-8 mx-12">
      <div className="flex justify-center text-center space-x-2 mb-3">
        <i className="bx bx-lemon text-xl mt-0.5"></i>
        <h2>Gérer mes ingrédients</h2>
      </div>
      <div className="space-y-3 mb-5">
        <h3>Les ingrédients chez moi</h3>
        {/*Todo: Investigate why I can't type in the searchbar*/}
        <SearchBar
          suggestionIsActive={true}
          placeholder="Ajouter un ingrédient"
          keyId="searchIngredientAtHome"
          size="small"
          setValue={setSearchTermDebounced}
          isLoading={autoCompleteLoading}
          // @ts-ignore
          suggestions={recipesAutoComplete}
        />
      </div>
      <div className="flex flex-col h-80 space-y-4 overflow-y-auto">
        {ICMingredients.map(ingredient => (
          <div className="flex items-center space-x-3">
            <img
              src={ingredient.image}
              className="w-16 h-16 md:w-24 md:h-24 rounded-md object-cover"
              alt={ingredient.alt}
            />
            <p> {ingredient.name}</p>
            <div className="flex justify-center items-center w-9 h-9 border-red border-2 rounded-md shadow-md">
              <i className="bx bx-x text-red text-3xl"></i>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className={`justify-center rounded-md shadow-md mt-2 p-2 h-10 flex w-full bg-green text-white`}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default IngredientSearch;
