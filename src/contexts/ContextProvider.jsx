import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const tempUrl = "http://localhost:5000";
// export const tempUrl = "https://retail-bes.herokuapp.com";

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
