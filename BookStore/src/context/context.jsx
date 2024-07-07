import React, { useContext } from "react";
import useFetchBooks from "../hook/useFetchBooks";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { books, loading, resultTitle, setSearchTerm } =
    useFetchBooks("the lost world");

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
