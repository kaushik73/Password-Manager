import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  clearSessionItem,
  getSessionData,
  setSessionData,
} from "../utils/utlis";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (decryptedPassword) => {
    setIsLoggedIn(true);
    setSessionData(decryptedPassword);
  };

  const logout = () => {
    setIsLoggedIn(false);
    clearSessionItem("user-data");
  };

  useEffect(() => {
    const sessionData = getSessionData();
    if (sessionData != null) {
      setIsLoggedIn(true);
    }
  }, []);

  AuthProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
