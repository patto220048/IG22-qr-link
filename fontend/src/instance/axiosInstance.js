import axios  from 'axios';
class Http{
    constructor(){
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_URL_API,
            withCredentials: true,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    }
}
const http = new Http().instance;

export default http;
