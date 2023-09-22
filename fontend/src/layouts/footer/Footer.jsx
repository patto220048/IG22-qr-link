import './Footer.scss';

function Footer() {

    return ( 
    <div className = 'footer' >
        <div className = "footer-container" >
                <ul className='footer-container_item'>
                    <ul className='footer-sub'>
                    <h3>Group</h3>
                        <li>Blog</li>
                        <li>Engineering Blog</li>
                        <li>Marketplace</li>
                        <li>What's New</li>
                        <li>About</li>
                        <li>Press</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>
                    <ul className='footer-sub'>
                        <h3>Community</h3>
                        <li><>Creator Services Program</></li>
                        <li>Enterprise</li>
                        <li>Creator report</li>
                        <li>Charities</li>
                        <li>Creator Profile Directory</li>
                        <li>Explore Templates</li>
                    </ul>

                    <ul className='footer-sub'>
                    <h3>Support</h3>
                        <li>Help Topics</li>
                        <li>Getting Started</li>
                        <li>Try it for pro</li>
                        <li>Features & How-Tos</li>
                        <li>FAQs</li>
                        <li>Report a Violation</li>
                    </ul>
                    <ul className='footer-sub'>
                   <h3>Trust & Legal</h3>
                        <li>Term & Conditions</li>
                        <li>Privacy Notice</li>
                        <li>Cookie Notice</li>
                        <li>Trust Center</li>
                        <li>Cookie Preferences</li>
                    </ul>
                </ul>
        </div> 
    </div>
    );
}

export default Footer;