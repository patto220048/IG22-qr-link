import { useEffect, useRef, useState } from 'react';
import './Fonts.scss';
import Dialog_IU from '../dialog/Dialog_IU';
import { useDispatch, useSelector } from 'react-redux';
import { Chrome } from '@uiw/react-color';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
import http from '../../instance/axiosInstance';

function Fonts({ theme }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [colorFont, setColorFont] = useState('#FFFFFF');
    const [isFonts, setIsFonts] = useState(false);
    const [isPickColorBtn, setIsPickColor] = useState(false);
    const [currentColorFonts, setCurrentColorFonts] = useState({});
    const [inputColor, setInputColor] = useState('');
    const dispatch = useDispatch();
    const refColorBoxFonts = useRef();
    const handleOpenFonts = () => {
        setIsFonts(true);
    };
    const [onfucos, setOnFocus] = useState(true);
    // const handleOutFocus = () => {
    //     addEventListener("focusout", (e) => {
    //         if (inputColor?.length > 5){
    //             const fetchTheme = async () => {
    //                 dispatch(themeStart());
    //                 try {
    //                     const res = await http.put(`/card/${theme._id}`, {
    //                         font_color: inputColor,
    //                     });
    //                     setIsPickColor(false);
    //                     let timeOutId = setTimeout(async () => {
    //                         dispatch(updateTheme(res.data));
    //                         setCurrentColorFonts(res.data);
    //                     }, 1000);
    //                     return () => {
    //                         clearTimeout(timeOutId);
    //                     };
    //                 } catch (error) {
    //                     dispatch(themeFail());
    //                     console.log(error.message);
    //                 }
    //             };
    //             fetchTheme();
    //         }
    //     });
    // }
    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${theme._id}`, {
                        font_color: colorFont,
                    });
                    setIsPickColor(false);
                    let timeOutId = setTimeout(async () => {
                        dispatch(updateTheme(res.data));
                        setCurrentColorFonts(res.data);
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
        refColorBoxFonts.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refColorBoxFonts.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refColorBoxFonts?.current]);
    return (
        <div className="Fonts">
            <dir className="Font-items">
                <div className="Fonts-select">
                    <span className="Fonts-title">Font</span>
                    <button className="Fonts-btn" onClick={handleOpenFonts}>
                        <span
                            className="Font"
                            style={{
                                fontFamily: `${
                                    currentTheme.font_famify ? currentTheme.font_famify : theme.font_famify
                                }`,
                            }}
                        >
                            Aa
                        </span>
                        <span
                            className="Font-name"
                            style={{
                                fontFamily: `${
                                    currentTheme.font_famify ? currentTheme.font_famify : theme.font_famify
                                }`,
                                fontWeight: `${
                                    currentTheme.font_weight ? currentTheme.font_weight : theme.font_weight
                                }`,
                            }}
                        >
                            {currentTheme.font_famify ? currentTheme.font_famify : theme.font_famify}
                        </span>
                    </button>
                </div>
                {isFonts && (
                    <Dialog_IU
                        openDialog={isFonts}
                        setOpenDialog={setIsFonts}
                        isFonts={isFonts}
                        setIsFonts={setIsFonts}
                    />
                )}

                <div className="Fonts-color">
                    <h1 className="Fonts-title">Color</h1>
                    <div className="Fonts-group">
                        <div
                            className="Fonts-colorBox"
                            onClick={() => setIsPickColor(!isPickColorBtn)}
                            style={{
                                backgroundColor: `${
                                    currentColorFonts?.font_color ? currentColorFonts?.font_color : theme?.font_color
                                }`,
                            }}
                        ></div>
                        <input
                            type="text"
                            className="Fonts-input"
                            onChange={(e) => setInputColor(e.target.value)}
                            // onFocus={handleOutFocus}
                            maxLength={7}
                            placeholder={
                                currentColorFonts?.font_color ? currentColorFonts?.font_color : theme?.font_color
                            }
                        />
                    </div>

                    {isPickColorBtn && (
                        <Chrome
                            // onMouseLeave={() =>setIsPickColor(false)}
                            className="colorBox"
                            ref={refColorBoxFonts}
                            style={{ marginLeft: 20 }}
                            color={colorFont}
                            onChange={(color) => {
                                setColorFont(color.hex);
                            }}
                        />
                    )}
                </div>
            </dir>
        </div>
    );
}

export default Fonts;
