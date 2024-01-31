import { useEffect, useState, memo, useCallback } from 'react';
import './Dialog_UI.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon, chevronRightIcon, chevronLeftIcon } from '../../svg/icon';
import Dialog_file from './dialog_file//Dialog_file';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateData,
    deleteFileImg,
    addThemeIcon,
    deleteThemeIcon,
    loadingStart,
    loadingEnd,
    clearAvtImg,
} from '../../redux-toolkit/userSlice';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from '../../firebase/config';
import http from '../../instance/axiosInstance';
import IconTable from './IconTable/IconTable';
import InputUrl from './InputUrl/InputUrl';
import iconThemes from '../../themes/icon';
import useRegex from '../../hooks/useRegex';
import {
    clearBgImg,
    clearBgVideo,
    themeFail,
    themeStart,
    themeSuccess,
    updateTheme,
} from '../../redux-toolkit/themeSlice';
import FontTable from '../FontTable/FontTable';
import { urlUpdate } from '../../redux-toolkit/UrlSlice';

function Dialog_UI({
    openDialog,
    setOpenDialog,
    notifyToast,
    pickImg,
    pickImgBg,
    user,
    pickImgVideo,
    setIsPickImgBg,
    setIsPickImgVideo,
    isFonts,
    setIsFonts,
    thumbnail,
    thumbnailUser,
    linkId,
    setIsThumbnail,
}) {
    // redux
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    const { groupIcon } = useSelector((state) => state.user.currentUser);
    const isLoading = useSelector((state) => state.icon.loading);
    // upload avatar
    const [imgUpLoading, setImgUpLoading] = useState(false);
    //file default [upload]
    const [resultImg, setResultImg] = useState(null);
    const [avatar, setAvatar] = useState(undefined);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    // upload icon
    const [openInputUrl, setOpenInputUrl] = useState(false);
    const [socialIconName, setSocialIconName] = useState();
    const [urlIcon, setUrlIcon] = useState('');
    const [clearIcon, setClearIcon] = useState(false);
    // upload img background
    const [bgImage, setBgImage] = useState();
    //upload video background
    const [bgVideo, setBgVideo] = useState(undefined);
    const [resultVideo, setResultVideo] = useState(null);
    const [currentVideoBg, setCurrentVideoBg] = useState(null);
    // const [themeBgUser, setThemeBgUser] = useState({});
    const [resultImgBg, setResultImgBg] = useState(null);
    const [currentBackground, setCurrentBackground] = useState(null);
    const [themeBgUser, setThemeBgUser] = useState({});
    // font
    const [fontFamily, setFontFamily] = useState({
        family: '',
        weight: 0,
    });
    // thumbnail
    const [thumbImage, setThumbImage] = useState();
    const [resultThumb, setResultThumb] = useState(null);
    const [currentThumbnail, setCurrentThumbnail] = useState();
    useEffect(() => {
        const fectchTheme = async () => {
            try {
                const res = await http.get(`/card/v1/${currentUser._id}`);

                setThemeBgUser(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fectchTheme();
    }, [currentUser._id]);
    // handle save database
    const handleAddAvt = useCallback(
        (e) => {
            e.preventDefault();
            const updateUser = async () => {
                dispatch(loadingStart());
                try {
                    const res = await http.put(`/users/${currentUser._id}`, {
                        avtImg: resultImg?.avatar,
                        avtImgName: currentAvatar,
                    });
                    if (res.status === 200) {
                        notifyToast('Upload image successfull.', 1);
                        setResultImg(null);
                        setAvatar(undefined);
                        const timeOutId = setTimeout(() => {
                            dispatch(updateData(res.data));
                        }, 500);
                        return () => {
                            clearTimeout(timeOutId);
                        };
                    } else {
                        notifyToast('Upload image unsuccessfull.', 2);
                    }
                } catch (error) {
                    console.log(error.message);
                    notifyToast('Upload image failed. Please try again!', 2);
                    dispatch(loadingEnd());
                }
            };
            if (resultImg) {
                updateUser();
            } else {
                notifyToast('Some things error. Please try again!!', 2);
            }
        },
        [currentUser._id, resultImg?.avatar],
    );
    const handleClearAvt = useCallback(
        (e) => {
            e.preventDefault();
            const updateUser = async () => {
                try {
                    const res = await http.put(`/users/${currentUser._id}`, {
                        avtImg: null,
                        avtImgName: null,
                    });
                    if (res.status === 200) {
                        setResultImg(null);
                        setAvatar(undefined);
                        setResultImg(null);
                        dispatch(clearAvtImg());
                    } else {
                        notifyToast('Clear image unsuccessfully.', 2);
                    }
                } catch (error) {
                    console.log(error.message);
                    notifyToast('Some things error. Please try again!!', 2);
                }
            };
            updateUser();
            currentAvatar ? deleteFile(currentAvatar) : deleteFile(user?.avtImg);
        },
        [currentUser._id, currentAvatar, user?.avtImg],
    );
    // deleteFile in firebase
    const deleteFile = useCallback((file) => {
        if (file) {
            const storage = getStorage(app);
            const desertRef = ref(storage, file);
            deleteObject(desertRef)
                .then(() => {
                    notifyToast('Clear file successfully', 1);
                    console("cleared!")
                })
                .catch((error) => {
                    notifyToast('Not found file !!', 2);
                    console.log(error.message);
                 
                });
        }
    }, []);
    // const handleClose = (e) => {
    //     e.preventDefault();
    //     if (!resultImg) {
    //         notifyToast('File not found !!');
    //     }
    // };
    const hanleClose = (e) => {
        setOpenInputUrl(false);
    };
    const handleAddIcon = useCallback(() => {
        const addIcon = async () => {
            const validInput = useRegex(urlIcon, socialIconName);
            if (validInput === true) {
                dispatch(loadingStart());
                try {
                    const res = await http.post(`/icon/${currentUser._id}`, {
                        iconName: socialIconName,
                        iconUrl: urlIcon,
                    });
                    notifyToast('Added icon successfully!', 1);
                    const timeoutId = setTimeout(() => {
                        setOpenInputUrl(false);
                        dispatch(addThemeIcon(res.data));
                    }, 1500);
                    return () => {
                        clearTimeout(timeoutId);
                    };
                } catch (error) {
                    console.log(error.message);
                    dispatch(loadingEnd());
                }
            } else {
                notifyToast('Link somethings error!! Please try again.', 2);
            }
        };
        addIcon();
    }, [socialIconName, urlIcon, currentUser._id]);
    const handleClearIcon = useCallback(() => {
        const iconId = () =>
            groupIcon.map((icon) => {
                if (icon?.iconName === socialIconName) {
                    dispatch(loadingStart());
                    const deleteIcon = async () => {
                        try {
                            const res = await http.delete(`/icon/${icon?._id}`);
                            notifyToast('Deleted icon !!', 1);
                            const timeoutId = setTimeout(() => {
                                setOpenInputUrl(false);
                                dispatch(deleteThemeIcon(icon));
                            }, 1500);
                            return () => {
                                clearTimeout(timeoutId);
                            };
                        } catch (error) {
                            notifyToast('Deleted icon fail !!', 2);
                            console.log(error.message);
                            dispatch(loadingEnd());
                        }
                    };
                    deleteIcon();
                }
            });
        iconId();
    }, [socialIconName]);
    const handleClearImageBg = useCallback(
        (e) => {
            e.preventDefault();
            const updateTheme = async () => {
                try {
                    const res = await http.put(`/card/${currentTheme?._id}`, {
                        backgroundImg: null,
                        backgroundImgName: null,
                    });
                    setResultImgBg(null);
                    setBgImage(undefined);
                    setResultImgBg(null);
                    setIsPickImgBg(false);
                    dispatch(clearBgImg());
                } catch (error) {
                    console.log(error.message);
                    notifyToast('Clear file error. Please try again!!', 2);
                }
            };
            updateTheme();
            currentBackground ? deleteFile(currentBackground) : deleteFile(themeBgUser?.backgroundImgName);
        },
        [currentTheme?._id, currentBackground, themeBgUser?.backgroundImgName],
    );
    const handleAddImageBg = useCallback(
        (e) => {
            e.preventDefault();
            const updateBg = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${themeBgUser?._id}`, {
                        backgroundImg: resultImgBg?.background,
                        backgroundImgName: currentBackground,
                        backgroundVideo: null,
                        backgroundVideoName: null,
                        bgColor: null,
                    });
                    if (res.status === 200) {
                        notifyToast('Upload image successfully!', 1);
                        setResultImgBg(null);
                        setBgImage(undefined);
                        setOpenDialog(false);
                        const timeOutId = setTimeout(() => {
                            dispatch(updateTheme(res.data));
                        }, 1000);
                        return () => {
                            clearTimeout(timeOutId);
                        };
                    } else {
                        notifyToast('Upload image failed !', 2);
                    }
                } catch (error) {
                    console.log(error.message);
                    notifyToast('Upload file error. Please try again!!', 2);
                    dispatch(themeFail());
                }
            };
            if (resultImgBg) {
                updateBg();
                if (currentTheme?.backgroundImgName) {
                    deleteFile(currentTheme?.backgroundImgName);
                    console.log('cleared result');
                }
            } else {
                notifyToast('File not found. Please try again!!', 2);
            }
        },
        [resultImgBg?.background, currentBackground],
    );
    // video handle
    const handleAddVideoBg = useCallback(
        (e) => {
            const updateBg = async () => {
                dispatch(themeStart());
                try {
                    const res = await http.put(`/card/${currentTheme?._id}`, {
                        backgroundVideo: resultVideo?.video,
                        backgroundVideoName: currentVideoBg,
                        backgroundImg: null,
                        backgroundImgName: null,
                        bgColor: null,
                    });
                    if (res.status === 200) {
                        notifyToast('Upload video successfully!', 1);
                        setResultVideo(null);
                        setBgVideo(undefined);
                        setOpenDialog(false);
                        const timeOutId = setTimeout(() => {
                            dispatch(updateTheme(res.data));
                        }, 1000);
                        return () => {
                            clearTimeout(timeOutId);
                        };
                    } else {
                        dispatch(themeFail());
                        notifyToast('Upload video failed !', 2);
                    }
                } catch (error) {
                    console.log(error.message);
                    notifyToast('Upload file error. Please try again!!', 2);
                    dispatch(themeFail());
                }
            };
            if (resultVideo) {
                updateBg();
                if (currentTheme?.backgroundVideo) {
                    deleteFile(currentTheme?.backgroundVideo);
                    console.log('cleared result');
                }
            } else {
                notifyToast('File not found. Please try again!!', 2);
            }
        },
        [themeBgUser?._id, resultVideo?.video, currentVideoBg],
    );
    const handleClearVideoBg = useCallback(
        (e) => {
            const updateTheme = async () => {
                try {
                    const res = await http.put(`/card/${currentTheme?._id}`, {
                        backgroundVideo: null,
                        backgroundVideoName: null,
                    });
                    setResultVideo(null);
                    setBgVideo(undefined);
                    setIsPickImgVideo(false);
                    setOpenDialog(false);
                    dispatch(clearBgVideo());
                } catch (error) {
                    console.log(error.message);
                    notifyToast('Clear file error. Please try again!!', 2);
                }
            };
            updateTheme();
            currentVideoBg ? deleteFile(currentVideoBg) : deleteFile(themeBgUser?.backgroundVideoName);
        },
        [currentTheme?._id, currentVideoBg, themeBgUser?.backgroundVideoName],
    );

    const handleSaveFont = useCallback(
        (font) => {
            const updateFont = async () => {
                try {
                    const res = await http.put(`/card/${currentTheme?._id}`, {
                        font_famify: font.family,
                        font_weight: font.weight,
                    });
                    setIsFonts(false);
                    dispatch(updateTheme(res.data));
                } catch (error) {
                    console.log(error.message);
                }
            };
            updateFont();
        },
        [currentTheme?._id],
    );
    const handleSaveThumbnail = useCallback(() => {
        const updateUrl = async () => {
            try {
                const res = await http.put(`/link/${linkId}`, {
                    thumbnailImage: resultThumb?.thumbnail,
                });
                if (res.status === 200) {
                    setIsThumbnail(false);
                    setResultThumb(null);
                    setThumbImage(undefined);
                    setOpenDialog(false);
                    const timeOutId = setTimeout(() => {
                        dispatch(urlUpdate(res.data));
                    }, 500);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                }
            } catch (error) {
                console.log(error.message);
            }
            
        };
        updateUrl();
    }, [linkId, resultThumb]);
    const handleClearThumbnail = useCallback(() => {
        const updateUrl = async () => {
            try {
                const res = await http.put(`/link/${linkId}`, {
                    thumbnailImage: null,
                });
                if (res.status === 200) {
                    setIsThumbnail(false);
                    setResultThumb(null);
                    setThumbImage(undefined);
                    setOpenDialog(false);
                    const timeOutId = setTimeout(() => {
                        dispatch(urlUpdate(res.data));
                    }, 500);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                }
            } catch (error) {
                console.log(error.message);
            }
            currentThumbnail ? deleteFile(currentThumbnail) : deleteFile(thumbnailUser);
        };
        updateUrl();
    }, [linkId,currentThumbnail,thumbnailUser]);
    return (
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay">
                    <Dialog.Content className="DialogContent">
                        {/* custom content here */}
                        {pickImgBg || pickImg || pickImgVideo || isFonts || thumbnail ? (
                            <>
                                {pickImg && (
                                    <>
                                        <Dialog_file
                                            avtUser={user?.avtImg}
                                            setAvatar={setAvatar}
                                            avatar={avatar}
                                            setResultImg={setResultImg}
                                            resultImg={resultImg}
                                            setCurrentAvatar={setCurrentAvatar}
                                            setImgUpLoading={setImgUpLoading}
                                            isAvatar={'avatar'}
                                            pickImg={pickImg}
                                        />
                                        <div className="dialog-btn-group">
                                            {resultImg || user?.avtImg ? (
                                                <button className="dialog-btn" onClick={handleClearAvt}>
                                                    Clear
                                                </button>
                                            ) : (
                                                <></>
                                            )}

                                            <button className="dialog-btn" onClick={handleAddAvt}>
                                                Save changes
                                            </button>
                                        </div>
                                    </>
                                )}
                                {pickImgBg && (
                                    <>
                                        <Dialog_file
                                            setCurrentBackground={setCurrentBackground}
                                            resultImgBg={resultImgBg}
                                            setResultImgBg={setResultImgBg}
                                            themeBgUser={themeBgUser?.backgroundImg}
                                            bgImage={bgImage}
                                            setBgImage={setBgImage}
                                            pickImgBg={pickImgBg}
                                            isBackground={'background'}
                                        />
                                        <div className="dialog-btn-group-bg">
                                            {themeBgUser?.backgroundImg || resultImgBg ? (
                                                <button className="dialog-btn" onClick={handleClearImageBg}>
                                                    Clear
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                            <button className="dialog-btn" onClick={handleAddImageBg}>
                                                Save changes
                                            </button>
                                        </div>
                                    </>
                                )}
                                {pickImgVideo && (
                                    <>
                                        <Dialog_file
                                            themeBgUserVideo={themeBgUser?.backgroundVideo}
                                            setCurrentVideoBg={setCurrentVideoBg}
                                            bgVideo={bgVideo}
                                            setBgVideo={setBgVideo}
                                            pickImgVideo={pickImgVideo}
                                            resultVideo={resultVideo}
                                            setResultVideo={setResultVideo}
                                        />
                                        <div className="dialog-btn-group">
                                            <button className="dialog-btn" onClick={handleClearVideoBg}>
                                                Clear
                                            </button>
                                            <button className="dialog-btn" onClick={handleAddVideoBg}>
                                                Save changes
                                            </button>
                                        </div>
                                    </>
                                )}
                                {isFonts && (
                                    <>
                                        <FontTable
                                            setIsFonts={setIsFonts}
                                            setFontFamily={setFontFamily}
                                            fontFamily={fontFamily}
                                        />
                                        <div className="dialog-btn-group">
                                            <button className="dialog-btn" onClick={() => handleSaveFont(fontFamily)}>
                                                Save changes
                                            </button>
                                        </div>
                                    </>
                                )}
                                {thumbnail && (
                                    <>
                                        <Dialog_file
                                            thumbnail={thumbnail}
                                            setThumbImage={setThumbImage}
                                            thumbImage={thumbImage}
                                            resultThumb={resultThumb}
                                            setResultThumb={setResultThumb}
                                            setCurrentThumbnail={setCurrentThumbnail}
                                            currentThumbnail={currentThumbnail}
                                            thumbnailUser={thumbnailUser}
                                        />
                                        <div className="dialog-btn-group">
                                            <button className="dialog-btn" onClick={handleClearThumbnail}>
                                                Clear
                                            </button>
                                            <button className="dialog-btn" onClick={handleSaveThumbnail}>
                                                Save changes
                                            </button>
                                        </div>
                                        <Dialog.Close asChild className="closeIcon-btn" disabled onClick={hanleClose}>
                                            {closeIcon(20, 20)}
                                        </Dialog.Close>
                                   
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {openInputUrl ? (
                                    <>
                                        {iconThemes.map(
                                            (iconTheme, index) =>
                                                iconTheme.iconName === socialIconName && (
                                                    <div key={index}>
                                                        <InputUrl
                                                            socialIconName={socialIconName}
                                                            setUrlIcon={setUrlIcon}
                                                            setClearIcon={setClearIcon}
                                                        />

                                                        <div className="dialog-btn-group">
                                                            {clearIcon ? (
                                                                <button
                                                                    className="dialog-btn"
                                                                    onClick={handleClearIcon}
                                                                >
                                                                    Clear
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    {isLoading ? (
                                                                        <></>
                                                                    ) : (
                                                                        <button
                                                                            className="dialog-btn"
                                                                            onClick={handleAddIcon}
                                                                        >
                                                                            Save changes
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ),
                                        )}
                                    </>
                                ) : (
                                    <IconTable
                                        setClearIcon={setClearIcon}
                                        setOpenInputUrl={setOpenInputUrl}
                                        setSocialIconName={setSocialIconName}
                                    />
                                )}
                            </>
                        )}

                        {/* ---------------------------------- */}
                        <Dialog.Close asChild className="closeIcon-btn" disabled onClick={hanleClose}>
                            {closeIcon(20, 20)}
                        </Dialog.Close>
                        {openInputUrl && (
                            <div className="chevron-btn" onClick={hanleClose}>
                                {chevronLeftIcon(20, 20)}
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default memo(Dialog_UI);
