import { useSelector } from 'react-redux';
import './AvatarProfile.scss';
import { memo } from 'react';
function AvatarProfile({ usernameTitle, decs, avatar, username, preview, fontColor }) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <div className="avatarProfile">
            <img className="avatarProfile-img" src={avatar} alt={avatar} />
            <h3
                className="avatarProfile-name"
                style={{
                    fontSize: `${preview ? '20px' : '30px'}`,
                    color: `${fontColor}`,
                }}
            >
                @{usernameTitle ? usernameTitle : username}
            </h3>
            <p
                className="avatarProfile-desc"
                style={{
                    fontSize: `${preview ? '14px' : '20px'}`,
                    color: `${fontColor}`,
                }}
            >
                {decs}
            </p>
        </div>
    );
}

export default memo(AvatarProfile);
