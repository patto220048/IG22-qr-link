import TempProfile from '../../components/TempProfile/TempProfile';
import './Template.scss';
function Template() {
    return (
        <div className="template">
            <div className="template-left">
                <div className="template-profile">
                    <h2 className="tempProfile_title">Profile</h2>
                    <TempProfile />
                </div>
            </div>
            <div className="template-right">2</div>
        </div>
    );
}

export default Template;
