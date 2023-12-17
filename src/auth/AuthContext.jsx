import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "./AuthReducer";
import { JwtAtob } from '../helpers/JwtAtob.mjs'
import PropTypes from 'prop-types';

const init = () => {
  return JSON.parse(localStorage.getItem('isLogged')) || { logged: false }
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState({});
  const [isLogged, dispatch] = useReducer(AuthReducer, {}, init)

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
    if (isLogged.jwt) {
      setUserData(JwtAtob(isLogged.jwt));
    }
  }, [isLogged]);
  
  return <AuthContext.Provider value={{ userData, dispatch, isLogged }}>
    {children}
  </AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.any
}