import './AvatarProfile.scss';
function AvatarProfile({usernameTitle, decs , avatar}) {
    return (
        <div className="avatarProfile">
            <img
                className="avatarProfile-img"
                src={avatar}
                alt={avatar}
            />
            <h3 className="avatarProfile-name" >
                @{usernameTitle}
            </h3>
            <p className="avatarProfile-desc" >
                {decs}
            </p>
        </div>
    );
}

export default AvatarProfile;
