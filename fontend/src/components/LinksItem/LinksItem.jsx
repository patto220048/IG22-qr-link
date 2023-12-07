import { useEffect, useRef, useState } from 'react';
import './LinksItem.scss';
import * as Switch from '@radix-ui/react-switch';
import { penIcon, trashIcon } from '../../svg/icon';
import http from '../../instance/axiosInstance';
import { useDispatch } from 'react-redux';
import { urlDelete } from '../../redux-toolkit/UrlSlice';
import Alert from '../Alert/Alert';

function LinksItem({ linkUrl, linkTitle, linkThumbnail, linkId, onChange }) {
    const [isSwith, setIsSwitch] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isChangeTitle, setIsChangeTitle] = useState(false);
    const [urlTitle, setUrlTitle] = useState('');
    const inputTitleRef = useRef();
    const dispatch = useDispatch();

    const handleOpenAlert = () => {
        setIsAlert(true);
    };
    const onChangeTitle = (e) => {
        setUrlTitle({ ...urlTitle, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const handleClickOutside = () => {
            setIsChangeTitle(false);
        };
        inputTitleRef.current?.addEventListener('focusout', handleClickOutside);
        return () => {
            inputTitleRef.current?.removeEventListener('focusout', handleClickOutside);
        };
    }, []);
    return (
        <section className="LinksItem">
            <div className="LinksItem-drag-icon"></div>
            <div className="LinksItem-wapper">
                <div className="LinksItem-item">
                    <div className="LinksItem-side">
                        <div className="LinkItem-url">
                            {
                                <>
                                    <label
                                        htmlFor="input-title"
                                        className="input-title-label"
                                        style={isChangeTitle ? { display: 'none' } : { display: 'block' }}
                                    >
                                        {linkTitle}
                                    </label>
                                    <input
                                        ref={inputTitleRef}
                                        id="input-title"
                                        name="input-title"
                                        type="text"
                                        disabled={isChangeTitle ? false : true}
                                        onChange={onChangeTitle}
                                        style={isChangeTitle ? { display: 'block' } : { display: 'none' }}
                                        defaultValue={linkTitle}
                                    />
                                </>
                            }
                            {!isChangeTitle && (
                                <span className="LinkItem-pen-1" onClick={() => setIsChangeTitle(true)}>
                                    {penIcon(25, 25)}
                                </span>
                            )}
                        </div>
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
                    <li className="LinksItem-direct-delete" onClick={handleOpenAlert}>
                        {trashIcon(25, 25)}
                    </li>
                </ul>
                <div className="Alert-Delete" data-state={isAlert ? 'open' : 'closed'}>
                    {isAlert && <Alert linkId={linkId} setIsAlert={setIsAlert} isAlert={isAlert} />}
                </div>
            </div>
        </section>
    );
}

export default LinksItem;
