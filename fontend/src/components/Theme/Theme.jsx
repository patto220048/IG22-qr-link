import { plusIcon } from '../../svg/icon';
import './Theme.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../assets/img/bg/4-4.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch } from 'react-redux';
import {themeFail, themeStart, themeSuccess, updateTheme} from '../../redux-toolkit/themeSlice';
function Theme({ themeBg, themeOpacity, themeBtn, isTheme, backgoundMode, isBg, bgColor }) {
    const dispatch = useDispatch()
    const handleOnclick = () => {
        dispatch(themeStart())
        try {
            const fetchTheme = async() => {
                const res = await axiosInstance.put("/card", {
                    backgroundImg: themeBg,
                    btn:themeBtn,
                })
                console.log(res.data)
                dispatch(updateTheme(res.data))
            }
            fetchTheme()
        } catch (error) {
            dispatch(themeFail(error))
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
                            <button className="them-btn" style={{ borderRadius: `${themeBtn}px` }}></button>
                            <button className="them-btn" style={{ borderRadius: `${themeBtn}px` }}></button>
                            <button className="them-btn" style={{ borderRadius: `${themeBtn}px` }}></button>
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
