import { useSelector } from 'react-redux';
import Background from '../../components/Background/Background';
import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
import { useState } from 'react';
function Template() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [state, setState] = useState({})
    console.log(state)
    return (
        <div className="template">
            <div className="template-left">
                <section className="template-item">
                    <h2 className="tempProfile_title">Profile</h2>
                    <TempProfile />
                </section>
                <section className="template-item">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme setState={setState} />
                </section>
                <section className="template-item">
                    <h2 className="tempProfile_title">Background</h2>
                    <Background/>
                </section>
            </div>
            <div className="template-right">
                <img src={state.backgroundImg} alt="" />
                {/* <iframe className='template-preview' src={`http://localhost:5173/profile/user/${currentUser.username}`} frameBorder="0" loading="lazy" >
                    
                </iframe> */}
            </div>
        </div>
    );
}

export default Template;
