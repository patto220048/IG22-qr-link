import { useState } from 'react';
import LinksItems from '../../components/LinkItems/LinksItems';
import PreView from '../../components/Preview/PreView';
import { plusIcon } from '../../svg/icon';
import './Links.scss';
import AddLink from '../../components/AddLink/AddLink';
import { useSelector } from 'react-redux';
import Loading from '../../components/dialog/loading/Loading';

function Links() {
    const loading = useSelector((state) => state.url.loading);
    const [isAddLink, setIsAddLink] = useState(false);
    const handleAddLink = () => {
        setIsAddLink(true);
    };
    return (
        <div className="Links">
            <div className="Links-left">
                <div className="Links-contents">
                    {!isAddLink && (
                        <button className="Links-left-btn" onClick={handleAddLink}>
                            {loading ? (
                                <Loading urlLoading = {true} isLoading={loading} />
                            ) : (
                                <>{plusIcon(30, 30)} Add link</>
                            )}
                        </button>
                    )}
                    {isAddLink && <AddLink isAddLink={isAddLink} setIsAddLink={setIsAddLink} />}
                    <section className="Links-left-wapper">
                        <LinksItems />
                    </section>
                    {/* <Loading isLoading = {loading} /> */}
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
