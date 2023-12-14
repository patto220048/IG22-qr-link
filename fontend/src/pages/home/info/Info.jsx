import { useState } from 'react';
import './Info.scss';
import { Link } from 'react-router-dom';
function Info() {
    const [input, setInput] = useState()
    return (
        <div className="info">
            <div className="info-container">
                <div className="info-left">
                    <h1 className="info-text">Everything you are. In one, simple link in bio. </h1>
                    <p className='info-decs'>Create your own information link with your name</p>
                    <section className="info-section">
                        <input className="info-input" placeholder="Username" type="text" onChange={(e)=>setInput(e.target.value)} />

                        <Link to={`/register/signup/${input}`}>
                            <button className="info-btn">Claim your link</button>
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
