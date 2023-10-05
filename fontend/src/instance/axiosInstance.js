import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API_1 || import.meta.env.VITE_URL_API_2 ,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Access-Control-Allow-Origin': '*',
        
    },
});
export default axiosInstance;
