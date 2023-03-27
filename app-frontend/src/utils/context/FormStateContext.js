const { useContext, createContext, useState, useEffect } = require("react");

const FormStateContext = createContext();

const FormStateProvider = (props) => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [adminNavbarState, setAdminNavbarState] = useState({
    isOpen: false,
    openning: [],
  });
  const value = {
    openSignIn,
    setOpenSignIn,
    openSignUp,
    setOpenSignUp,
    adminNavbarState,
    setAdminNavbarState,
  };
  useEffect(() => {}, []);
  return <FormStateContext.Provider value={value} {...props}></FormStateContext.Provider>;
};

const useFormStateContext = () => {
  const context = useContext(FormStateContext);
  if (typeof context === "undefined") {
    throw new Error("useFormStateContext must be used in FormStateProvider");
  }
  return context;
};

export { FormStateProvider, useFormStateContext };
