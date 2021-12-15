
interface FilterBarItem {
    item: Record<string, any>;
    handleFilter: (
      isSelected: boolean,
      option: { title: string; value: string },
      item: Record<string, any>
    ) => void;
    currentFilters: Record<string, any>;
  }
  
export const FilterBarItem: React.FC<FilterBarItem> = ({
    item,
    handleFilter,
    currentFilters,
  }) => {
    return (
      <div className="lg:pt-5 mb-5 content-center text-center lg:text-left">
        <h1 className="text-2xl text-gray-600 mb-2">{item.title}</h1>
        {item.options.map(
          (option: { title: string; value: string }, index: any) => {
            const isSelected =
              currentFilters[item.name] === (option.value || option.title);
            return (
              <div className="text-xl mb-2 cursor-pointer" key={index}>
                <h3
                  className={
                    isSelected ? "text-green underline" : "text-gray-700"
                  }
                  onClick={() => {
                    handleFilter(isSelected, option, item);
                  }}
                >
                  {option.title}
                </h3>
              </div>
            );
          }
        )}
      </div>
    );
  };