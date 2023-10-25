import './TempTheme.scss';
import themes from '../../themes/themes';
import backgound from "../../themes/background"
import Theme from '../Theme/Theme';
import { useEffect } from 'react';
import { themeStart, themeSuccess } from '../../redux-toolkit/themeSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
function TempTheme() {
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(themeStart())
    //     try {
    //         const fetchTheme = async() => {
    //             const res = await axiosInstance.get("/card/v1")
    //             console.log(res.data)
    //             dispatch(themeSuccess(res.data))
    //         }
    //         fetchTheme()
    //     } catch (error) {
    //         dispatch(themeFail(error))
    //         console.log(error.message);
    //     }
    // },[])
    
    return (    
        <div className="tempTheme">
            <div className="tempTheme-items">
                <Theme isTheme= {false}/>
                {themes.map((theme, i) => (
                    <Theme 
                    isTheme={true}
                    themeBg={theme.bg_img}  
                    themeOpacity={theme.bg_opacity} 
                    themeBtn={theme.bnt_radius}
                    key={i} />
                ))}
            </div>
        </div>
    );
}

export default TempTheme;
