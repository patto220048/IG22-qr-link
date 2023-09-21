import './navbav.scss';
// import './navbar.css'
function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <h2 className="logo">LOGO</h2>
                <ul className="nav-link">
                    <li className="nav-link_items">Home</li>
                    <li className="nav-link_items">Templates</li>
                    <li className="nav-link_items">About</li>
                </ul>
                <div className="register">  
                    <button className="btn login ">Login</button>
                    <button className="btn signup">Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
