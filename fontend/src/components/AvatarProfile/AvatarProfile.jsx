import { useSelector } from 'react-redux';
import './AvatarProfile.scss';
import { memo } from 'react';
import avatarDefault from '../../untils/AvatarLink';
function AvatarProfile({ usernameTitle, decs, avatar, username, preview, fontColor }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <div className="avatarProfile">
            <img className="avatarProfile-img" src={avatar || avatarDefault} alt={avatar}   loading='lazy'/>
            <h3
                className="avatarProfile-name"
                style={{
                    fontSize: `${preview ? '20px' : '30px'}`,
                    color: `${fontColor}`,
                    fontFamily:`${currentTheme.font_famify}`,
                    fontWeight:`${currentTheme.font_weight}`
                }}
            >
                @{usernameTitle ? usernameTitle : username}
            </h3>
            <p
                className="avatarProfile-desc"
                style={{
                    fontSize: `${preview ? '14px' : '20px'}`,
                    color: `${fontColor}`,
                    fontFamily:`${currentTheme.font_famify}`,
                    fontWeight:`${currentTheme.font_weight}`
                }}
            >
                {decs}
            </p>
        </div>
    );
}

export default memo(AvatarProfile);
