/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    "$2b$10$aWfqsPsTDtK5bAn1f4Z/OON.dop2fMVzCj9XwlrnV3zlpKxEWggiO"
  );
  //Programmatic Redirection: Navigate to different routes based on application state or conditions.
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    navigate,
    token,
    setToken,
  };
  return (
    //Wrapping: {props.children}
    // includes any components or elements that are nested inside ShopContextProvider.
    // These nested components will have access to the context values.
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;