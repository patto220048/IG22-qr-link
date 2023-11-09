import { useEffect, useState , memo} from 'react';
import './InnputUrl.scss';
import { useSelector } from 'react-redux';
import http from '../../../instance/axiosInstance';

function InputUrl({ socialIconName, setUrlIcon, setClearIcon }) {
    const { icons } = useSelector((state) => state.theme.currentTheme);
    const [iconFecth ,setIconFecth] = useState({})
    const toLowerCase = (text) => {
        return text.toLowerCase();
    };
    useEffect(()=>{
        icons.map((icon) =>{
            if(icon.iconName === socialIconName){
                const fetchIcon = async() =>{
                    try {
                        const res = await http.get(`/icon/v1/${icon._id}`)
                        console.log(res.data)
                        setIconFecth(res.data)
                        setClearIcon(true)
                    } catch (error) {
                        console.log(error.message)
                    }
                }
                fetchIcon()
            }
        })

    },[socialIconName])
    return (
        <div className="InputUrl">
            <h3 className="InputUrl-iconName">Add icon ⭐ {socialIconName} ⭐</h3>
            <input
                className="InputUrl-input"
                type="text"
                disabled = {iconFecth.iconName === socialIconName ? true : false}
                placeholder={iconFecth.iconName === socialIconName ? iconFecth.iconUrl :"Enter your URLs here*"}
                onChange={(e) => {
                    setUrlIcon(e.target.value);
                }}
            />
            <p className="InputUrl-desc">Example : https://www.{toLowerCase(socialIconName)}.com/*usename*</p>
        </div>
    );
}

export default memo(InputUrl);
