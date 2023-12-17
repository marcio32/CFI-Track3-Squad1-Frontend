import { useCallback, useContext, useState } from "react";
import { LoginServices } from "../helpers/loginService.mjs";
import { AuthContext } from "../auth/AuthContext";
import { types } from '../types/types';

export const useUser = () => {

    const { dispatch } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState({ loading: false, error: false, status: '' });

    const login = useCallback(async (userData) => {

        setIsLoading({ loading: true, error: false, status: '' })
        try {
            const response = await LoginServices(userData);
            const { data } = response || {};
            
            window.localStorage.setItem('isLogged', JSON.stringify(data));

            dispatch({
                type: types.login,
                payload: {
                    jwt: data,
                }
            })
            setIsLoading({ loading: false, error: false, status: '' })
        }
        catch (error) {
            window.localStorage.removeItem('isLogged');
            if (error.response && error.response.status == 401) {
                setIsLoading({ loading: false, error: true, status: 401 })
            } else {
                setIsLoading({ loading: false, error: true, status: 'Error inesperado. Intente nuevamente.' })
            }
        }
    }, [dispatch])

    const logout = useCallback(() => {
        window.localStorage.removeItem('isLogged');
        dispatch({ type: types.logout })
    }, [dispatch])

    return {
        isLoading,
        setIsLoading,
        login,
        logout
    }
}