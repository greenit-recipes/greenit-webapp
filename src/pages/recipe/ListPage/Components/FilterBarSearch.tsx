import useIsMobile from "../../../../hooks/isMobile";
import { SearchBar } from "../../../../components";

export const FilterBarSearch: React.FC<{
    setCurrentFilters: (data: Record<string, any>) => void;
    search: string;
    setSearch: (val: string) => void;
  }> = ({ setCurrentFilters, search, setSearch }) => {
    const isMobile = useIsMobile();
    return (
      <div className="">
        <SearchBar
          keyId={"filterBarSearch"}
          size="small"
          value={search}
          setValue={setSearch}
          hideSearchIcon={isMobile}
          onSubmit={() => {
            setCurrentFilters((prevState: Record<string, any>) => {
              return {
                ...prevState,
                search: search,
              };
            });
          }}
        />
      </div>
    );
  };