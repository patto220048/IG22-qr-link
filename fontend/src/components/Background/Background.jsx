import './Background.scss';
import backgounds from '../../themes/background';
import Theme from '../Theme/Theme';
import { Chrome } from '@uiw/react-color';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../instance/axiosInstance';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
import { useRef } from 'react';
function Background({ cardId }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [hex, setHex] = useState('#333333');
    const [isPickColor, setIsPickColor] = useState(false);
    const dispatch = useDispatch();
    const refColorBox = useRef();
    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${cardId}`, {
                        bgColor: hex,
                        backgroundImg: null,
                    });
                    setIsPickColor(false);
                    let timeOutId = setTimeout(async () => {
                        dispatch(updateTheme(res.data));
                    }, 1000);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                } catch (error) {
                    dispatch(themeFail());
                    console.log(error.message);
                }
            };
            fetchTheme();
        };
        refColorBox.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refColorBox.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refColorBox?.current]);
    const handlePickColor = (e) => {
        e.stopPropagation();
        setIsPickColor(!isPickColor);
    };

    return (
        <div className="bgTheme">
            <div className="bgTheme-items">
                {backgounds.map((bg, i) => (
                    <Theme cardId={cardId} isBg={true} backgoundMode={true} bgColor={hex} key={i} />
                ))}
            </div>
            <div className="pickColor">
                <p className="pickColor-title">Color</p>
                <div className="pickColor-item">
                    <div
                        className="pickColor-box"
                        onClick={handlePickColor}
                        style={{ backgroundColor: `${currentTheme.bgColor ? currentTheme.bgColor : hex}` }}
                    ></div>
                    <input
                        className="pickColor-input"
                        type="text"
                        placeholder={currentTheme.bgColor ? currentTheme.bgColor : hex}
                    />
                </div>

                {isPickColor && (
                    <Chrome
                        // onMouseLeave={() =>setIsPickColor(false)}
                        ref={refColorBox}
                        className="colorBox"
                        style={{ marginLeft: 20 }}
                        color={hex}
                        onChange={(color) => {
                            setHex(color.hex);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(Background);
