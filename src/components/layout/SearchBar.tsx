import { RouteName } from "App";
import { getObjectSession, setObjectFilterSession } from "helpers/session-helper";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { search } from "../../icons";

export const SearchBar: React.FC<{
  size?: "small" | "large";
  setValue?: (val: string) => void;
  value?: string;
  onSubmit?: () => void;
  keyId?: string;
  hideSearchIcon?: boolean;
}> = ({
  size = "large",
  value,
  setValue,
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
  const [currentValue, setCurrentValue] = useState(value || "");
  const handleSubmit = () => {
    if (!onSubmit) {
      const currentSearchValue = {
        search: (document.getElementById(keyId) as HTMLInputElement)?.value,
      };
      setObjectFilterSession(getObjectSession('filterListPage'), currentSearchValue)
      history.push(RouteName.recipes);
    } else {
      onSubmit();
    }
  };
  return (
    <div
      className={`${totalSize} | flex | relative bg-white rounded-xl border-1 border-grey `}
    >
      <input
        type="text"
        className={` md:text-lg bg-transparent
          } | pl-5 w-full | focus:outline-none`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Recherche ..."
        id={keyId}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          } 
          setCurrentValue(e.target.value)
        }}
        value={currentValue}
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
    </div>
  );
};
