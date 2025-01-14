import { Dispatch, useEffect, useState } from "react";

const PREFIX = "chatapp-widget-";

const useLocalStorage = (
  key: string,
  initialValue?: any
): [any, Dispatch<any>] => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null && jsonValue != "undefined")
      return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
