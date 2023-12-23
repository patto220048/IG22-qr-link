import { useEffect, useRef, useState } from 'react';
import './ButtonLink.scss';
import { Chrome } from '@uiw/react-color';

import http from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { themeFail, themeStart, themeSuccess, updateTheme } from '../../redux-toolkit/themeSlice';

function ButtonLink({ cardId, theme }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    const [buttonStyte, setbuttonStyle] = useState({
        name: '',
        style: '',
        border: 0,
        borderRadius: 0,
        fontColor: '',
        color: '',
        outline: false,
        shadow: { horizontal: 0, vertical: 0, blur: 0, spread: 0, opacity: 0, color: '' },
    });
    const [currentColorBtn, setCurrentColorBtn] = useState({});
    const [currentColorFont, setCurrentColorFont] = useState({});
    const [isPickColorBtn, setIsPickColorBtn] = useState(false);
    const [isPickColorFont, setIsPickColorFont] = useState(false);
    const [colorFont, setColorFont] = useState('#ffffff');
    const [colorBtn, setcolorBtn] = useState('#333333');
    const refColorBoxBtn = useRef();
    const refColorBoxFont = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTheme = async () => {
            dispatch(themeStart());
            try {
                const res = await http.put(`/card/${cardId}`, {
                    btn_outline:buttonStyte.outline,
                    btn_radius: buttonStyte.borderRadius,
                    btn_border: buttonStyte.border,
                    btn_style: {
                        btn_shadow: {
                            horizontal: buttonStyte.shadow.horizontal,
                            vertical: buttonStyte.shadow.vertical,
                            blur: buttonStyte.shadow.blur,
                            spread: buttonStyte.shadow.spread,
                            opacity: buttonStyte.shadow.opacity,
                            color: buttonStyte.shadow.color,
                        },
                    },
                });
                const timeoutId = setTimeout(() => {
                    dispatch(updateTheme(res.data));
                }, 1000);
                return () => {
                    clearTimeout(timeoutId);
                };
            } catch (error) {
                dispatch(themeFail(error.message));
            }
        };
        fetchTheme();
    }, [buttonStyte, cardId]);

    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${cardId}`, {
                        btn_color1: colorBtn,
                    });
                    setIsPickColorBtn(false);
                    setCurrentColorBtn(res.data);
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
        refColorBoxBtn.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refColorBoxBtn.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refColorBoxBtn?.current, cardId]);
    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${cardId}`, {
                        btn_fontColor: colorFont,
                    });
                    setIsPickColorFont(false);
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
        refColorBoxFont.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refColorBoxFont.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refColorBoxFont?.current, cardId, colorFont]);

    return (
        <div className="buttonLink">
            <div className="buttonLink-items">
                <section className="buttonLink-fill">
                    <h1 className="buttonLink-title">Fill</h1>
                    <ul className="buttonLink-fill-items">
                        <button
                            className="buttonLink-item square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'square',
                                    style: 'fill',
                                    borderRadius: 0,
                                    border: 0,
                                    outline: false,
                                    shadow: {
                                        horizontal: 0,
                                        vertical: 0,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 0,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item half-square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'halfSquare',
                                    style: 'fill',
                                    borderRadius: 15,
                                    border: 0,
                                    outline: false,
                                    shadow: {
                                        horizontal: 0,
                                        vertical: 0,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 0,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item round"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'round',
                                    style: 'fill',
                                    borderRadius: 50,
                                    border: 0,
                                    outline: false,

                                    shadow: {
                                        horizontal: 0,
                                        vertical: 0,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 0,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                    </ul>
                </section>
                <section className="buttonLink-outline">
                    <h1 className="buttonLink-title">Outline</h1>

                    <ul className="buttonLink-outline-items">
                        <button
                            className="buttonLink-item square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'square',
                                    style: 'outline',
                                    border: 1,
                                    borderRadius: 0,
                                    outline: true,
                                    shadow: {
                                        horizontal: 0,
                                        vertical: 0,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 0,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item half-square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'halfSquare',
                                    style: 'outline',
                                    border: 1,
                                    borderRadius: 15,
                                    outline: true,
                                    shadow: {
                                        horizontal: 0,
                                        vertical: 0,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 0,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item round"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'round',
                                    style: 'outline',
                                    border: 1,
                                    borderRadius: 50,
                                    outline: true,
                                    shadow: {
                                        horizontal: 0,
                                        vertical: 0,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 0,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                    </ul>
                </section>
                <section className="buttonLink-shadow">
                    <h1 className="buttonLink-title">Shadow</h1>

                    <ul className="buttonLink-shadow-items">
                        <button
                            className="buttonLink-item square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'square',
                                    style: 'shadow',
                                    borderRadius: 0,
                                    border: 0,
                                    outline: false,

                                    shadow: {
                                        horizontal: 11,
                                        vertical: 14,
                                        blur: 19,
                                        spread: 0,
                                        opacity: 0.3,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item half-square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'halfSquare',
                                    style: 'shadow',
                                    borderRadius: 15,
                                    border: 0,
                                    outline: false,

                                    shadow: {
                                        horizontal: 11,
                                        vertical: 14,
                                        blur: 19,
                                        spread: 0,
                                        opacity: 0.3,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item round"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'round',
                                    style: 'shadow',
                                    borderRadius: 50,
                                    border: 0,
                                    outline: false,

                                    shadow: {
                                        horizontal: 11,
                                        vertical: 14,
                                        blur: 19,
                                        spread: 0,
                                        opacity: 0.3,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                    </ul>
                </section>

                <section className="buttonLink-hard-shadow">
                    <h1 className="buttonLink-title">Hard Shadow</h1>

                    <ul className="buttonLink-hard-shadow-items">
                        <button
                            className="buttonLink-item square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'square',
                                    style: 'hardShadow',
                                    border: 1,
                                    borderRadius: 0,
                                    outline: false,

                                    shadow: {
                                        horizontal: 5,
                                        vertical: 8,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 1,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item half-square"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'halfSquare',
                                    style: 'hardShadow',
                                    border: 1,
                                    borderRadius: 15,
                                    outline: false,

                                    shadow: {
                                        horizontal: 5,
                                        vertical: 8,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 1,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                        <button
                            className="buttonLink-item round"
                            onClick={() =>
                                setbuttonStyle({
                                    name: 'round',
                                    style: 'hardShadow',
                                    border: 1,
                                    borderRadius: 50,
                                    outline: false,
                                    shadow: {
                                        horizontal: 5,
                                        vertical: 8,
                                        blur: 0,
                                        spread: 0,
                                        opacity: 1,
                                        color: '#333333',
                                    },
                                })
                            }
                        ></button>
                    </ul>
                </section>
            </div>
            <div className="buttonLinks-color">
                <h1 className="buttonLink-title">Color</h1>
                <div className="buttonLink-group">
                    <div
                        className="buttonLinks-colorBox"
                        style={{
                            backgroundColor: `${currentTheme?.btn_color}`,
                        }}
                        onClick={() => setIsPickColorBtn(true)}
                    ></div>
                    <input type="text" className="buttonLinks-input" placeholder={currentTheme?.btn_color} />
                </div>

                {isPickColorBtn && (
                    <Chrome
                        // onMouseLeave={() =>setIsPickColor(false)}
                        className="colorBox"
                        ref={refColorBoxBtn}
                        style={{ marginLeft: 20 }}
                        color={colorBtn}
                        onChange={(color) => {
                            setcolorBtn(color.hex);
                        }}
                    />
                )}
            </div>

            <div className="buttonLinks-fontcolor">
                <h1 className="buttonLink-title">Font Color</h1>
                <div className="buttonLink-group">
                    <div
                        className="buttonLinks-colorBox"
                        onClick={() => setIsPickColorFont(true)}
                        style={{ backgroundColor: `${currentColorFont.btn_style?.btn_fontColor}` }}
                    ></div>
                    <input
                        type="text"
                        className="buttonLinks-input"
                        placeholder={
                            currentColorFont.btn_style?.btn_fontColor
                                ? currentColorFont.btn_style?.btn_fontColor
                                : '#abdcf'
                        }
                    />
                </div>
                {isPickColorFont && (
                    <Chrome
                        // onMouseLeave={() =>setIsPickColor(false)}
                        className="colorBox"
                        ref={refColorBoxFont}
                        style={{ marginLeft: 20 }}
                        color={colorFont}
                        onChange={(color) => {
                            setColorFont(color.hex);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default ButtonLink;
