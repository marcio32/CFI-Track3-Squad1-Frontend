import axios from "axios";
import { urlBase } from "./apiPath";


export const getAccount = async(userId) => {
    const response = await axios.get(`${urlBase}Account/details/${userId}`);
    return response.data
}