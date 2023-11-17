import { useEffect, useState } from 'react';
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
} from '../../redux-toolkit/userSlice';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from '../../firebase/config';
import http from '../../instance/axiosInstance';
import IconTable from './IconTable/IconTable';
import InputUrl from './InputUrl/InputUrl';
import iconThemes from '../../themes/icon';
import useRegex from '../../hooks/useRegex';

function Dialog_UI({ openDialog, setOpenDialog, notifyToast, pickImg, pickImgBg }) {
    // redux
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const { groupIcon } = useSelector((state) => state.user.currentUser);
    const isLoading = useSelector((state) => state.icon.loading);
    // upload avata
    const [avtUser, setAvtUser] = useState({});
    const [imgUpLoading, setImgUpLoading] = useState();
    //file default [upload]
    const [resultImg, setResultImg] = useState(null);
    const [avatar, setAvatar] = useState(undefined);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    // upload icon
    const [openInputUrl, setOpenInputUrl] = useState(false);
    const [socialIconName, setSocialIconName] = useState();
    const [urlIcon, setUrlIcon] = useState('');
    const [clearIcon, setClearIcon] = useState(false);
    // upload background
    const [bgImage, setBgImage] = useState();
    const [resultImgBg, setResultImgBg] = useState(null);

    // fetch user
    useEffect(() => {
        const fectchUser = async () => {
            try {
                const res = await http.get(`/users/v1/${currentUser._id}`);
                setAvtUser(res.data.avtImg);
            } catch (error) {
                console.log(error.message);
            }
        };
        fectchUser();
    }, [currentUser._id]);

    // handle save database
    const handleAddAvt = (e) => {
        e.preventDefault();
        const updateUser = async () => {
            dispatch(loadingStart());
            try {
                const res = await http.put(`/users/${currentUser._id}`, {
                    avtImg: resultImg.avatar,
                    avtImgName: currentAvatar,
                });
                if (res.status === 200) {
                    setResultImg(null);
                    setAvatar(undefined);
                    const timeOutId = setTimeout(() => {
                        dispatch(updateData(res.data));
                    }, 1000);
                    return () => {
                        clearTimeout(timeOutId);
                    };
                } else {
                    notifyToast('Upload image failed !');
                }
            } catch (error) {
                console.log(error.message);
                notifyToast('Upload file error. Please try again!!');
                dispatch(loadingEnd());
            }
        };
        if (resultImg) {
            updateUser();
        } else {
            notifyToast("Can't save when image is already exists !!");
        }
    };
    //handle delete img when click outside
    // useEffect(() => {
    //     const handleClickOutside = () => {
    //         avatar && deleteFile(avatar);
    //     };
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);
    const handleClear = (e) => {
        e.preventDefault();
        currentAvatar ? deleteFile(currentAvatar) : deleteFile(avtUser);
        const updateUser = async () => {
            try {
                const res = await http.put(`/users/${currentUser._id}`, {
                    avtImg: null,
                });
                if (res.status === 200) {
                    setResultImg(null);
                    setAvatar(undefined);
                    setAvtUser(null);
                    setResultImg(null);
                } else {
                    notifyToast('Upload image failed !');
                }
            } catch (error) {
                console.log(error.message);
                notifyToast('Upload file error. Please try again!!');
            }
        };
        updateUser();
    };
    // deleteFile in firebase
    const deleteFile = (file) => {
        const storage = getStorage(app);
        const desertRef = ref(storage, file);
        deleteObject(desertRef)
            .then(() => {
                console.log('successfully deleted');
                notifyToast('Deleted file !!');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    // const handleClose = (e) => {
    //     e.preventDefault();
    //     if (!resultImg) {
    //         notifyToast('File not found !!');
    //     }
    // };
    const hanleClose = (e) => {
        setOpenInputUrl(false);
    };
    const handleAddIcon = () => {
        const addIcon = async () => {
            const validInput = useRegex(urlIcon, socialIconName);
            if (validInput === true) {
                dispatch(loadingStart());
                try {
                    const res = await http.post(`/icon/${currentUser._id}`, {
                        iconName: socialIconName,
                        iconUrl: urlIcon,
                    });
                    notifyToast('Added icon successfully!');
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
                notifyToast('Link error!!');
            }
        };
        addIcon();
    };
    const handleClearIcon = () => {
        const iconId = () =>
            groupIcon.map((icon) => {
                if (icon.iconName === socialIconName) {
                    dispatch(loadingStart());

                    const deleteIcon = async () => {
                        try {
                            const res = await http.delete(`/icon/${icon._id}`);
                            notifyToast('Deleted icon !!');
                            const timeoutId = setTimeout(() => {
                                setOpenInputUrl(false);
                                dispatch(deleteThemeIcon(icon));
                            }, 1500);
                            return () => {
                                clearTimeout(timeoutId);
                            };
                        } catch (error) {
                            console.log(error.message);
                            dispatch(loadingEnd());
                        }
                    };
                    deleteIcon();
                }
            });
        iconId();
    };
    const handleClearImageBg = () => {};
    const handleAddImageBg = () => {};
    return (
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay">
                    <Dialog.Content className="DialogContent">
                        {/* custom content here */}
                        {pickImg || pickImgBg ? (
                            <>
                                <Dialog_file
                                    setResultImgBg={setResultImgBg}
                                    resultImgBg={resultImgBg}
                                    bgImage={bgImage}
                                    setBgImage={setBgImage}
                                    pickImgBg={pickImgBg}
                                    avtUser={avtUser}
                                    setAvatar={setAvatar}
                                    avatar={avatar}
                                    setResultImg={setResultImg}
                                    resultImg={resultImg}
                                    setCurrentAvatar={setCurrentAvatar}
                                    setImgUpLoading={setImgUpLoading}
                                />
                                {pickImgBg ? (
                                    <div className="dialog-btn-group-bg">
                                        <button className="dialog-btn" onClick={handleClearImageBg}>
                                            Clear
                                        </button>
                                        <button className="dialog-btn" onClick={handleAddImageBg}>
                                            Save changes
                                        </button>
                                    </div>
                                ) : (
                                    <div className="dialog-btn-group">
                                        {resultImg || avtUser ? (
                                            <button className="dialog-btn" onClick={handleClear}>
                                                Clear
                                            </button>
                                        ) : (
                                            <></>
                                        )}

                                        <button className="dialog-btn" onClick={handleAddAvt}>
                                            Save changes
                                        </button>
                                    </div>
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

export default Dialog_UI;
