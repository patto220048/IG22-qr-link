import { useEffect, useState } from 'react';
import './Dialog_UI.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon } from '../../svg/icon';
import Dialog_file from './dialog_file//Dialog_file';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../redux-toolkit/userSlice';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from '../../firebase/config';
import http from '../../instance/axiosInstance';

function Dialog_UI({ openDialog, setOpenDialog, notifyToast }) {
    //toast message

    //file default
    const [resultImg, setResultImg] = useState(null);
    const [avatar, setAvatar] = useState(undefined);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    // redux
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    // handle save database
    const handleSave = (e) => {
        e.preventDefault();
        const updateUser = async () => {
            try {
                const res = await http.put(`/users/${currentUser._id}`, {
                    avtImg: resultImg.avatar,
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
                notifyToast('File not found!!');
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
        currentAvatar && deleteFile(currentAvatar);
        setResultImg(null);
        setAvatar(undefined);
    }
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
                        <div className='dialog-btn-group'>
                            {resultImg ? <button className="dialog-btn" onClick={handleClear}>Clear</button>:<></>}
                            <button className="dialog-btn" onClick={handleSave}>
                                Save changes
                            </button>

                        </div>

                        <Dialog.Close asChild className="closeIcon-btn" >
                            {closeIcon(20, 20)}
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Dialog_UI;
