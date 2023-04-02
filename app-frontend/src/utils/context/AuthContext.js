// import { createContext } from "react";

// export const AuthContext = createContext({
//   updateAuthUser: () => {},
// });

const { useContext, createContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const handleSetUser = (account) => {
    localStorage.removeItem("Restaurant-Account");
    localStorage.setItem("Restaurant-Account", JSON.stringify(account));
    setUser(account);
  };
  const value = { user, updateAuthUser: handleSetUser };
  useEffect(() => {
    if (
      localStorage.getItem("Restaurant-Account") !== undefined &&
      localStorage.getItem("Restaurant-Account") !== "undefined"
    ) {
      const localUser = JSON.parse(localStorage.getItem("Restaurant-Account"));
      if (localUser) {
        setUser(localUser);
      }
    }
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuthContext must be used in AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
