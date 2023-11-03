import { useEffect, useState } from 'react';
import axiosInstance from '../instance/axiosInstance';

const useFetch = (url, type) => {
    const [data, setData] = useState();
    console.log(data)
    useEffect(() => {
        const fetchData = async () => {
            if (type === 'GET') {
                const res = await axiosInstance.get(url);
                setData(res.data);
            }  
        };
        fetchData();
    }, [url]);
    return data;
};
export default useFetch;
