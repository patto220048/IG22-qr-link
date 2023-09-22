import './Share.scss';
import { Link } from 'react-router-dom';
function Share() {
    return (
        <div className="share">
            <div className="share-container">
                <div className="share-left">
                    <h1 className="share-text">Quickly share your information with everyone.</h1>
                    <p className="share-desc">Input your information and generate the QR code or card as you desire ...</p>
                    <div className="share-btn">
                        <Link to="/register/signup">Get started for free</Link>
                    </div>
                </div>
                <div className="share-right">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
}
export default Share;
