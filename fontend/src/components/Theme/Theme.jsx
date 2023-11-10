import { plusIcon } from '../../svg/icon';
import './Theme.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../assets/img/bg/4-4.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
import http from '../../instance/axiosInstance';
function Theme({
    bgColor,
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
            try {
                dispatch(themeStart());
                const res = isBg
                    ? await http.put(`/card/${cardId}`, {
                          bgColor: bgColor,
                          backgroundImg: null,
                      })
                    : await http.put(`/card/${cardId}`, {
                          backgroundImg: themeBg,
                          btn_type: themeBtnType,
                          btn_color: themeBtnColor,
                          bnt_radius: themeBtnRadius,
                          font_famify: themeFontFamily,
                          font_color: themeFontColor,
                      });
                dispatch(updateTheme(res.data));
            } catch (error) {
                dispatch(themeFail());
                console.log(error.message);
            }
        };
        fetchTheme();
    };
    // const handleBg = () => {
    //     const fetchBg = async () => {
    //         try {
    //             dispatch(themeStart());
    //             const res = await http.put(`/card/${cardId}`, {
    //                 bgColor: bgColor,
    //                 backgroundImg: null,
    //             });
    //             dispatch(updateTheme(res.data));
    //             console.log(res.data);
    //         } catch (error) {
    //             dispatch(themeFail());
    //             console.log(error.message);
    //         }
    //     };
    //     fetchBg();
    // };
    return (
        <>
            {isTheme || isBg ? (
                <section className="theme" onClick={handleTheme}>
                    {!isBg ? (
                        <div>
                            <LazyLoadImage
                                src={themeBg}
                                className="theme-img"
                                width={160}
                                height={260}
                                alt={themeBg}
                                placeholdersrc={PlaceholderImage}
                                effect="blur"
                                style={{
                                    opacity: `${themeOpacity}`,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="bg-img" style={{ backgroundColor: `${bgColor}` }} ></div>
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
                <button className="theme-cutoms_btn">
                    <div>Cutoms page</div>
                    {plusIcon(30, 30)}
                </button>
            )}
        </>
    );
}

export default Theme;
