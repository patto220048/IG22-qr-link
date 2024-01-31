import './Footer.scss';
import facbook from '../../assets/facebook1.svg';
import github from '../../assets/github.svg';
import twitter from '../../assets/twitter.svg';
import navLogo from '../../assets/img/main-logo.png';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <ul className="footer-sub">
                        <h3>Group</h3>
                        <li>Marketplace</li>
                        <li>What's New</li>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>
                    <ul className="footer-sub">
                        <h3>Community</h3>
                        <li>Creator Services Program</li>
                        <li>Enterprise</li>
                        <li>Creator report</li>
                        <li>Charities</li>
                        <li>Creator Profile Directory</li>
                        <li>Explore Templates</li>
                    </ul>
                </div>
                <div className="footer-right">
                    <div className="footer-info">
                        <div className="footer-logo-group">
                            <img src={navLogo} className="footer-logo"></img>
                            <p className='footer-logo-sub' >UPPER-CARD</p>
                        </div>
                      
                        <span>Copyright © 2023 PNxD Team</span>
                        <span>All rights reserved</span>
                        {/* <div className="footer-input">
                            <input type="text" placeholder="Enter your email" />
                        </div> */}
                        <ul className="footer-icon">
                            <img className="footer-icon_items" src={facbook} alt="" />
                            <img className="footer-icon_items" src={github} alt="" />
                            <img className="footer-icon_items" src={twitter} alt="" />
                        </ul>
                    </div>
                </div>
            </div>
            <div className="dmca-badge">
                <a
                    href="//www.dmca.com/Protection/Status.aspx?ID=fafeccb4-7a66-40db-8ed3-03436b38dfbe"
                    title="DMCA.com Protection Status"
                    className="dmca-badge"
                >
                
                    <img
                        src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-06.png?ID=fafeccb4-7a66-40db-8ed3-03436b38dfbe"
                        alt="DMCA.com Protection Status"
                    />
                </a>
            </div>
        </div>
    );
}

export default Footer;
