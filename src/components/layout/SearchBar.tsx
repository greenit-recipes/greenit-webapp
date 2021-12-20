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
    const totalSize = `w-full h-14 md:h-${isLarge ? "16" : "14"}`;
    const iconSize = `w-16 md:w-${isLarge ? "20" : "14"} h-14 md:h-${
      isLarge ? "16" : "14"
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
          className={`w-full h-full | rounded-full shadow-lg | text-xl md:${
            isLarge ? "md:text-2xl" : "text-xl"
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
            className={`${iconSize} | flex absolute -right-0 | rounded-full cursor-pointer bg-white`}
            style={{ backgroundColor: "white" }}
          >
            <img
              src={search}
              className={`w-10 h-10 md:h-${isLarge ? "10" : "9"} md:w-${
                isLarge ? "10" : "9"
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