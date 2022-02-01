import { useHistory } from "react-router-dom";
import { search } from "../../icons";
import { RouteName } from "App";

export const SearchBar: React.FC<{
    size?: "small" | "large";
    setValue?: (val: string) => void;
    value?: string;
    onSubmit?: () => void;
    keyId?: string;
    hideSearchIcon?: boolean;
  }> = ({ size = "large", value, setValue, onSubmit, hideSearchIcon, keyId = "search" }) => {
    const isLarge = size === "large";
    const history = useHistory();
    const totalSize = `w-full h-10 md:h-${isLarge ? "14" : "10"}`;
    const iconSize = `w-10 md:w-${isLarge ? "16" : "10"} h-10 md:h-${
      isLarge ? "12" : "10"
    }`;
    const handleSubmit = () => {
      if (!onSubmit) {
        history.push(
          `${RouteName.recipes}/?search=${
            (document.getElementById(keyId) as HTMLInputElement)?.value
          }`
        );
      } else {
        onSubmit();
      }
    };
    return (
      <div className={`${totalSize} | flex | relative bg-white rounded-xl border-1 border-grey `}>
        <input
          type="text"
          className={`text-base md:text-lg bg-transparent
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
          }}
          {...(value
            ? {
                value,
              }
            : {})}
        />
        {!hideSearchIcon && (
          <div
            className={`${iconSize} | flex absolute right-1 | self-center rounded-full cursor-pointer`}
          >
            <img
              src={search}
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