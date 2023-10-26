import './TempTheme.scss';
import themes from '../../themes/themes';
import backgound from '../../themes/background';
import Theme from '../Theme/Theme';
import { useEffect, useState } from 'react';
import { themeStart, themeSuccess } from '../../redux-toolkit/themeSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
function TempTheme() {
    const [data, setData] = useState({});
    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await axiosInstance.get('/card/v1/');
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                console.log(error.message)
            }
        };
        getCard();
    }, []);

    return (
        <div className="tempTheme">
            <div className="tempTheme-items">
                <Theme isTheme={false} />
                {themes.map((theme, i) => (
                    <Theme
                        cardId = {data._id}
                        isTheme={true}
                        themeBg={theme.bg_img}
                        themeOpacity={theme.bg_opacity}
                        themeBtn={theme.bnt_radius}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
}

export default TempTheme;
