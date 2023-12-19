import axios from "axios";
import { urlBase } from "./apiPath";


export const getAccount = async (userId) => {
    const response = await axios.get(`${urlBase}Account/details/${userId}`);
    return response.data;
}

export const getAllAccounts = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await axios.get(`${urlBase}Account`, { headers});
    return response.data;
}

export const deleteAccount = async (accountId, token ) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await axios.delete(`${urlBase}Account/${accountId}`, { headers });
    return response.data;
}

export const editAccount = async (accountId, accountData, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await axios.put(`${urlBase}Account/${accountId}`, accountData, { headers });
    return response.data;
}