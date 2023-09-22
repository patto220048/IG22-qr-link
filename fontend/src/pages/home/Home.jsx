import { Link } from 'react-router-dom';
import './Home.scss';
import { useState } from 'react';
import Info from './info/Info';
import Share from './share/Share';

function Home() {
    const [homeInput, setHomeInput] = useState("")
    return (
        <div className="home">
            <div className="home-container">
                <div className="home-left">
                    <h1 className='home-text'>Everything you are. In one, simple link in bio. </h1>
                    <section className="home-section">
                        <input className='home-input' placeholder='123' type="text" />
                      <Link to="/register/signup"><button className='home-btn'>Click make your link</button></Link>
                    </section>
                </div>
                <div className="home-right">
               
                    <img src="" alt="" />
                </div>
            </div>
            <div className="info-container">
                <Info/>
            </div>
            <div className="share-container">
                <Share/>
            </div>
        
        </div>
       
        
    );
}

export default Home;
