import { plusIcon } from '../../svg/icon';
import './Theme.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../assets/img/bg/4-4.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
function Theme({ themeBg, themeOpacity, themeBoderRadius, isTheme, backgoundMode, isBg, bgColor }) {
    const handleOnclick = () => {
        console.log(bgColor, themeOpacity, themeBoderRadius);
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
                            <button className="them-btn" style={{ borderRadius: `${themeBoderRadius}px` }}></button>
                            <button className="them-btn" style={{ borderRadius: `${themeBoderRadius}px` }}></button>
                            <button className="them-btn" style={{ borderRadius: `${themeBoderRadius}px` }}></button>
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
