import './AvatarProfile.scss';
function AvatarProfile({usernameTitle, decs , avatar,username}) {
    return (
        <div className="avatarProfile">
            <img
                className="avatarProfile-img"
                src={avatar}
                alt={avatar}
            />
            <h3 className="avatarProfile-name" >
                @{usernameTitle ? usernameTitle : username}
            </h3>
            <p className="avatarProfile-desc" >
                {decs}
            </p>
        </div>
    );
}

export default AvatarProfile;
