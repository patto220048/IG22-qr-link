import './Info.scss';
import { Link } from 'react-router-dom';
function Info() {
    return (
        <div className="info">
            <div className="info-container">
                <div className="info-left">
                    <h1 className="info-text">Everything you are. In one, simple link in bio. </h1>
                    <p className='info-decs'>Create your own information link with your name</p>
                    <section className="info-section">
                        <input className="info-input" placeholder="123" type="text" />

                        <Link to="/register/signup">
                            <button className="info-btn">Click make your link</button>
                        </Link>
                    </section>
                </div>
                <div className="info-right">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Info;
