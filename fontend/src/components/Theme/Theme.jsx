import { plusIcon } from '../../svg/icon';
import './Theme.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../assets/img/bg/4-4.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
function Theme({
    isTheme,
    themeBg,
    themeOpacity,
    backgoundMode,
    isBg,
    bgColor,
    cardId,
    themeBtnRadius,
    themeBtnColor,
    themeBtnType,
    themeFontColor,
    themeFontFamily,
}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.user.currentTheme);
    const handleOnclick = () => {
        try {
            // useFetch(`/card/${cardId}`,"PUT",{backgroundImg: themeBg})
            dispatch(themeStart())
            const fetchTheme = async () => {
                const res = await axiosInstance.put(`/card/${cardId}`, {
                    backgroundImg: themeBg,
                    btn_type: themeBtnType,
                    btn_color: themeBtnColor,
                    bnt_radius: themeBtnRadius,
                    font_famify: themeFontFamily,
                    font_color: themeFontColor,
                
                });
                console.log(res.data);
                dispatch(updateTheme(res.data));
                // setState(res.data)
            };
            fetchTheme();
        } catch (error) {
            dispatch(themeFail())
            console.log(error.message);
        }
    };

    return (
        <>
            {isTheme || isBg ? (
                <section className="theme" onClick={handleOnclick}>
                    {!isBg ? (
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
                    ) : (
                        <div className="bg-img" style={{ backgroundColor: `${bgColor}` }}></div>
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
