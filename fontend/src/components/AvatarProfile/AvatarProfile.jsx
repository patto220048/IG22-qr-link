import { useSelector } from 'react-redux';
import './AvatarProfile.scss';
import { memo } from 'react';
import avatarDefault from '../../untils/AvatarLink';
import { LazyLoadImage } from 'react-lazy-load-image-component';
function AvatarProfile({ usernameTitle, decs, avatar, username, preview, fontColor, commu, theme }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <>
            {commu ? (
                <>
                    <div className="avatarProfile">
                        <LazyLoadImage
                            className="avatarProfile-img"
                            src={avatar || avatarDefault}
                            alt={avatar}
                            effect="blur"
                        />

                        <h3
                            className="avatarProfile-name"
                            style={{
                                fontSize: `${preview ? '20px' : '30px'}`,
                                color: `${fontColor}`,
                                fontFamily: `${theme?.font_famify}`,
                                fontWeight: `${theme?.font_weight}`,
                            }}
                        >
                            @{usernameTitle ? usernameTitle : username}
                        </h3>
                        <p
                            className="avatarProfile-desc"
                            style={{
                                fontSize: `${preview ? '14px' : '20px'}`,
                                color: `${fontColor}`,
                                fontFamily: `${theme?.font_famify}`,
                                fontWeight: `${theme?.font_weight}`,
                            }}
                        >
                            {decs}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="avatarProfile">
                        <LazyLoadImage
                            className="avatarProfile-img"
                            src={avatar || avatarDefault}
                            alt={avatar}
                            effect="blur"
                        />
                        <h3
                            className="avatarProfile-name"
                            style={{
                                fontSize: `${preview ? '20px' : '30px'}`,
                                color: `${fontColor}`,
                                fontFamily: `${currentTheme?.font_famify}`,
                                fontWeight: `${currentTheme?.font_weight}`,
                            }}
                        >
                            @{usernameTitle ? usernameTitle : username}
                        </h3>
                        <p
                            className="avatarProfile-desc"
                            style={{
                                fontSize: `${preview ? '14px' : '20px'}`,
                                color: `${fontColor}`,
                                fontFamily: `${currentTheme?.font_famify}`,
                                fontWeight: `${currentTheme?.font_weight}`,
                            }}
                        >
                            {decs}
                        </p>
                    </div>
                </>
            )}
        </>
    );
}

export default memo(AvatarProfile);
