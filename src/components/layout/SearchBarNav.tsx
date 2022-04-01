import { useHistory } from "react-router-dom";
import { search } from "../../icons";
import { RouteName } from "App";
import { getObjectSession, setObjectFilterSession } from "helpers/session-helper";
import { useState } from "react";

export const SearchBarNav: React.FC<{
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
    <div className="flex flex-row h-9 w-44 mr-2 rounded-lg border-1 border-grey">
      <input
        type="text"
        className={`w-full h-full bg-transparent ml-2 | text-sm md:
          } focus:outline-none`}
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

      <img
        alt="search icon"
        src={search}
        className="w-6 h-6 self-center mr-2"
        onClick={() => {
          handleSubmit();
        }}
      />
    </div>
  );
};
