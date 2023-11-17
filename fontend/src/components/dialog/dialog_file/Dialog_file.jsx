import './Dialog_file.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon, imageUp } from '../../../svg/icon';
import { useEffect, useState, memo } from 'react';
import app from '../../../firebase/config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import UploadImgLoading from '../../UploadImgLoading/UploadImgLoading';
import { useSelector } from 'react-redux';

// import Dialog_content from './dialog_contens/Dialog_contents';
function Dialog_content({
    bgImage,
    setBgImage,
    avatar,
    setAvatar,
    resultImg,
    setResultImg,
    setCurrentAvatar,
    avtUser,
    setImgUpLoading,
    pickImgBg,
}) {
    // image processing upload
    const currentUser = useSelector((state) => state.user.currentUser);
    const [imgPercent, setImgPercent] = useState(0);
    //upload firebase storage
    const upload = (file, type) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file?.name;
        const storageRef = ref(storage, fileName);
        setCurrentAvatar(fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                // console.log('Upload is ' + progress + '% done');
                // setCurrentAvatar(snapshot.ref._location.path_);
                // console.log(snapshot.ref._location.path_)
                type === 'avatar' && setImgPercent(Math.round(progress));
                type === 'avatar' && setImgUpLoading(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log('Upload error: ' + error.message);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setResultImg((pre) => {
                        return { ...pre, [type]: downloadURL };
                    });
                });
            },
        );
    };
    useEffect(() => {
        avatar && (resultImg ? <></> : upload(avatar, 'avatar'));
        // bgImage && ()
    }, [avatar,bgImage]);

    return (
        <>
            {avatar || avtUser ? (
                <UploadImgLoading avtUser={avtUser} resultImg={resultImg} imgPercent={imgPercent} />
            ) : (
                <>
                    {pickImgBg ? (
                        <>
                            <Dialog.Title className="DialogTitle">Add Image Background</Dialog.Title>
                            <fieldset className="Fieldset-bg">
                                <label className="Label" htmlFor="upload-photo">
                                    {imageUp(50, 50)}
                                <h6>Upload your image</h6>
                                </label>
                                <input type="file" id="upload-photo" onChange={(e) => setBgImage(e.target.files[0])} />
                            </fieldset>

                        </>
                        ) : (
                            <>
                            <Dialog.Title className="DialogTitle">Add Image</Dialog.Title>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="upload-photo">
                                    {imgIcon(30, 30)} File/Image
                                </label>
                                <input type="file" id="upload-photo" onChange={(e) => setAvatar(e.target.files[0])} />
                            </fieldset>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default memo(Dialog_content);
