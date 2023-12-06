import { useState } from 'react';
import './LinksItem.scss';
import * as Switch from '@radix-ui/react-switch';
import { penIcon, trashIcon } from '../../svg/icon';
import http from '../../instance/axiosInstance';
import { useDispatch } from 'react-redux';
import { urlDelete } from '../../redux-toolkit/UrlSlice';
function LinksItem({ linkUrl, linkTitle, linkThumbnail, linkId }) {
    const [isSwith, setIsSwitch] = useState(false);
    const dispatch = useDispatch();
    const handleDeleteUrl = () => {
        const deleteUrl = async () => {
            try {
                const res = await http.delete(`/link/${linkId}`);
                if (res.status === 200) {
                    dispatch(urlDelete(linkId));
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        deleteUrl();
    };
    return (
        <section className="LinksItem">
            <div className="LinksItem-drag-icon"></div>
            <div className="LinksItem-wapper">
                <div className="LinksItem-item">
                    <div className="LinksItem-side">
                        <h4 className="LinkItem-name">{linkTitle}</h4>
                        <div className="LinkItem-url">
                            <span className="LinkItem-link">{linkUrl}</span>
                            <span className="LinkItem-pen">{penIcon(25, 25)}</span>
                        </div>
                    </div>
                    <div className="LinksItem-switch">
                        <Switch.Root className="SwitchRoot" id="airplane-mode">
                            <Switch.Thumb
                                className="SwitchThumb"
                                checked={isSwith}
                                onClick={() => setIsSwitch(!isSwith)}
                            />
                        </Switch.Root>
                    </div>
                </div>
                <ul className="LinksItem-direct">
                    <li className="LinksItem-direct-item">1</li>
                    <li className="LinksItem-direct-item">2</li>
                    <li className="LinksItem-direct-item">3</li>
                    <li className="LinksItem-direct-item">4</li>
                    <li className="LinksItem-direct-delete" onClick={handleDeleteUrl}>
                        {trashIcon(25, 25)}
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default LinksItem;
