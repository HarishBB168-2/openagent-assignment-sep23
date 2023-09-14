import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

type AutoCompleteProps<Item> = {
  onSelect: (...args: any[]) => void;
  formatResult: (...args: any[]) => void;
  onSearch: (...args: any[]) => Promise<any>;
};

const AutoComplete = <Item,>({
  onSelect,
  formatResult,
  onSearch,
}: AutoCompleteProps<Item>) => {
  const [options, setOptions] = useState<any[]>([]);

  const handleOnSearch = async (string: string, results: any[]) => {
    const data = await onSearch(string);
    setOptions(data);
  };

  const handleOnSelect = (item: Item) => {
    onSelect(item);
  };

  return (
    <div style={{ width: "100%" }}>
      <ReactSearchAutocomplete
        items={options}
        onSelect={handleOnSelect}
        onSearch={handleOnSearch}
        autoFocus
        formatResult={formatResult}
        showIcon={false}
        styling={{
          height: "34px",
          border: "1px solid darkgreen",
          borderRadius: "4px",
          backgroundColor: "white",
          boxShadow: "none",
          hoverBackgroundColor: "lightgreen",
          color: "darkgreen",
          fontSize: "12px",
          iconColor: "green",
          lineColor: "lightgreen",
          placeholderColor: "darkgreen",
          clearIconMargin: "3px 8px 0 0",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default AutoComplete;
