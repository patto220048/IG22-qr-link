// eslint-disable-next-line no-unused-vars
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux-toolkit/userSlice';
// component
import { userIcon, cutomIcon, logoutIcon, alertIcon, menu01Icon, closeIcon } from '../../svg/icon';
import DropdownItem from '../../components/DropdownItem/DropdownItem';
import navLogo from '../../assets/img/main-logo.png';
// import './navbar.css'
import './navbav.scss';

import NavAvatar from '../../components/nav-avatar/NavAvatar';
import http from '../../instance/axiosInstance';
import avatarDefault from '../../untils/AvatarLink';
function Navbar() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [openMenu, setOpenMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOpenMenu = (e) => {
        e.stopPropagation();
        setOpenMenu(!openMenu);
    };
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenu(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    // sign out
    const handleSignOut = async () => {
        try {
            const res = await http.post('/auth/logout', { token: currentUser.refreshToken });
            console.log(res.data);
            navigate('/register/login');
            dispatch(logout());
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleOpenMenuMobile = () => {
        setIsMobile(!isMobile);
    };
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="logo">
                    <NavLink to={'/'}>
                        <img className="navbar-logo" src={navLogo} alt={'super-card-logo'} />
                    </NavLink>
                </h2>
                <ul className="nav-link" style={currentUser ? { width: '100%' } : { flex: '1' }}>
                    {!currentUser && (
                        <NavLink to={'/'} style={{ color: '#696d61' }}>
                            <li className="nav-link_items">Home</li>
                        </NavLink>
                    )}
                    <NavLink to={`/template/${currentUser.username}`} style={{ color: '#696d61' }}>
                        <li className="nav-link_items">Templates</li>
                    </NavLink>
                    <NavLink to={`/links`} style={{ color: '#696d61' }}>
                        <li className="nav-link_items">Links</li>
                    </NavLink>
                    <li className="nav-link_items">Create QR</li>
                    <li className="nav-link_items">About</li>
                </ul>
                {/* ----------------------------------------nav mobile-------------------------------------------- */}
                {isMobile && (
                    <ul
                        className={'nav-link-mobile '}
                        style={currentUser ? { width: '100%' } : { flex: '1' }}
                        onClick={() => setIsMobile(false)}
                    >
                        <NavLink to={'/'}>
                            <li className="nav-link-mobile_items">Home</li>
                        </NavLink>

                        {!currentUser && (
                            <NavLink to={'/'} style={{ color: '#696d61' }}>
                                <li className="nav-link-mobile_items">Home</li>
                            </NavLink>
                        )}
                        <NavLink to={`/template/${currentUser.username}`} style={{ color: '#696d61' }}>
                            <li className="nav-link-mobile_items">Templates</li>
                        </NavLink>
                        <NavLink to={`/links`} style={{ color: '#696d61' }}>
                            <li className="nav-link-mobile_items">Links</li>
                        </NavLink>

                        <li className="nav-link-mobile_items">Create QR</li>
                        <li className="nav-link-mobile_items">About</li>
                    </ul>
                )}
                {!currentUser ? (
                    <div className="register">
                        <Link to="/register/login">
                            <button className="nav-btn nav-login ">Login</button>
                        </Link>
                        <Link to="/register/signup">
                            <button className="nav-btn nav-signup">Sign Up</button>
                        </Link>
                    </div>
                ) : (
                    <div className="nav-user">
                        <ul>
                            <li>Buy Card</li>
                        </ul>
                        <div className="avatar" onClick={handleOpenMenu}>
                            <img src={currentUser.avtImg || avatarDefault} alt={currentUser.avtImg} />
                        </div>
                    </div>
                )}
                {/* reponsive mobile */}
                {isMobile ? (
                    <div className="navMobile" onClick={handleOpenMenuMobile}>
                        {closeIcon(30, 30)}
                    </div>
                ) : (
                    <div className="navMobile" onClick={handleOpenMenuMobile}>
                        {menu01Icon(30, 30)}
                    </div>
                )}

                {openMenu && (
                    <section className="nav-option">
                        <NavAvatar
                            usernameTitle={currentUser.usernameTitle}
                            userImg={currentUser.avtImg}
                            username={currentUser.username}
                        />
                        <ul className="account-option">
                            <h3 className="account">Account</h3>
                            <DropdownItem icon={userIcon()} text={'My account'} />
                            <DropdownItem icon={cutomIcon()} text={'Cutoms my page'} />
                            <h3 className="support">Support</h3>
                            <DropdownItem icon={alertIcon()} text={'Ask a question'} />
                            <div onClick={handleSignOut}>
                                <DropdownItem icon={logoutIcon()} text={'Sign out'} />
                            </div>
                        </ul>
                    </section>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
