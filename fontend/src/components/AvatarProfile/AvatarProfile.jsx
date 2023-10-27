import './AvatarProfile.scss';
function AvatarProfile({ usernameTitle, decs, avatar, username, preview }) {
    return (
        <div className="avatarProfile">
            <img className="avatarProfile-img" src={avatar} alt={avatar} />
            <h3
                className="avatarProfile-name"
                style={{
                    fontSize: `${preview ? '20px' : '30px'}`,
                }}
            >
                @{usernameTitle ? usernameTitle : username}
            </h3>
            <p
                className="avatarProfile-desc"
                style={{
                    fontSize: `${preview ? '14px' : '17px'}`,
                }}
            >
                {decs}
            </p>
        </div>
    );
}

export default AvatarProfile;
