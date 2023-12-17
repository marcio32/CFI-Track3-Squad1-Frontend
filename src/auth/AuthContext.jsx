import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "./AuthReducer";
import { JwtAtob } from '../helpers/JwtAtob.mjs'

const init = () => {
  return JSON.parse(localStorage.getItem('isLogged')) || { logged : false }};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [ userData, setUserData ] = useState('');
  const [isLogged, dispatch] = useReducer(AuthReducer, {}, init)

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
    if(isLogged.jwt) {
      setUserData(JwtAtob(isLogged.jwt));
    }
  }, [isLogged]);

  return <AuthContext.Provider value={{ userData, dispatch }}>
    {children}
  </AuthContext.Provider>
}