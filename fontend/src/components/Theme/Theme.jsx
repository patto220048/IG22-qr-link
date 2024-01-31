import { plusIcon } from '../../svg/icon';
import './Theme.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../assets/img/bg/4-4.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
import http from '../../instance/axiosInstance';
import { useState } from 'react';
import PreView from '../Preview/PreView';
function Theme({
    isTheme,
    themeBg,
    themeOpacity,
    backgoundMode,
    isBg,
    cardId,
    themeBtnRadius,
    themeBtnColor,
    themeBtnType,
    themeFontColor,
    themeFontFamily,
}) {
    const dispatch = useDispatch();
    const handleTheme = () => {
        const fetchTheme = async () => {
            dispatch(themeStart());
            try {
                const res = await http.put(`/card/${cardId}`, {
                    backgroundImg: themeBg,
                    btn_type: themeBtnType,
                    btn_color: themeBtnColor,
                    bnt_radius: themeBtnRadius,
                    font_famify: themeFontFamily,
                    font_color: themeFontColor,
                    backgroundImgName:null,
                    backgroundVideoName:null,
                    backgroundVideo:null,
                    bgColor:null,
                    gadientColorTop:null,
                    gadientColorBot:null,

                });
                const timeoutId = setTimeout(async () => {
                    // setThemeInstance(res.data);
                    dispatch(updateTheme(res.data));
                }, 1000);
                return () => {
                    clearTimeout(timeoutId);
                };
            } catch (error) {
                console.log(error.message);
                dispatch(themeFail());
            }
        };
        fetchTheme();
    };


    return (
        <>
            {isTheme || isBg ? (
                <section className="theme" onClick={handleTheme}>
                    {!isBg ? (
                        <div>
                            <LazyLoadImage
                                src={themeBg}
                                className="theme-img"
                                alt={themeBg}
                                placeholdersrc={PlaceholderImage}
                                effect="blur"
                                style={{
                                    opacity: `${themeOpacity}`,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="bg-color"></div>
                    )}

                    {!backgoundMode ? (
                        <div className="theme-btns">
                            <button className="them-btn" style={{ borderRadius: `${themeBtnRadius}px` }}></button>
                            <button className="them-btn" style={{ borderRadius: `${themeBtnRadius}px` }}></button>
                            <button className="them-btn" style={{ borderRadius: `${themeBtnRadius}px` }}></button>
                        </div>
                    ) : (
                        <></>
                    )}
                </section>
            ) : (
                <a href='#background' className="theme-cutoms_btn" >
                    Cutoms page
                    {plusIcon(30, 30, "black")}
                </a>
            )}
        </>
    );
}

export default Theme;
