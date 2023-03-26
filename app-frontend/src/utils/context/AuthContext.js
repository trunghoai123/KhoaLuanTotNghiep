// import { createContext } from "react";

// export const AuthContext = createContext({
//   updateAuthUser: () => {},
// });

const { useContext, createContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const value = { user, updateAuthUser: setUser };
  useEffect(() => {}, []);
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
