import { useState } from 'react';
import LinksItems from '../../components/LinkItems/LinksItems';
import PreView from '../../components/Preview/PreView';
import { plusIcon } from '../../svg/icon';
import './Links.scss';
import AddLink from '../../components/AddLink/AddLink';
import { useSelector } from 'react-redux';

function Links() {
    const {loading}= useSelector((state)=> state.url.currentUrl)
    const [isAddLink, setIsAddLink] = useState(false)
    const handleAddLink = () => {
        setIsAddLink(true);
    }
    return (
        <div className="Links">
            <div className="Links-left">
                <div className="Links-contents">
                    {!isAddLink && <button className="Links-left-btn" onClick={handleAddLink}>{plusIcon(30, 30)} Add Link</button>}
                    {isAddLink && <AddLink  isAddLink= {isAddLink} setIsAddLink={setIsAddLink}/>}
                    <section className="Links-left-wapper">
                        <LinksItems />
                    </section>
                </div>
         
            </div>
            {/* preview */}
            <div className="Links-right">
                <PreView />
            </div>
        </div>
    );
}

export default Links;
