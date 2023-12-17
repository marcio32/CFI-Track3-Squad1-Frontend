import axios from "axios";
import { urlBase } from "../selectors/apiPath";

export const LoginServices = async(userData) => {
    const response = await axios.post(`${urlBase}Auth`, userData);
    return response.data;
}