import './TempTheme.scss';
import themes from '../../themes/themes';
import Theme from '../Theme/Theme';
import { memo } from 'react';
import { useState } from 'react';
function TempTheme({ setState, cardId, setThemeInstance }) {
    return (
        <div className="tempTheme">
            <div className="tempTheme-items">
                <Theme isTheme={false} />
                {themes.map((theme, i) => (
                    <Theme
                        setThemeInstance={setThemeInstance}
                        isTheme={true}
                        cardId={cardId}
                        themeBg={theme.bg_img}
                        themeOpacity={theme.bg_opacity}
                        themeBtnRadius={theme.bnt_radius}
                        themeBtnColor={theme.btn_color}
                        themeBtnType={theme.btn_type}
                        themeFontColor={theme.font_color}
                        themeFontFamily={theme.font_family}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
}

export default memo(TempTheme);
