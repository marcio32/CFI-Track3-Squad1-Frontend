const urlBase = 'https://localhost:7067/api/'

import axios from "axios"

export const getUsers = async () => {
    const response = await axios.get(`${urlBase}User`);
    return response.data.data;
}

export const deleteUser = async (userId) => {
    const response = await axios.delete(`${urlBase}User/${userId}`);
    return response.data.data;
}