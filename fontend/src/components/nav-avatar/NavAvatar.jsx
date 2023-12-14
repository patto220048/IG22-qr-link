import { Link, NavLink } from 'react-router-dom';
import avatarDefault from '../../untils/AvatarLink';
import './NavAvatar.scss';
function NavAvatar({ usernameTitle, userImg, username }) {
    return (
        <section className="navAvatar">
            <img src={userImg ? userImg : avatarDefault} alt="" className="navAvt-img" />
            <div className="navAvt-name">
                <h3 className="name">@{!usernameTitle ? username : usernameTitle} </h3>
                <p className="tagname">super-card.online/profile/{username}</p>
            </div>
        </section>
    );
}

export default NavAvatar;
