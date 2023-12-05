import { closeIcon } from '../../svg/icon';
import './AddLink.scss';
function AddLink({ setIsAddLink,isAddLink }) {
    return (
        <div className={"AddLink "}>
            <div className="AddLink-wapper">
                <div className="AddLink-content">
                    <h2 className="AddLink-content_title">Enter your URL</h2>
                    <div className="AddLink-content_group">
                        <input type="text" className="AddLink-content_input" placeholder='Your URL' />
                        <button className='AddLink-content-btn'>ADD</button>
                    </div>

                    <section className="AddLink-content_option"></section>
                </div>

                <div className="AddLink-off" onClick={() => setIsAddLink(false)}>
                    {closeIcon(25, 25)}
                </div>
            </div>
        </div>
    );
}

export default AddLink;
