import './Card.scss';
import { Link } from 'react-router-dom';
function Card() {
    return (
        <div className="card">
            <div className="card-container">
                <div className="card-left">
                    <img src="" alt="" />
                </div>
                <div className="card-right">
                    <h3 className="card-text">
                        Create and customize your own information card in just a few minutes.
                    </h3>
                    <p className="card-desc">
                        Connect your TikTok, Instagram, Twitter, website, store, videos, music and more. All in one
                        click.
                    </p>
                    <div className='card-btn'>
                        <Link to="/register/signup">
                            Get started for free
                        </Link>
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default Card;
