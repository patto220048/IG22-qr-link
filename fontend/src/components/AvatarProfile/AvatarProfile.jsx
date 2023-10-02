import './AvatarProfile.scss';
function AvatarProfile(props, bg_img) {
    return (
        <div className="avatarProfile">
            <img
                className="avatarProfile-img"
                src="https://images.unsplash.com/photo-1682685797088-283404e24b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
            />
            <h3 className="avatarProfile-name" style={bg_img && { color: 'black' }}>
                @DINH HUU PHAT
            </h3>
            <p className="avatarProfile-desc" style={bg_img && { color: 'black' }}>
                Des2312312c123 1231231231231 231 23123 123 123
            </p>
        </div>
    );
}

export default AvatarProfile;
