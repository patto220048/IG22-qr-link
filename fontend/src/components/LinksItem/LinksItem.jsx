import { useEffect, useRef, useState } from 'react';
import './LinksItem.scss';
import * as Switch from '@radix-ui/react-switch';
import { penIcon, trashIcon } from '../../svg/icon';
import http from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { urlFail, urlStart, urlUpdate } from '../../redux-toolkit/UrlSlice';
import Alert from '../Alert/Alert';

function LinksItem({ linkUrl, linkTitle, linkThumbnail, linkId, onChange }) {
    const currentLink = useSelector((state) => state.url.currentUrl);

    const [isSwith, setIsSwitch] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isChangeTitle, setIsChangeTitle] = useState(false);
    const [isChangeUrl, setIsChangeUrl] = useState(false);
    const [values, setValues] = useState('');
    const inputTitleRef = useRef(null);
    const inputUrLRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const dispatch = useDispatch();
    const handleOpenAlert = () => {
        setIsAlert(true);
    };
    const onChangeTitle = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const handleClickOutInput = () => {
            const updateLink = async () => {
                try {
                    const res = await http.put(`/link/${linkId}`, {
                        urlTitle: values.inputTitle,
                    });
                    dispatch(urlUpdate(res.data));
                    setIsChangeTitle(false);
                } catch (error) {
                    console.log(error.message);
                    dispatch(urlFail());
                }
            };
            updateLink();
        };
        const handleClickOutSide = () => {
            setIsChangeTitle(false);
        };
        if (inputTitleRef) {
            inputTitleRef.current?.addEventListener('focusout', handleClickOutInput);
            return () => {
                inputTitleRef.current?.removeEventListener('focusout', handleClickOutInput);
            };
        }
    }, [linkId, values?.inputTitle, inputTitleRef?.current]);
    useEffect(() => {
        const handleClickOutside = () => {
            const updateLink = async () => {
                try {
                    const res = await http.put(`/link/${linkId}`, {
                        url: values.inputUrl,
                    });
                    dispatch(urlUpdate(res.data));
                    setIsChangeUrl(false);
                } catch (error) {
                    console.log(error.message);
                    dispatch(urlFail());
                }
            };
            updateLink();
        };
        if (inputUrLRef) {
            inputUrLRef.current?.addEventListener('focusout', handleClickOutside);
            return () => {
                inputUrLRef.current?.removeEventListener('focusout', handleClickOutside);
            };
        }
    }, [linkId, values?.inputUrl, inputUrLRef?.current]);
    const handleIsChangeTitle = (e) => {
        e.stopPropagation();
        setIsChangeTitle(true);
    };
    const handleFocused = (e) => {
        setFocused(true);
    };
    return (
        <section className="LinksItem">
            <div className="LinksItem-drag-icon"></div>
            <div className="LinksItem-wapper">
                <div className="LinksItem-item">
                    <div className="LinksItem-side">
                        <div className="LinkItem-url">
                            {
                                <>
                                    <span
                                        className="input-title-label"
                                        style={isChangeTitle ? { display: 'none' } : { display: 'block' }}
                                    >
                                        {currentLink.urlTitle ? currentLink.urlTitle : linkTitle}
                                    </span>
                                    <input
                                        ref={inputTitleRef}
                                        id="inputTitle"
                                        name="inputTitle"
                                        type="text"
                                        autoFocus={true}
                                        onBlur={handleFocused}
                                        disabled={isChangeTitle ? false : true}
                                        onChange={onChangeTitle}
                                        style={isChangeTitle ? { display: 'block' } : { display: 'none' }}
                                        defaultValue={currentLink.urlTitle ? currentLink.urlTitle : linkTitle}
                                        focused={focused.toString()}
                                    />
                                </>
                            }
                            {!isChangeTitle && (
                                <span className="LinkItem-pen" onClick={handleIsChangeTitle}>
                                    {penIcon(25, 25)}
                                </span>
                            )}
                        </div>
                        <div className="LinkItem-url">
                            <span
                                className="LinkItem-link"
                                style={isChangeUrl ? { display: 'none' } : { display: 'block' }}
                            >
                                {currentLink.url ? currentLink.url : linkUrl}
                            </span>
                            <input
                                ref={inputUrLRef}
                                onChange={onChangeTitle}
                                onBlur={handleFocused}
                                type="text"
                                name="inputUrl"
                                id="inputUrl"
                                disabled={isChangeUrl ? false : true}
                                focused={focused.toString()}
                                style={isChangeUrl ? { display: 'block' } : { display: 'none' }}
                                defaultValue={currentLink.url ? currentLink.url : linkUrl}
                            />
                            {!isChangeUrl && (
                                <span className="LinkItem-pen" onClick={() => setIsChangeUrl(true)}>
                                    {penIcon(25, 25)}
                                </span>
                            )}
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
