import { urlBase } from "./apiPath";
import axios from "axios"

export const getUsers = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    
    const response = await axios.get(`${urlBase}User` , { headers });
    return response.data;
}

export const deleteUser = async (userId, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await axios.delete(`${urlBase}User/${userId}`, { headers });
    return response.data;
}