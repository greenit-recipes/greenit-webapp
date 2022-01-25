import { useHistory } from "react-router-dom";
import { search } from "../../icons";

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
  const handleSubmit = () => {
    if (!onSubmit) {
      history.push(
        `/recipes/?search=${
          (document.getElementById(keyId) as HTMLInputElement)?.value
        }`
      );
    } else {
      onSubmit();
    }
  };
  return (
    <div className="flex flex-row h-9 w-44 mr-2 rounded-lg border-1 border-grey">
      <input
        type="text"
        className={`w-full h-full bg-transparent ml-2 | text-sm md:text-base
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
        }}
        {...(value
          ? {
              value,
            }
          : {})}
      />

      <img
        src={search}
        className="w-6 h-6 self-center mr-2"
        onClick={() => {
          handleSubmit();
        }}
      />
    </div>
  );
};
