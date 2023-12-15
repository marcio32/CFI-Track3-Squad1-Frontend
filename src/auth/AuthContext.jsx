import { createContext, useReducer, useEffect, useState } from "react";
import { AuthReducer } from "./AuthReducer";
import { JwtAtob } from '../helpers/JwtAtob.mjs'

const init = () => {
  return JSON.parse(localStorage.getItem('jwt')) || { logged : false} ;
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [ userData, setUserData ] = useState('');
  const [jwt, dispatch] = useReducer(AuthReducer, {}, init)

  useEffect(() => {
    localStorage.setItem('jwt', JSON.stringify(jwt));
    if(jwt) {
      setUserData(JwtAtob(jwt))
    }
  }, [jwt]);

  return <AuthContext.Provider value={{ userData, dispatch }}>
    {children}
  </AuthContext.Provider>
}