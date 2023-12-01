import './Intro.scss';
import imgIntro from '../../../assets/img/Mind.png';
import { Link } from 'react-router-dom';


// import { Link } from 'react-router-dom';
function Intro() {
    return (
        <div className="intro">
            <div className="intro-container">
                {/* <div className="intro-img">
                    <img src={imgIntro} />
                    <p>PLATFORM FOR CREATORS</p>
                </div> */}
                    <div className="intro-group">
                        <div className="intro-img">
                            <img src={imgIntro} />
                        </div>
                        <p>PLATFORM FOR CREATORS</p>
                    </div>
                <h1 className="intro-text">Making bio links has never been easy</h1>
                <p className="intro-decs">We give creators the power and tools to express themselves in unique ways</p>
                <Link to= "/register/signup">
                    <button className="intro_button">Start now</button>
                </Link>
            </div>
        </div>
    );
}
export default Intro;
