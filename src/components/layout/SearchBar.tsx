import {
  getObjectSession,
  setObjectFilterSession,
} from "helpers/session-helper";
import { Link, useHistory } from "react-router-dom";
import { search } from "../../icons";
import { RouteName } from "App";
import { useEffect, useState } from "react";
import "./SearchBar.css";
import { isEmpty } from "lodash";

export const SearchBar: React.FC<{
  size?: "small" | "large";
  setValue?: (val: string) => void;
  value?: string;
  onSubmit?: () => void;
  keyId?: string;
  suggestions?: {
    recipes: [{ name: string; urlId: string }];
    ingredients: [{ name: string }];
    otherSearch: number;
  };
  suggestionIsActive?: boolean;
  isLoading?: boolean;
  hideSearchIcon?: boolean;
}> = ({
  size = "large",
  value = "",
  suggestions = { recipes: [], ingredients: [], otherSearch: 0 },
  suggestionIsActive = false,
  setValue,
  isLoading = false,
  onSubmit,
  hideSearchIcon,
  keyId = "search",
}) => {
  const isLarge = size === "large";
  const history = useHistory();
  const totalSize = `w-full h-10 md:h-${isLarge ? "14" : "10"}`;
  const iconSize = `w-10 md:w-${isLarge ? "16" : "10"} h-10 md:h-${
    isLarge ? "12" : "10"
  }`;
  const handleSubmit = () => {
    if (!onSubmit) {
      const currentSearchValue = {
        search: (document.getElementById(keyId) as HTMLInputElement)?.value,
      };
      setObjectFilterSession(
        getObjectSession("filterListPage"),
        currentSearchValue
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
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
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
    return filteredSuggestions?.recipes.length ? (
      <div className="suggestions-box">
        <ul className="suggestions">
          {/* @ts-ignore */}
          {!isEmpty(filteredSuggestions?.recipes) && <li>recette</li>}
          {/* @ts-ignore */}
          {filteredSuggestions?.recipes.map((suggestion, index) => {
            return (
              <li key={index} onClick={onClickRecipes}>
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
          {  !isEmpty(filteredSuggestions?.ingredients) && <li>ingredient</li>}
          {/* @ts-ignore */}
          {filteredSuggestions?.ingredients.map((suggestion, index) => {
            return (
              <li  key={index} onClick={onClick}>
                {suggestion?.name}
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <div className="no-suggestions mr-8">
        <span role="img" aria-label="tear emoji">
          😪
        </span>{" "}
        <em>Aucun Résultat ...</em>
      </div>
    );
  };

  return (
    <div
      className={`${totalSize} | flex | relative bg-white rounded-xl border-1 border-grey `}
    >
      <input
        type="text"
        className={`text-base md:text-lg bg-transparent
          } | pl-5 w-full | focus:outline-none`}
        onKeyDown={onKeyDown}
        onFocus={(event) => {
          event.target.setAttribute("autocomplete", "off");
        }}
        placeholder="Recherche ..."
        id={keyId}
        value={input}
        onChange={onChange}
      />
      {!hideSearchIcon && (
        <div
          className={`${iconSize} | flex absolute right-1 | self-center rounded-full cursor-pointer`}
        >
          <img
            src={search}
            alt="search icon"
            className={`w-6 h-6 md:w-8 md:h-8
              } | self-center | ml-auto mr-auto`}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      )}
      {showSuggestions && input && suggestionIsActive && (
        <SuggestionsListComponent />
      )}
    </div>
  );
};
