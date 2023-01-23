import { useState, useEffect } from "react";

function getStorageValue(key:string, defaultValue:unknown) {
  // getting stored value
  const saved : string | null= localStorage.getItem(key);
  const initial = JSON.parse(saved ? saved : "");
  return initial || defaultValue;
}

export const useLocalStorage = (key : string, defaultValue : object) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};