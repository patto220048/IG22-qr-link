import TempProfile from '../../components/TempProfile/TempProfile';
import TempTheme from '../../components/TempTheme/TempTheme';
import './Template.scss';
function Template() {
    return (
        <div className="template">
            <div className="template-left">
                <section className="template-item">
                    <h2 className="tempProfile_title">Profile</h2>
                    <TempProfile />
                </section>
                <section className="template-item">
                    <h2 className="tempProfile_title">Themes</h2>
                    <TempTheme />
                </section>
            </div>
            <div className="template-right">
                <iframe className='template-preview' src="http://localhost:5173/profile/user/123" frameBorder="0">
                    
                </iframe>
            </div>
        </div>
    );
}

export default Template;
