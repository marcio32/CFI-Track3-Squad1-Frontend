import { urlBase } from "./apiPath";
import axios from "axios"

export const getUsers = async () => {
    const response = await axios.get(`${urlBase}User`);
    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await axios.delete(`${urlBase}User/${userId}`);
    return response.data;
}