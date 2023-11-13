import './Background.scss';
import backgounds from '../../themes/background';
import Theme from '../Theme/Theme';
import { memo } from 'react';
import { Chrome } from '@uiw/react-color';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import http from '../../instance/axiosInstance';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
import { useRef } from 'react';
function Background({ cardId }) {
    const [hex, setHex] = useState('#333333');
    const [isPickColor, setIsPickColor] = useState(false);
    const dispatch = useDispatch();
    const refColorBox = useRef()
    useEffect(() => {
        const handleClickOutside = () => {
            // setIsPickColor(false);
            refColorBox.current.className = "hide-box"
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handlePickColor = (e) => {
        e.stopPropagation();
        setIsPickColor(!isPickColor);
    };
    useEffect(() => {
        const fetchTheme = async () => {
            try {
                dispatch(themeStart());
                const res = await http.put(`/card/${cardId}`, {
                    bgColor: hex,
                    backgroundImg: null,
                });
                dispatch(updateTheme(res.data));
            } catch (error) {
                dispatch(themeFail());
                console.log(error.message);
            }
        };
        fetchTheme();
    },[])
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
                        style={{ backgroundColor: `${hex}` }}
                    ></div>
                    <input className="pickColor-input" type="text" placeholder={hex} />
                </div>

                {isPickColor && (
                    <Chrome
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
