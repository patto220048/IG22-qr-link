import { useEffect, useState } from 'react';
import './Dialog_UI.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon, chevronRightIcon, chevronLeftIcon } from '../../svg/icon';
import Dialog_file from './dialog_file//Dialog_file';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, deleteFileImg } from '../../redux-toolkit/userSlice';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from '../../firebase/config';
import http from '../../instance/axiosInstance';
import { current } from '@reduxjs/toolkit';
import IconTable from './IconTable/IconTable';
import InputUrl from './InputUrl/InputUrl';
import { iconFail, iconStart, iconSuccess, iconUpdate } from '../../redux-toolkit/iconSlice';
import { addThemeIcon, deleteThemeIcon } from '../../redux-toolkit/themeSlice';
import iconThemes from '../../themes/icon';

function Dialog_UI({ openDialog, setOpenDialog, notifyToast, pickImg }) {
    // redux
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const { icons } = useSelector((state) => state.theme.currentTheme);
    const [avtUser, setAvtUser] = useState({});
    const [imgUpLoading, setImgUpLoading] = useState();
    const [openInputUrl, setOpenInputUrl] = useState(false);
    const [socialIconName, setSocialIconName] = useState();
    const [urlIcon, setUrlIcon] = useState('');
    const [clearIcon, setClearIcon] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isIcon, setIsIcon] = useState(false);
    const toLowerCase = (text) => {
        return text.toLowerCase();
    };
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
    //file default [upload]
    const [resultImg, setResultImg] = useState(null);
    const [avatar, setAvatar] = useState(undefined);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    // handle save database
    const handleAddAvt = (e) => {
        e.preventDefault();
        const updateUser = async () => {
            try {
                const res = await http.put(`/users/${currentUser._id}`, {
                    avtImg: resultImg.avatar,
                    avtImgName: currentAvatar,
                });
                if (res.status === 200) {
                    dispatch(updateData(res.data));
                    setResultImg(null);
                    setAvatar(undefined);
                } else {
                    notifyToast('Upload image failed !');
                }
            } catch (error) {
                console.log(error.message);
                notifyToast('Upload file error. Please try again!!');
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
        dispatch(iconStart());
        const addIcon = async () => {
            try {
                const res = await http.post(`/icon/${currentUser._id}`, {
                    iconName: socialIconName,
                    iconUrl: urlIcon,
                });
                // dispatch(iconUpdate(res.data))
                dispatch(addThemeIcon(res.data));
                setOpenInputUrl(false);
                notifyToast('Added icon successfully!');
            } catch (error) {
                dispatch(iconFail());
                console.log(error.message);
            }
        };
        addIcon();
    };
    const handleClearIcon = () => {
        const iconId = () =>
            icons.map((icon) => {
                if (icon.iconName === socialIconName) {
                    const deleteIcon = async () => {
                        try {
                            const res = await http.delete(`/icon/${icon._id}`);
                            dispatch(deleteThemeIcon(icon));
                            notifyToast('Deleted icon !!');
                        } catch (error) {
                            console.log(error.message);
                        }
                    };
                    deleteIcon();
                } else {
                    notifyToast('Some things error!');
                }
            });
        iconId();
    };
    return (
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay">
                    <Dialog.Content className="DialogContent">
                        {/* custom content here */}
                        {pickImg ? (
                            <>
                                <Dialog_file
                                    avtUser={avtUser}
                                    setAvatar={setAvatar}
                                    avatar={avatar}
                                    setResultImg={setResultImg}
                                    resultImg={resultImg}
                                    setCurrentAvatar={setCurrentAvatar}
                                    setImgUpLoading={setImgUpLoading}
                                />
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
                            </>
                        ) : (
                            <>
                                {openInputUrl ? (
                                    <>
                                        {iconThemes.map(
                                            (iconTheme) =>
                                                iconTheme.iconName === socialIconName && (
                                                    <>
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
                                                                <button className="dialog-btn" onClick={handleAddIcon}>
                                                                    Save changes
                                                                </button>
                                                            )}
                                                        </div>
                                                    </>
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
