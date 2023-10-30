import { useState } from 'react';
import './Dialog_UI.scss';
import * as Dialog from '@radix-ui/react-dialog';
import axiosInstance from '../../instance/axiosInstance';
import { imgIcon, closeIcon } from '../../svg/icon';
import Dialog_content from './dialog_content/Dialog_file';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../redux-toolkit/userSlice';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from '../../firebase/config';

function Dialog_UI({ openDialog, setOpenDialog }) {
    const [resultImg, setResultImg] = useState(null);
    const [avatar, setAvatar] = useState(undefined);
    console.log(avatar)
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault();

        const updateUser = async () => {
            try {
                const res = await axiosInstance.put(`/users/${currentUser._id}`, {
                    avtImg: resultImg.avatar,
                });
                console.log(res.data);
                dispatch(updateData(res.data));
            } catch (error) {
                console.log(error.message);
                alert('File not found!!');
            }
        };
        updateUser();
    };
    const handleClose = () => {
        avatar && deleteFile(avatar?.name);
        setResultImg(null);
        setAvatar(undefined);
    };
    const deleteFile = (file) => {
        const storage = getStorage(app);
        const desertRef = ref(storage,file);
        deleteObject(desertRef)
            .then(() => {
                console.log('successfully deleted');
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
                        <Dialog_content
                            setAvatar={setAvatar}
                            avatar={avatar}
                            setResultImg={setResultImg}
                            resultImg={resultImg}
                        />
                        {/* ---------------------------------- */}
                        <Dialog.Close asChild>
                            <button className="btn-save" onClick={handleSave}>
                                Save changes
                            </button>
                        </Dialog.Close>
                        <Dialog.Close asChild className="closeIcon-btn" onClick={handleClose}>
                            {closeIcon(20, 20)}
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Dialog_UI;
