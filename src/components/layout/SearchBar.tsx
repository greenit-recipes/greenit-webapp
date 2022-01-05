import { useHistory } from "react-router-dom";
import { search } from "../../icons";

export const SearchBar: React.FC<{
    size?: "small" | "large";
    setValue?: (val: string) => void;
    value?: string;
    onSubmit?: () => void;
    hideSearchIcon?: boolean;
  }> = ({ size = "large", value, setValue, onSubmit, hideSearchIcon }) => {
    const isLarge = size === "large";
    const history = useHistory();
    const totalSize = `w-full h-12 md:h-${isLarge ? "16" : "12"}`;
    const iconSize = `w-12 md:w-${isLarge ? "20" : "12"} h-12 md:h-${
      isLarge ? "16" : "12"
    }`;
    const handleSubmit = () => {
      if (!onSubmit) {
        history.push(
          `/recipes/?search=${
            (document.getElementById("search") as HTMLInputElement)?.value
          }`
        );
      } else {
        onSubmit();
      }
    };
    return (
      <div className={`${totalSize} | flex | relative`}>
        <input
          type="text"
          className={`w-full h-full | rounded-full shadow-lg | text-base md:text-xl
          } | pl-5`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Recherche ..."
          id="search"
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
            className={`${iconSize} | flex absolute right-1 | rounded-full cursor-pointer`}
            style={{ backgroundColor: "white" }}
          >
            <img
              src={search}
              className={`w-8 h-8 md:w-10 md:h-10
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