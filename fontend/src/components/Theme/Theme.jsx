import { plusIcon } from '../../svg/icon';
import './Theme.scss';

function Theme({ themeBg, themeOpacity, themeBoderRadius, isTheme }) {
    const handleOnclick = () => {
        console.log(themeBg, themeOpacity, themeBoderRadius);
    };
    return (
        <>
            {isTheme ? (
                <section className="theme" onClick={handleOnclick}>
                    <img
                        className="theme-img"
                        src={themeBg}
                        alt={themeBg}
                        style={{
                            opacity: `${themeOpacity}`,
                        }}
                    />
                    <div className="theme-btns">
                        <button className="them-btn" style={{ borderRadius: `${themeBoderRadius}px` }}></button>
                        <button className="them-btn" style={{ borderRadius: `${themeBoderRadius}px` }}></button>
                        <button className="them-btn" style={{ borderRadius: `${themeBoderRadius}px` }}></button>
                    </div>
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
