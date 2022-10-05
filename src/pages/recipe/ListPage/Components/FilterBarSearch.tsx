import { SearchBar } from "../../../../components";

export const FilterBarSearch: React.FC<{
  setCurrentFilters: (data: Record<string, any>) => void;
  search: string;
  customClass: string;
  recipesAutoComplete: any;
  keyId: string;
  setSearch?: (val: string) => void;
}> = ({
  setCurrentFilters,
  search,
  customClass,
  keyId,
  recipesAutoComplete,
  setSearch,
}) => {
  return (
    <div className={customClass}>
      <SearchBar
        keyId={keyId}
        customClassList={"z-40"}
        size="large"
        suggestionIsActive={true}
        suggestions={recipesAutoComplete}
        setValue={setSearch}
      />
    </div>
  );
};
