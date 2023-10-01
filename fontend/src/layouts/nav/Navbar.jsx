import { Link, NavLink } from 'react-router-dom';
import { userIcon, cutomIcon, logoutIcon, alertIcon } from '../../svg/icon';
import './navbav.scss';
import { useEffect, useState } from 'react';
import DropdownItem from '../../components/DropdownItem/DropdownItem';
import navLogo from '../../assets/img/logo-link.png'
// import './navbar.css'
function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
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
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="logo"><img className="navbar-logo" src={navLogo} alt="" /></h2>
                <ul className="nav-link">
                    <NavLink to={'/'} style={{ color: '#696d61' }}>
                        <li className="nav-link_items">Home</li>
                    </NavLink>
                    <NavLink to={'/template'} style={{ color: '#696d61' }}>
                        <li className="nav-link_items">Templates</li>
                    </NavLink>
                    <li className="nav-link_items">About</li>
                </ul>
                <div className="register">  
                    <Link to="/register/login"><button className="btn login ">Login</button></Link>
                    <Link to="/register/signup"><button className="btn signup">Sign Up</button></Link>
                </div>
                {/* <div className="nav-user">
                    <div className="avatar" onClick={handleOpenMenu}>
                        <img
                            src="https://images.unsplash.com/photo-1682695799561-033f55f75b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt=""
                        />
                    </div>
                </div> */}

                {openMenu && (
                    <section className="nav-option">
                        <ul className="account-option">
                            <h3 className="account">Account</h3>
                            <DropdownItem icon={userIcon()} text={'My account'} />
                            <DropdownItem icon={cutomIcon()} text={'Cutoms my page'} />
                            <h3 className="support">Support</h3>
                            <DropdownItem icon={alertIcon()} text={'Ask a question'} />
                            <DropdownItem icon={logoutIcon()} text={'Sign out'} />
                        </ul>
                    </section>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
