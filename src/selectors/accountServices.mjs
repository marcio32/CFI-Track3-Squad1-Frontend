import axios from "axios";
import { urlBase } from "./apiPath";


export const getAccount = async (userId) => {
    const response = await axios.get(`${urlBase}Account/details/${userId}`);
    return response.data;
}

export const getAllAccounts = async () => {
    const response = await axios.get(`${urlBase}Account`);
    return response.data;
}

export const deleteAccount = async (accountId) => {
    const response = await axios.delete(`${urlBase}Account/${accountId}`);
    return response.data;
}

export const editAccount = async (accountId, accountData) => {
    console.log(accountData)
    const response = await axios.put(`${urlBase}Account/${accountId}`, accountData);
    return response.data;
}