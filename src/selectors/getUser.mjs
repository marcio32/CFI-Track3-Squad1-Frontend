const urlBase = 'https://localhost:7067/api/'

import axios from "axios"

export const getUsers = async () => {
    try {
        const response = await axios.get(`${urlBase}User`);
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}