import { plusIcon } from '../../svg/icon';
import './Theme.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../assets/img/bg/4-4.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import {themeFail, themeStart, themeSuccess, updateTheme} from '../../redux-toolkit/themeSlice';
import { updateData } from '../../redux-toolkit/userSlice';
function Theme({ themeBg, themeOpacity, themeBtn, isTheme, backgoundMode, isBg, bgColor ,cardId}) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state=>state.user.currentUser))
    const currentTheme = useSelector((state=>state.user.currentTheme))
    const handleOnclick = () => {
        try {
            const fetchTheme = async() => {
                const res = await axiosInstance.put(`/card/${cardId}`, {
                    backgroundImg: themeBg,
                })
                console.log(res.data)
                dispatch(updateTheme(res.data))
                window.location.reload();
            }
            fetchTheme()
        } catch (error) {
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
