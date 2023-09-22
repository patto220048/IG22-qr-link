import { Link } from 'react-router-dom';
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
                {/* <div className="register">  
                    <Link to="/register/login"><button className="btn login ">Login</button></Link>
                    <Link to="/register/signup"><button className="btn signup">Sign Up</button></Link>
                </div> */}
                <div className="nav-user">
                    <div className="avatar">
                        <img
                            src="https://images.unsplash.com/photo-1682695799561-033f55f75b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt=""
                        />
                    </div>
                </div>
                <section className="nav-option">
                <ul className="account-option">
                    <h3 className="account">Account</h3>
                    <li className="account-option-item">My account</li>
                    <li className="account-option-item">Cutoms my page</li>
                    <h3 className="support">Support</h3>
                    <li className="account-option-item">Ask a question</li>
                    <li className="account-option-item">Sign out</li>
                </ul>
               
            </section>
            </div>
        
        </div>
    );
}

export default Navbar;
