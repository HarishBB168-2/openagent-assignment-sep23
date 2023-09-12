import { ReactSearchAutocomplete } from "react-search-autocomplete";

type AutoCompleteProps<Item> = {
  onSelect: (...args: any[]) => void;
  options: Item[];
};

const AutoComplete = <Item,>({
  onSelect,
  options,
}: AutoCompleteProps<Item>) => {
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    onSelect(item);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };
  return (
    <div style={{ width: "100%" }}>
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
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
          fontFamily: "Courier",
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
