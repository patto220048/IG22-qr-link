import { useEffect, useState } from 'react';
import './Dialog_UI.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon } from '../../svg/icon';
import Dialog_file from './dialog_file//Dialog_file';
import { useDispatch, useSelector } from 'react-redux';
import { updateData , deleteFileImg} from '../../redux-toolkit/userSlice';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from '../../firebase/config';
import http from '../../instance/axiosInstance';
import { current } from '@reduxjs/toolkit';

function Dialog_UI({ openDialog, setOpenDialog, notifyToast }) {
    //toast message
  
    const currentUser = useSelector((state) => state.user.currentUser);
 
    //file default
    const [resultImg, setResultImg] = useState(null);
    const [avatar, setAvatar] = useState(undefined);

    const [currentAvatar, setCurrentAvatar] = useState(null);
    console.log(currentAvatar)
    // redux
    const dispatch = useDispatch();
    // handle save database
    const handleSave = (e) => {
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
        updateUser();
    };
    //handle delete img when click outside
    useEffect(() => {
        const handleClickOutside = () => {
            avatar && deleteFile(avatar);
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [avatar]);
    const handleClear = () => { 
        currentAvatar ?  deleteFile(currentAvatar) :deleteFile(currentUser.avtImgName)
        setResultImg(null);
        setAvatar(undefined);
    };
    // deleteFile in firebase
    const deleteFile = (file) => {
        const storage = getStorage(app);
        const desertRef = ref(storage, file);
        deleteObject(desertRef)
            .then(() => {
                console.log('successfully deleted');
                dispatch(deleteFileImg(null))
                notifyToast('Deleted file !!');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay">
                    <Dialog.Content className="DialogContent">
                        {/* custom content here */}
                        <Dialog_file
                            setAvatar={setAvatar}
                            avatar={avatar}
                            setResultImg={setResultImg}
                            resultImg={resultImg}
                            setCurrentAvatar={setCurrentAvatar}
                        />
                        {/* ---------------------------------- */}
                        <div className="dialog-btn-group">
                            {resultImg || currentUser.avtImg ? (
                                <button className="dialog-btn" onClick={handleClear}>
                                    Clear
                                </button>
                            ) : (
                                <></>
                            )}
                            <button className="dialog-btn" onClick={handleSave}>
                                Save changes
                            </button>
                        </div>

                        <Dialog.Close asChild className="closeIcon-btn">
                            {closeIcon(20, 20)}
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Dialog_UI;
