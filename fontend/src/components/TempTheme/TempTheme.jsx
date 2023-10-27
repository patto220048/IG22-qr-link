import './TempTheme.scss';
import themes from '../../themes/themes';
import backgound from '../../themes/background';
import Theme from '../Theme/Theme';
import { useEffect, useState, memo } from 'react';
import { themeStart, themeSuccess } from '../../redux-toolkit/themeSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../instance/axiosInstance';
function TempTheme({ setState, cardId }) {
    return (
        <div className="tempTheme">
            <div className="tempTheme-items">
                <Theme isTheme={false} />
                {themes.map((theme, i) => (
                    <Theme
                        setState={setState}
                        cardId={cardId}
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

export default memo(TempTheme);
