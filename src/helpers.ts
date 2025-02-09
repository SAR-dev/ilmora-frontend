import { constants } from "constants";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  
  export const setAuthToken = () => {
    const token = localStorage.getItem(constants.AUTH_TOKEN_API);
    api.defaults.headers['Authorization'] = token ? `Bearer ${JSON.parse(token)}` : "";
  };
    
  setAuthToken()