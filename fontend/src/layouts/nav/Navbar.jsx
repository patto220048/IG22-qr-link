    import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux-toolkit/userSlice';
// component
import { userIcon, cutomIcon, logoutIcon, alertIcon } from '../../svg/icon';
import DropdownItem from '../../components/DropdownItem/DropdownItem';
import navLogo from '../../assets/img/logo21.png';
// import './navbar.css'
import './navbav.scss';

import NavAvatar from '../../components/nav-avatar/NavAvatar';
function Navbar() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [openMenu, setOpenMenu] = useState(false);
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
            const res = await axiosInstance.post('/auth/logout', { token: currentUser.refreshToken });
            console.log(res.data);
            navigate('/register/login');
            dispatch(logout());
        } catch (error) {
            console(error.message);
        }
    };
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="logo">
                    <img className="navbar-logo" src={navLogo} alt="" />
                </h2>
                <ul className="nav-link" style={ currentUser ? {width:"100%"} : {flex:"1"}}>
                    <NavLink to={'/'} style={{ color: '#696d61' }}>
                        <li className="nav-link_items">Home</li>
                    </NavLink>
                    <NavLink to={`/template/${currentUser.username}`} style={{ color: '#696d61' }}>
                        <li className="nav-link_items">Templates</li>
                    </NavLink>
                    <li className="nav-link_items">About</li>
                </ul>
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
                        <div className="avatar" onClick={handleOpenMenu}>
                            <img
                                src="https://images.unsplash.com/photo-1682695799561-033f55f75b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt=""
                            />
                        </div>
                    </div>
                )}

                {openMenu && (
                    <section className="nav-option">
                        <NavAvatar />
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
