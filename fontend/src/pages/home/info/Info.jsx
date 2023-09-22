import "./Info.scss"
import { Link } from 'react-router-dom';
function  Info() {
    return ( 
        <div className="info">
            <div className="info-container">
                <div className="info-left">

                    <img src="" alt="" />
                </div>
                <div className="info-right">
                    <h1 className='info-text'>Create and customize your own information card in just a few minutes."</h1>
                    <h3 className='info-text1'>Connect your TikTok, Instagram, Twitter, website, store, videos,
                     music and more. All in one click.</h3>
                    
                     <Link to="/register/signup"><button className='info-btn'>Get started for free</button></Link>
                </div>
            </div>
        </div>
    );
}

export default  Info;