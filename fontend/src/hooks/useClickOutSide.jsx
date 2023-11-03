import { useEffect } from "react";

const useClickOutSide = ({...prop}) => {
    console.log(prop)
    useEffect(() => {
        const handleClickOutside = () => {
           
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [prop]);
}

export default useClickOutSide;