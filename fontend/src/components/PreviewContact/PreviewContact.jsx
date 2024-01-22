import './PreviewContact.scss';
import { closeIcon, diamondIcon, homeIcon, jobIcon, phoneIcon } from '../../svg/icon';
import { useSelector } from 'react-redux';
function PreViewContact({ setIsContact, preview, window, isMobile }) {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div
            className="PreView-contact"
            style={
                preview || isMobile
                    ? { borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px', height: '620px' }
                    : { borderBottomLeftRadius: '0', borderBottomRightRadius: '0', width: '100%', height: '620px' }
            }
        >
            <div className="PreView-contact-head" style={window ? { maxWidth: '100%' } : { maxWidth: 'none' }}>
                <span>About me</span>
                <button className="PreView-contact-close" onClick={() => setIsContact(false)}>
                    {closeIcon(25, 25)}
                </button>
            </div>
            <div
                className="PreView-contact-body"
                style={window ? { margin: '0 auto', gap: '15px' } : { margin: 'none', gap: '10px' }}
            >
                <h2 className="PreView-contact-name">
                    {currentUser.usernameTitle ? currentUser.usernameTitle : currentUser.username}
                </h2>
                <p className="PreView-contact-desc">{currentUser.decs}</p>
                <section className="PreView-contact-group">
                    {diamondIcon(30, 30)}
                    <div className="PreView-contact-items">
                        <h4 className="PreView-contact-title">Personal</h4>
                        <p className="PreView-contact-item">{currentUser.emailWork}</p>
                    </div>
                </section>
                <section className="PreView-contact-group">
                    {phoneIcon(30, 30)}
                    <div className="PreView-contact-items">
                        <h4 className="PreView-contact-title">Phone</h4>
                        <p className="PreView-contact-item">{currentUser.phone}</p>
                    </div>
                </section>
                <section className="PreView-contact-group">
                    {homeIcon(40, 40)}
                    <div className="PreView-contact-items">
                        <h4 className="PreView-contact-title">Address</h4>
                        <p className="PreView-contact-item">
                            {currentUser.country},{currentUser.state},{currentUser.city},{currentUser.street},
                            {currentUser.apartment}
                        </p>
                    </div>
                </section>
                <section className="PreView-contact-group">
                    {jobIcon(30, 30)}
                    <div className="PreView-contact-items">
                        <h4 className="PreView-contact-title">Organization</h4>
                        <p className="PreView-contact-item">{currentUser.organization}</p>
                        <h4 className="PreView-contact-title">Position</h4>
                        <p className="PreView-contact-item">{currentUser.position}</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PreViewContact;
