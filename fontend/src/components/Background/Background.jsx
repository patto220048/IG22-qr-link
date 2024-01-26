import './Background.scss';
import { Chrome } from '@uiw/react-color';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../instance/axiosInstance';
import { themeFail, themeStart, updateTheme } from '../../redux-toolkit/themeSlice';
import { useRef } from 'react';
import BgColor from '../BgColor/BgColor';
import BgGadient from '../BgGadient/BgGadient';
import BgImage from '../BgImage/BgImage';
import BgVideo from '../BgIVideo/BgVideo';
import { alertCricleIcon } from '../../svg/icon';
import Dialog_UI from '../dialog/Dialog_IU';
import { ToastContainer, toast } from 'react-toastify';
function Background({ cardId, theme, setViewMb,setPickImg}) {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const [hex, setHex] = useState('#333333');
    const [hexGadientTop, setHexGadientTop] = useState('#333333');
    const [hexGadientBot, setHexGadientBot] = useState('#333333');
    const [isPickColor, setIsPickColor] = useState(false);
    const [isGardientTop, setIsGardientTop] = useState(false);
    const [isGardientBot, setIsGardientBot] = useState(false);
    const [isPickImgBg, setIsPickImgBg] = useState(false);
    const [isPickImgVideo, setIsPickImgVideo] = useState(false);
    const dispatch = useDispatch();
    const refColorBox = useRef();
    const refGadientTopBox = useRef();
    const refGadientBotBox = useRef();
    const [inputColor, setInputColor] = useState('#333333');
    const [openColor, setOpenColor] = useState(false);
    const [openGadient, setopenGadient] = useState(false);
    const inputRef = useRef();
    const notifyToast = (message, type) => {
        switch (type) {
            case 1:
                toast.success('🦄 ' + message);
                break;
            case 2:
                toast.error('Opps!! ' + message);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${cardId}`, {
                        bgColor: hex,
                        backgroundImg: null,
                        gadientColorTop: null,
                        gadientColorBot: null,
                        backgroundVideo: null,
                        backgroundImgName:null,
                        backgroundVideoName:null,
                    });
                    setIsPickColor(false);
                    window.location.reload(true);
                    let timeOutId = setTimeout(async () => {
                        dispatch(updateTheme(res.data));

                    }, 1000);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                } catch (error) {
                    dispatch(themeFail());
                    console.log(error.message);
                }
            };
            fetchTheme();
        };
        refColorBox.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refColorBox.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refColorBox?.current,hex]);
    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${cardId}`, {
                        gadientColorTop: hexGadientTop,
                        bgColor: null,
                        backgroundImg: null,
                        backgroundVideo: null,
                        backgroundImgName:null,
                        backgroundVideoName:null
                    });
                    setIsGardientTop(false);
                    window.location.reload(true);

                    console.log(res.data);
                    let timeOutId = setTimeout(async () => {
                        dispatch(updateTheme(res.data));
                    }, 1000);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                } catch (error) {
                    dispatch(themeFail());
                    console.log(error.message);
                }
            };
            fetchTheme();
        };
        refGadientTopBox.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refGadientTopBox.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refGadientTopBox?.current,hexGadientTop]);
    useEffect(() => {
        const handleClickOutside = () => {
            const fetchTheme = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${cardId}`, {
                        gadientColorBot: hexGadientBot,
                        backgroundImg: null,
                        bgColor: null,
                        backgroundVideo: null,
                        backgroundImgName:null,
                        backgroundVideoName:null
                    });
                    setIsGardientBot(false);
                    window.location.reload(true);

                    let timeOutId = setTimeout(async () => {
                        dispatch(updateTheme(res.data));
                    }, 1000);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                } catch (error) {
                    dispatch(themeFail());
                    console.log(error.message);
                }
            };
            fetchTheme();
        };
        refGadientBotBox.current?.addEventListener('mouseleave', handleClickOutside);
        return () => {
            refGadientBotBox.current?.removeEventListener('mouseleave', handleClickOutside);
        };
    }, [refGadientBotBox?.current,hexGadientBot]);

    const handlePickColor = (e) => {
        e.stopPropagation();
        setIsPickColor(!isPickColor);
        setIsPickImgBg(false);
        setIsPickImgVideo(false);
    };
    const handlePickGardientTop = (e) => {
        e.stopPropagation();
        setIsGardientTop(!isGardientTop);
        setIsGardientBot(false);
        setIsPickImgBg(false);
        setIsPickImgVideo(false);
    };
    const handlePickGardientBot = (e) => {
        e.stopPropagation();
        setIsGardientBot(!isGardientBot);
        setIsGardientTop(false);
        setIsPickImgBg(false);
        setIsPickImgVideo(false);
    };
    const handlePickImage = (e) => {
        e.stopPropagation();
        setHexGadientBot(false);
        setHexGadientTop(false);
        setIsPickColor(false);
        setIsPickImgBg(true);
        setIsPickImgVideo(false);
    };
    return (
        <div className="bgTheme" id="background">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            ></ToastContainer>
            <div className="bgTheme-items">
                <BgColor openColor={openColor} setOpenColor={setOpenColor} setopenGadient={setopenGadient} />
                <BgGadient setopenGadient={setopenGadient} setOpenColor={setOpenColor} />
                <BgImage
                    setIsPickImg={setIsPickImgBg}
                    setopenGadient={setopenGadient}
                    setOpenColor={setOpenColor}
                    setViewMb={setViewMb}
                    setPickImg={setPickImg}
                />
                <BgVideo
                    setIsPickImgVideo={setIsPickImgVideo}
                    setOpenColor={setOpenColor}
                    setopenGadient={setopenGadient}
                    setPickImg={setPickImg}

                />
            </div>

            {openColor && (
                <div className="pickColor">
                    <p className="pickColor-title">Color</p>
                    <div className="pickColor-item">
                        <div
                            className="pickColor-box"
                            onClick={handlePickColor}
                            style={{
                                backgroundColor: `${
                                    (currentTheme?.bgColor ? currentTheme?.bgColor : theme.bgColor) || hex
                                }`,
                            }}
                        ></div>
                        <input
                            ref={inputRef}
                            onChange={(e) => setInputColor(e.target.value)}
                            className="pickColor-input"
                            type="text"
                            placeholder={(currentTheme?.bgColor ? currentTheme?.bgColor : theme.bgColor) || hex}
                        />
                    </div>

                    {isPickColor && (
                        <Chrome
                            // onMouseLeave={() =>setIsPickColor(false)}
                            ref={refColorBox}
                            className="colorBox"
                            style={{ marginLeft: 20 }}
                            color={hex}
                            onChange={(color) => {
                                setHex(color.hex);
                            }}
                        />
                    )}
                </div>
            )}
            {openGadient && (
                <>
                    <div className="pickColor">
                        <div className="gadient-items">
                            <>
                                <p className="pickColor-title">Gadient Top</p>
                                <div className="pickColor-item">
                                    <div
                                        className="pickColor-box"
                                        onClick={handlePickGardientTop}
                                        style={{
                                            backgroundColor: `${
                                                (currentTheme?.gadientColorTop
                                                    ? currentTheme?.gadientColorTop
                                                    : theme?.gadientColorTop) || hexGadientTop
                                            }`,
                                        }}
                                    ></div>
                                    <input
                                        ref={inputRef}
                                        // onChange={(e) => setInputColor(e.target.value)}
                                        className="pickColor-input"
                                        type="text"
                                        placeholder={
                                            currentTheme?.gadientColorTop
                                                ? currentTheme?.gadientColorTop
                                                : theme?.gadientColorTop || hexGadientTop
                                        }
                                    />
                                </div>
                            </>
                            <>
                                <p className="pickColor-title">Gadient Bottom</p>
                                <div className="pickColor-item">
                                    <div
                                        className="pickColor-box"
                                        onClick={handlePickGardientBot}
                                        style={{
                                            backgroundColor: `${
                                                (currentTheme?.gadientColorBot
                                                    ? currentTheme?.gadientColorBot
                                                    : theme?.gadientColorBot) || hexGadientBot
                                            }`,
                                        }}
                                    ></div>
                                    <input
                                        ref={inputRef}
                                        // onChange={(e) => setInputColor(e.target.value)}
                                        className="pickColor-input"
                                        type="text"
                                        placeholder={
                                            (currentTheme?.gadientColorBot
                                                ? currentTheme?.gadientColorBot
                                                : theme?.gadientColorBot) || hexGadientBot
                                        }
                                    />
                                </div>
                            </>
                        </div>

                        {isPickColor && (
                            <Chrome
                                // onMouseLeave={() =>setIsPickColor(false)}
                                ref={refColorBox}
                                className="colorBox"
                                style={{ marginLeft: 20 }}
                                color={hex}
                                onChange={(color) => {
                                    setHex(color.hex);
                                }}
                            />
                        )}
                        {isGardientTop && (
                            <Chrome
                                // onMouseLeave={() =>setIsPickColor(false)}
                                ref={refGadientTopBox}
                                className="colorBoxTop"
                                style={{ marginLeft: 20 }}
                                color={hexGadientTop}
                                onChange={(color) => {
                                    setHexGadientTop(color.hex);
                                }}
                            />
                        )}
                        {isGardientBot && (
                            <Chrome
                                // onMouseLeave={() =>setIsPickColor(false)}
                                ref={refGadientBotBox}
                                className="colorBoxBot"
                                style={{ marginLeft: 20 }}
                                color={hexGadientBot}
                                onChange={(color) => {
                                    setHexGadientBot(color.hex);
                                }}
                            />
                        )}
                    </div>
                </>
            )}
            {isPickImgBg && (
                <Dialog_UI
                    openDialog={isPickImgBg}
                    setOpenDialog={setIsPickImgBg}
                    pickImgBg={isPickImgBg}
                    notifyToast={notifyToast}
                    setIsPickImgBg={setIsPickImgBg}
                />
            )}
            {isPickImgVideo && (
                <Dialog_UI
                    openDialog={isPickImgVideo}
                    setOpenDialog={setIsPickImgVideo}
                    pickImgVideo={isPickImgVideo}
                    notifyToast={notifyToast}
                    setIsPickImgVideo={setIsPickImgVideo}
                />
            )}
        </div>
    );
}

export default memo(Background);
