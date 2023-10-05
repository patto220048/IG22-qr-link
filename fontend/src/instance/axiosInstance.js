import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API_1,
    credentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
export default axiosInstance;
