import axios from "axios";
const baseUrl = 'https://localhost:7067/api/'

export const LoginServices = async(userData) => {
    const response = await axios.post(`${baseUrl}Auth`, userData);
    return response.data;
}