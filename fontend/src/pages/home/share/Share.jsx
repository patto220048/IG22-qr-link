import "./Share.scss"
import { Link } from 'react-router-dom';
function  Share() {
    return ( 
        <div className="share">
            <div className="share-container">
                <div className="share-left">
                    <h1 className="share-text">Quickly share your own socials media information with everyone</h1>
                    <p className="share-desc">Input your information and generate the QR code or card as you desire.</p>
                    <Link to="/register/signup"><button className='share-btn'>Get started for free</button></Link>
                </div>
                <dic className="share-right">
                    <img src="" alt="" />
                </dic>
            </div>
        </div>
    )

}
export default  Share;