import { useCallback, useContext, useState } from "react";
import { LoginServices } from "../helpers/loginService.mjs";
import { AuthContext } from "../auth/AuthContext";
import { types } from '../types/types';

export const useUser = () => {

    const { dispatch } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState({ loading: false, error: false, status: '' });

    const login = useCallback(async (userData) => {
        try {
            const response = await LoginServices(userData);
            const { data } = response;

            window.localStorage.setItem('jwt', JSON.stringify(data));

            dispatch({
                logged : true,
                jwt : data
            })
        }
        catch (error) {
            window.localStorage.removeItem('jwt');
            if (error.response && error.response.status == 401) {
                setIsLoading({ loading: true, error: true, status: 401 })
            } else {
                setIsLoading({ loading: true, error: true, status: 'Error inesperado. Intente nuevamente.' })
            }
        }
    }, [dispatch])

    const logout = useCallback(() => {
        window.localStorage.removeItem('jwt');
        dispatch({ type: types.logout })
    }, [dispatch])

    return {
        isLoading,
        login,
        logout
    }
}