import {
  getObjectSession,
  setObjectFilterSession,
} from "helpers/session-helper";
import { Link, useHistory } from "react-router-dom";
import { RouteName } from "App";
import { useEffect, useState } from "react";
import "./SearchBar.css";
import { isEmpty } from "lodash";
import { GoSearch } from "react-icons/go";

export const SearchBar: React.FC<{
  size?: "small" | "large";
  setValue?: (val: string) => void;
  value?: string;
  onSubmit?: () => void;
  keyId?: string;
  customClassList?: string;
  suggestions?: {
    recipes: [{ name: string; urlId: string }];
    ingredients: [{ name: string }];
    totalRecipes: number;
  };
  suggestionIsActive?: boolean;
  isLoading?: boolean;
  hideSearchIcon?: boolean;
}> = ({
  size = "large",
  value = "",
  suggestions = { recipes: [], ingredients: [], totalRecipes: 0 },
  suggestionIsActive = false,
  setValue,
  customClassList,
  isLoading = false,
  onSubmit,
  hideSearchIcon,
  keyId = "search",
}) => {
  const isLarge = size === "large";
  const history = useHistory();
  const totalSize = `w-full h-10 md:h-${isLarge ? "12" : "10"}`;
  const iconSize = `w-10 md:w-${isLarge ? "16" : "10"} h-10 md:h-${
    isLarge ? "12" : "10"
  }`;
  const handleSubmit = () => {
    if (!onSubmit) {
      const currentSearchValue = {
        search: (document.getElementById(keyId) as HTMLInputElement)?.value,
      };
      window.sessionStorage.setItem(
        "filterListPage",
        JSON.stringify(currentSearchValue),
      );
      history.push(RouteName.recipes);
    } else {
      onSubmit();
    }
  };

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState(value || "");

  useEffect(() => {
    // Filter our suggestions that don't contain the user's input
    if (!suggestionIsActive) return;
    if (!suggestions) return;
    if (
      suggestions?.recipes.length === 0 &&
      suggestions?.ingredients.length === 0 &&
      isLoading
    )
      return;
    // @ts-ignore
    setFilteredSuggestions(suggestions);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  }, [suggestionIsActive, suggestions, isLoading]);

  const onChange = (e: any) => {
    const userInput = e.target.value;

    if (setValue) {
      setValue(userInput);
    }
    setInput(userInput);
  };

  const onClick = (e: any) => {
    const currentSearchValue = {
      search: e.target.innerText,
    };
    window.sessionStorage.setItem(
      "filterListPage",
      JSON.stringify(currentSearchValue),
    );
    history.push(RouteName.recipes);
  };

  const onClickRecipes = (e: any) => {};

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
    /*
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    } */
  };

  const SuggestionsListComponent = () => {
    /* @ts-ignore */
    return filteredSuggestions?.recipes.length ||
      /* @ts-ignore */
      filteredSuggestions?.ingredients.length ? (
      <div
        className={
          "suggestions-content suggestions-box z-50 " + customClassList
        }
      >
        <ul className="suggestions">
          {/* @ts-ignore */}
          {!isEmpty(filteredSuggestions?.recipes) && (
            <li className="text-sm text-blue mt-2 search-recipe">Recettes</li>
          )}
          {/* @ts-ignore */}
          {filteredSuggestions?.recipes.map((suggestion, index) => {
            return (
              <li key={index}>
                <Link
                  to={{
                    pathname: `${RouteName.recipes}/${suggestion?.urlId}`,
                  }}
                >
                  {suggestion?.name}
                </Link>
              </li>
            );
          })}
          {/* @ts-ignore */}
          {!isEmpty(filteredSuggestions?.ingredients) && (
            <li className="text-sm text-blue mt-2 search-ingredient">
              Ingrédients
            </li>
          )}
          {/* @ts-ignore */}
          {filteredSuggestions?.ingredients.map((suggestion, index) => {
            return (
              <li key={index} onClick={onClick}>
                {suggestion?.name}
              </li>
            );
          })}
          <li
            className="cursor-pointer text-sm mt-3 mb-5"
            onClick={() => {
              handleSubmit();
            }}
          >
            {" "}
            Tous les résultats ({suggestions?.totalRecipes})
          </li>
        </ul>
      </div>
    ) : (
      <div className="suggestions-content no-suggestions mr-8">
        <span role="img" aria-label="tear emoji">
          😪
        </span>{" "}
        <em>Aucun Résultat ...</em>
      </div>
    );
  };

  return (
    <div
      className={`${totalSize} | flex | relative bg-white rounded-md border-1 border-darkBlue`}
    >
      {!hideSearchIcon && (
        <div
          className={`${iconSize} | flex | self-center rounded-full cursor-pointer`}
        >
          <GoSearch
            className={`w-6 h-6
              } | self-center | ml-auto mr-auto`}
            onClick={() => {
              handleSubmit();
            }}
          ></GoSearch>
        </div>
      )}
      <input
        type="text"
        className={`text-base bg-transparent
          } | w-full | focus:outline-none search-bar`}
        onKeyDown={onKeyDown}
        onFocus={event => {
          event.target.setAttribute("autocomplete", "off");
        }}
        placeholder="Je cherche une recette, un ingrédient..."
        id={keyId}
        value={input}
        onChange={onChange}
      />
      {showSuggestions && input && suggestionIsActive && (
        <SuggestionsListComponent />
      )}
    </div>
  );
};
