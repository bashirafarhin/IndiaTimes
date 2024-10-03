import { createContext, useState } from "react";

export const NewsContext = createContext();

export const NewsContextProvider = ({ children }) => {
  const [news, setNews] = useState({
    ndtvnews: [],
    bbcnews: [],
    timesnownews: [],
    hindustantimesnews: [],
    newyorktimesnews: [],
  });

  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
