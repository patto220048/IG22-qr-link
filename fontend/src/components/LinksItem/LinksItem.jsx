import { useEffect, useRef, useState } from 'react';
import './LinksItem.scss';
import * as Switch from '@radix-ui/react-switch';
import { penIcon, thumbnailIcon, trashIcon, userIcon } from '../../svg/icon';
import http from '../../instance/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { urlFail, urlStart, urlUpdate } from '../../redux-toolkit/UrlSlice';
import Alert from '../Alert/Alert';
// import { themeIsloading, themeStart } from '../../redux-toolkit/themeSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
function LinksItem({
    linkUrl,
    linkTitle,
    linkThumbnail,
    linkId,
    onChange,
    linkIndex,
    acticve,
    headerStyle,
    urlStyle,
    linkDesc,
    contactStyle,
    user
}) {
    const currentLink = useSelector((state) => state.url.currentUrl);
    // console.log(currentLink)
    const [isChecked, setIsChecked] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isChangeTitle, setIsChangeTitle] = useState(false);
    const [isChangeDesc, setIsChangeDesc] = useState(false);
    const [isChangeUrl, setIsChangeUrl] = useState(false);
    const [values, setValues] = useState('');
    const inputTitleRef = useRef(null);
    const inputUrLRef = useRef(null);
    const inputDescRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const dispatch = useDispatch();
    // detail contact
    const [isDetail, setIsDetail] = useState(false);
    // thumnail
    const [isThumbnail, setIsThumbnail] = useState(false);
    const onChangeTitle = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleCheckboxChange = (linkId, e) => {
        const updateLink = async () => {
            try {
                const res = await http.put(`/link/${linkId}`, {
                    acticve: !isChecked,
                });
                dispatch(urlUpdate(res.data));
                setIsChecked(!isChecked);
            } catch (error) {
                console.log(error.message);
            }
        };
        updateLink();
    };
    useEffect(() => {
        const handleClickOutInput = () => {
            const updateLink = async () => {
                dispatch(urlStart());
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
    const handleIsChangeDesc = (e) => {
        e.stopPropagation();
        setIsChangeDesc(true);
    };
    const handleFocused = (e) => {
        setFocused(true);
    };
    // useEffect(() => {
    //     const handleClickOutside = () => {
    //         console.log( switchRef.current.value)
    //     };
    //     switchRef.current.
    // }, []);

    function handleSelect(linkIndex) {
        console.log(linkIndex);
    }

    const handleOpenAlert = () => {
        setIsAlert(true);
        setIsDetail(false);
        setIsThumbnail(false);
    };
    const handleOpenDetail = () => {
        setIsAlert(false);
        setIsDetail(true);
        setIsThumbnail(false);
    };
    const handleOpenThumbnail = () => {
        setIsThumbnail(true);
        setIsAlert(false);
        setIsDetail(false);
    };
    return (
        <section className="LinksItem">
            <div className="LinksItem-drag-icon"></div>
            <div className="LinksItem-wapper">
                <div className="LinksItem-item">
                    {!headerStyle && (
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

                            {!contactStyle && (
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
                            )}
                        </div>
                    )}

                    <div className="LinksItem-switch">
                        <input
                            data-state={(acticve ? acticve : isChecked) ? 'checked' : ''}
                            type="checkbox"
                            name={`switch` + linkId}
                            id={`switch` + linkId}
                            className={`switch` + linkId}
                            checked={acticve ? acticve : isChecked}
                            onChange={() => handleCheckboxChange(linkId)}
                        />
                        <label htmlFor={`switch` + linkId}>Toggle</label>
                    </div>
                </div>

                <ul className="LinksItem-direct">
                    {!urlStyle && (
                        <Tippy content="Details Contact" placement="top" arrow={true} animation="fade">
                            <li
                                className={`LinksItem-direct-item ${contactStyle ? 'contact_focus' : ''}`}
                                onClick={handleOpenDetail}
                            >
                                {userIcon(25, 25)}
                            </li>
                        </Tippy>
                    )}
                    <Tippy content="Add Thumbnail" placement="top" arrow={true} animation="fade">
                        <li
                            className={`LinksItem-direct-item ${linkThumbnail ? 'contact_focus' : ''}`}
                            onClick={handleOpenThumbnail}
                        >
                            {thumbnailIcon(25, 25)}
                        </li>
                    </Tippy>
                    {/* <li className="LinksItem-direct-item">3</li>
                        <li className="LinksItem-direct-item">4</li> */}
                    <li className="LinksItem-direct-delete" onClick={handleOpenAlert}>
                        {trashIcon(25, 25)}
                    </li>
                </ul>

                <div className="Alert-Delete" data-state={isAlert || isDetail ? 'open' : 'closed'}>
                    {isAlert && <Alert linkId={linkId} setIsAlert={setIsAlert} isAlert={isAlert} />}
                    {isDetail && <Alert  linkId={linkId} isDetail={isDetail} setIsDetail={setIsDetail} user={user} />}
                    {isThumbnail && (
                        <Alert
                            linkId={linkId}
                            isThumbnail={isThumbnail}
                            setIsThumbnail={setIsThumbnail}
                            linkThumbnail={linkThumbnail}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default LinksItem;
